const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation
function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  return table;
}

const crcTable = makeCrcTable();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createPng(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Scanlines with filter byte 0
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  let scanlineOffset = 0;
  let pixelOffset = 0;

  for (let y = 0; y < height; y++) {
    scanlines[scanlineOffset++] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      scanlines[scanlineOffset++] = rgbaBuffer[pixelOffset++]; // R
      scanlines[scanlineOffset++] = rgbaBuffer[pixelOffset++]; // G
      scanlines[scanlineOffset++] = rgbaBuffer[pixelOffset++]; // B
      scanlines[scanlineOffset++] = rgbaBuffer[pixelOffset++]; // A
    }
  }

  const compressed = zlib.deflateSync(scanlines, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// Draw an icon onto an RGBA buffer
function renderIcon(size, isMaskable = false) {
  const buf = new Uint8Array(size * size * 4);

  // Helper to set pixel
  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const idx = (y * size + x) * 4;
    // Simple alpha blending
    if (a === 255) {
      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = a;
    } else if (a > 0) {
      const alpha = a / 255;
      const invAlpha = 1 - alpha;
      buf[idx] = Math.round(r * alpha + buf[idx] * invAlpha);
      buf[idx + 1] = Math.round(g * alpha + buf[idx + 1] * invAlpha);
      buf[idx + 2] = Math.round(b * alpha + buf[idx + 2] * invAlpha);
      buf[idx + 3] = Math.max(buf[idx + 3], a);
    }
  }

  // Draw background: #09090b
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      setPixel(x, y, 9, 9, 11, 255);
    }
  }

  // Safe margin: for maskable, use 18% margin; for standard, use 6% margin
  const margin = isMaskable ? Math.round(size * 0.18) : Math.round(size * 0.06);
  const cardX = margin;
  const cardY = margin;
  const cardW = size - margin * 2;
  const cardH = size - margin * 2;
  const cornerR = isMaskable ? 0 : Math.round(size * 0.16);

  // Draw rounded card container (if not maskable)
  if (!isMaskable) {
    for (let y = cardY; y < cardY + cardH; y++) {
      for (let x = cardX; x < cardX + cardW; x++) {
        // check corner distance
        const dx = Math.max(cardX + cornerR - x, 0, x - (cardX + cardW - 1 - cornerR));
        const dy = Math.max(cardY + cornerR - y, 0, y - (cardY + cardH - 1 - cornerR));
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= cornerR) {
          // Card fill: #121215
          setPixel(x, y, 18, 18, 21, 255);
          // Border: #27272a
          if (dist >= cornerR - Math.max(1, Math.round(size * 0.015))) {
            setPixel(x, y, 39, 39, 42, 255);
          }
        }
      }
    }
  }

  // Draw Central AK67 Symbol
  // Dimensions normalized to card coordinates
  const scale = cardW / 100;
  const originX = cardX;
  const originY = cardY;

  // Coordinate mapper
  const px = (nx) => Math.round(originX + nx * scale);
  const py = (ny) => Math.round(originY + ny * scale);

  // Helper to fill polygon
  function fillPoly(points, r, g, b, a = 255) {
    let minX = size, maxX = 0, minY = size, maxY = 0;
    for (const [x, y] of points) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    for (let y = Math.max(0, minY); y <= Math.min(size - 1, maxY); y++) {
      for (let x = Math.max(0, minX); x <= Math.min(size - 1, maxX); x++) {
        // Point in polygon (ray-casting)
        let inside = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
          const xi = points[i][0], yi = points[i][1];
          const xj = points[j][0], yj = points[j][1];
          const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
        }
        if (inside) setPixel(x, y, r, g, b, a);
      }
    }
  }

  // Helper to fill circle
  function fillCircle(cx, cy, radius, r, g, b, a = 255) {
    const minX = Math.floor(cx - radius);
    const maxX = Math.ceil(cx + radius);
    const minY = Math.floor(cy - radius);
    const maxY = Math.ceil(cy + radius);
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const d = Math.hypot(x - cx, y - cy);
        if (d <= radius) {
          const aa = Math.min(1, Math.max(0, radius - d + 0.5));
          setPixel(x, y, r, g, b, Math.round(a * aa));
        }
      }
    }
  }

  // 1. Draw "A" glyph (Electric Blue #3b82f6: 59, 130, 246)
  // Outer triangle
  const aOuter = [
    [px(36), py(24)],
    [px(48), py(76)],
    [px(39), py(76)],
    [px(35), py(58)],
    [px(25), py(58)],
    [px(21), py(76)],
    [px(12), py(76)],
    [px(24), py(24)]
  ];
  fillPoly(aOuter, 59, 130, 246);

  // Cut out A inner hole with background color
  const aInner = [
    [px(30), py(35)],
    [px(33), py(50)],
    [px(27), py(50)]
  ];
  fillPoly(aInner, isMaskable ? 9 : 18, isMaskable ? 9 : 18, isMaskable ? 11 : 21);

  // 2. Draw "K" glyph (#60a5fa: 96, 165, 250)
  // Vertical stem
  const kStem = [
    [px(52), py(24)],
    [px(60), py(24)],
    [px(60), py(76)],
    [px(52), py(76)]
  ];
  fillPoly(kStem, 96, 165, 250);

  // Upper arm
  const kArmUp = [
    [px(59), py(52)],
    [px(74), py(24)],
    [px(83), py(24)],
    [px(67), py(46)]
  ];
  fillPoly(kArmUp, 96, 165, 250);

  // Lower arm
  const kArmDown = [
    [px(64), py(44)],
    [px(84), py(76)],
    [px(74), py(76)],
    [px(58), py(52)]
  ];
  fillPoly(kArmDown, 96, 165, 250);

  // 3. Draw Placement Success Spark Dot (#10b981 Emerald: 16, 185, 129)
  fillCircle(px(82), py(19), scale * 6.5, 16, 185, 129);
  // Inner white glow in dot
  fillCircle(px(82), py(19), scale * 2.5, 255, 255, 255);

  // 4. Draw "67" bottom badge pill (Emerald #10b981 background, white text)
  const badgeX = px(38);
  const badgeY = py(81);
  const badgeW = Math.round(scale * 38);
  const badgeH = Math.round(scale * 12);
  const badgeR = Math.round(badgeH / 2);

  // Draw pill
  fillCircle(badgeX + badgeR, badgeY + badgeR, badgeR, 16, 185, 129);
  fillCircle(badgeX + badgeW - badgeR, badgeY + badgeR, badgeR, 16, 185, 129);
  fillPoly([
    [badgeX + badgeR, badgeY],
    [badgeX + badgeW - badgeR, badgeY],
    [badgeX + badgeW - badgeR, badgeY + badgeH],
    [badgeX + badgeR, badgeY + badgeH]
  ], 16, 185, 129);

  // Mini "67" inside pill
  // Draw stroke for '6' and '7'
  const midX = badgeX + badgeW / 2;
  const midY = badgeY + badgeH / 2;
  const strokeW = Math.max(1, Math.round(scale * 1.5));

  // '6'
  fillCircle(midX - scale * 6, midY + scale * 1.5, scale * 3, 255, 255, 255);
  fillCircle(midX - scale * 6, midY + scale * 1.5, scale * 1.5, 16, 185, 129);
  fillPoly([
    [midX - scale * 8.5, midY - scale * 3.5],
    [midX - scale * 5.5, midY - scale * 3.5],
    [midX - scale * 5.5, midY],
    [midX - scale * 8.5, midY]
  ], 255, 255, 255);

  // '7'
  fillPoly([
    [midX + scale * 2, midY - scale * 3.5],
    [midX + scale * 9, midY - scale * 3.5],
    [midX + scale * 9, midY - scale * 1.5],
    [midX + scale * 2, midY - scale * 1.5]
  ], 255, 255, 255);
  fillPoly([
    [midX + scale * 6.5, midY - scale * 1.5],
    [midX + scale * 9, midY - scale * 1.5],
    [midX + scale * 4.5, midY + scale * 4],
    [midX + scale * 2.5, midY + scale * 4]
  ], 255, 255, 255);

  return buf;
}

// Generate all required icons
function main() {
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Generating AK67 icon system in public/...');

  // 1. 192x192
  const buf192 = renderIcon(192, false);
  const png192 = createPng(192, 192, buf192);
  fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png192);
  console.log('  ✓ pwa-192x192.png generated (' + png192.length + ' bytes)');

  // 2. 512x512
  const buf512 = renderIcon(512, false);
  const png512 = createPng(512, 512, buf512);
  fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png512);
  console.log('  ✓ pwa-512x512.png generated (' + png512.length + ' bytes)');

  // 3. 512x512 Maskable
  const bufMaskable = renderIcon(512, true);
  const pngMaskable = createPng(512, 512, bufMaskable);
  fs.writeFileSync(path.join(publicDir, 'maskable-icon-512x512.png'), pngMaskable);
  console.log('  ✓ maskable-icon-512x512.png generated (' + pngMaskable.length + ' bytes)');

  // 4. Apple Touch Icon 180x180
  const buf180 = renderIcon(180, false);
  const png180 = createPng(180, 180, buf180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon-180x180.png'), png180);
  console.log('  ✓ apple-touch-icon.png generated (' + png180.length + ' bytes)');

  // 5. 64x64 favicon
  const buf64 = renderIcon(64, false);
  const png64 = createPng(64, 64, buf64);
  fs.writeFileSync(path.join(publicDir, 'favicon-64x64.png'), png64);
  console.log('  ✓ favicon-64x64.png generated (' + png64.length + ' bytes)');

  console.log('Icon system generated successfully!\n');
}

main();
