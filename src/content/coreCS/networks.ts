import { TechnicalTopic } from '@/types/technical';

export const networkTopics: TechnicalTopic[] = [
  {
    id: 'cn-01-osi-7-layers',
    number: 1,
    title: 'OSI Model and All Seven Layers',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'The Open Systems Interconnection (OSI) reference model standardizes network communication into 7 logical layers: 7. Application (User interface: HTTP, FTP, DNS), 6. Presentation (Syntax, encryption, compression: SSL/TLS, JPEG), 5. Session (Session establishment and checkpoints: RPC, NetBIOS), 4. Transport (End-to-end reliability, flow control: TCP, UDP - Segments), 3. Network (Logical routing, IP addressing: IP, ICMP - Packets), 2. Data Link (Physical framing, MAC addressing, error detection: Ethernet, Switches - Frames), 1. Physical (Raw bit transmission over physical media: Cables, Hubs - Bits).',
    diagram: `OSI 7 Layers & Protocol Data Units (PDU):
Layer 7: Application   ──┐
Layer 6: Presentation  ──┼──> Data
Layer 5: Session       ──┘
Layer 4: Transport     ──────> Segment (TCP / UDP)
Layer 3: Network       ──────> Packet (IP)
Layer 2: Data Link     ──────> Frame (MAC / Ethernet)
Layer 1: Physical      ──────> Bits (01010101)
Mnemonic: "All People Seem To Need Data Processing"`,
    interviewQuestions: [
      'What are all 7 layers of the OSI model and their respective Protocol Data Units (PDUs)?',
      'At which layers do Routers, Switches, and Hubs operate?',
      'What is Encapsulation and Decapsulation as data traverses down and up the OSI stack?',
    ],
    commonMistakes: [
      'Confusing Data Link frames with Network packets.',
      'Assuming SSL/TLS lives strictly at Layer 7 (it operates between Transport and Application, historically Presentation).',
    ],
    revisionNotes: [
      'Layer 7-5: Application, Presentation, Session (PDU = Data).',
      'Layer 4: Transport (Segment). Layer 3: Network (Packet).',
      'Layer 2: Data Link (Frame). Layer 1: Physical (Bits).',
      'Switch = Layer 2 (MAC). Router = Layer 3 (IP). Hub = Layer 1 (Physical bits).',
    ],
  },
  {
    id: 'cn-02-tcp-ip-model',
    number: 2,
    title: 'TCP/IP Model Architecture vs OSI Model',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'The TCP/IP model is the practical, implementation-based architecture powering the global Internet. It collapses the OSI 7 layers into 4 operational layers: 1. Application Layer (Combines OSI Application, Presentation, and Session: HTTP, DNS, SSH). 2. Transport Layer (Host-to-host communication: TCP, UDP). 3. Internet Layer (Routing and logical addressing: IPv4, IPv6, ICMP, ARP). 4. Network Access / Link Layer (Combines OSI Data Link and Physical: Ethernet, Wi-Fi, MAC).',
    diagram: `OSI Model vs TCP/IP Model Mapping:
OSI (7 Layers)                    TCP/IP (4 Layers)
+------------------------+        +------------------------+
| 7. Application         |        |                        |
| 6. Presentation        | ───>   | 4. Application Layer   |
| 5. Session             |        | (HTTP, DNS, SSH, SMTP) |
+------------------------+        +------------------------+
| 4. Transport           | ───>   | 3. Transport Layer     |
+------------------------+        +------------------------+
| 3. Network             | ───>   | 2. Internet Layer (IP) |
+------------------------+        +------------------------+
| 2. Data Link           | ───>   | 1. Network Access      |
| 1. Physical            |        | (Ethernet, Wi-Fi, MAC) |
+------------------------+        +------------------------+`,
    interviewQuestions: [
      'How does the 4-layer TCP/IP model map to the theoretical 7-layer OSI model?',
      'Why did the TCP/IP model succeed in industry over the OSI model?',
      'What role does the Internet Layer play in internetworking heterogenous networks?',
    ],
    commonMistakes: [
      'Thinking OSI is a physical protocol stack rather than a theoretical conceptual standard.',
      'Confusing the Internet layer with the Transport layer.',
    ],
    revisionNotes: [
      'TCP/IP has 4 layers: Application, Transport, Internet, Network Access.',
      'OSI is a reference model; TCP/IP is the practical implementation standard of the Internet.',
    ],
  },
  {
    id: 'cn-03-tcp-vs-udp',
    number: 3,
    title: 'TCP vs UDP: Comprehensive Transport Layer Comparison',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'Transmission Control Protocol (TCP) is connection-oriented, reliable, byte-stream oriented, and guarantees ordered delivery via acknowledgments (ACKs), sequence numbers, and retransmissions. It provides flow control (sliding window) and congestion control, with 20–60 byte header overhead. User Datagram Protocol (UDP) is connectionless, unreliable, message-oriented ("fire and forget"), with no ordering, no retransmission, low latency, and a tiny 8-byte header. Ideal for real-time video streaming, VoIP, DNS, and online gaming.',
    diagram: `TCP vs UDP Feature Comparison:
+-------------------+----------------------------+---------------------------------+
| Feature           | TCP                        | UDP                             |
+-------------------+----------------------------+---------------------------------+
| Connection        | Connection-oriented (3-way)| Connectionless                  |
| Reliability       | Guaranteed delivery & ACKs | Best-effort (No ACKs)           |
| Ordering          | Strictly ordered           | No ordering guarantee           |
| Speed / Latency   | Slower (Handshake + ACKs)  | Ultra-fast / Low latency        |
| Header Size       | 20 - 60 bytes              | 8 bytes                         |
| Flow / Congestion | Built-in                   | None                            |
| Common Protocols  | HTTP/HTTPS, SSH, FTP, SMTP | DNS, DHCP, VoIP, Video stream   |
+-------------------+----------------------------+---------------------------------+`,
    interviewQuestions: [
      'Why does DNS query resolution use UDP while DNS zone transfer uses TCP?',
      'Why is UDP preferred over TCP for live multiplayer video gaming and voice calls?',
      'What is Head-of-Line (HoL) blocking in TCP and how does HTTP/3 (QUIC over UDP) solve it?',
    ],
    commonMistakes: [
      'Assuming UDP packets are always lost or corrupted (UDP includes an optional checksum for data integrity).',
      'Thinking TCP sends messages as atomic chunks (TCP is a raw stream of continuous bytes).',
    ],
    revisionNotes: [
      'TCP: Reliable, ordered, connection-oriented, heavyweight (20B header), flow & congestion control.',
      'UDP: Fast, connectionless, lightweight (8B header), no ordering, no delivery guarantee.',
    ],
  },
  {
    id: 'cn-04-tcp-3-way-handshake',
    number: 4,
    title: 'TCP Three-Way Handshake & Connection Termination',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'TCP establishes a reliable full-duplex connection via a 3-Way Handshake: 1. Client sends SYN (Synchronize sequence number X). 2. Server responds with SYN-ACK (Synchronize sequence number Y, Acknowledge X+1). 3. Client replies with ACK (Acknowledge Y+1). Connection is now ESTABLISHED. Termination requires a 4-Way Handshake: Client sends FIN, Server sends ACK; Server sends FIN, Client sends ACK and enters TIME_WAIT (2MSL to ensure the final ACK was received).',
    diagram: `TCP 3-Way Handshake & 4-Way Termination:
Establishment:
Client                                           Server
  │ ─── [SYN, Seq=X] ───────────────────────────>  │ (LISTEN -> SYN_RCVD)
  │ <── [SYN-ACK, Seq=Y, Ack=X+1] ───────────────  │
  │ ─── [ACK, Ack=Y+1] ─────────────────────────>  │ (ESTABLISHED)

Termination (4-Way):
Client                                           Server
  │ ─── [FIN] ──────────────────────────────────>  │ (CLOSE_WAIT)
  │ <── [ACK] ───────────────────────────────────  │
  │ <── [FIN] ───────────────────────────────────  │ (LAST_ACK)
  │ ─── [ACK] ──────────────────────────────────>  │ (CLOSED)
  (Enters TIME_WAIT for 2*MSL)`,
    interviewQuestions: [
      'Why is a 3-way handshake necessary instead of a 2-way handshake?',
      'What is a SYN Flood attack and how do SYN Cookies defend against it?',
      'Why does the client stay in the TIME_WAIT state for 2*MSL during connection teardown?',
    ],
    commonMistakes: [
      'Thinking TCP termination takes 3 steps like connection establishment (it takes 4 steps because TCP is full-duplex and one side can finish sending before the other).',
      'Confusing SYN sequence numbers with port numbers.',
    ],
    revisionNotes: [
      '3-Way Handshake: SYN -> SYN-ACK -> ACK.',
      'Ensures both parties agree on initial sequence numbers (ISN) and full-duplex communication works.',
      'TIME_WAIT prevents delayed duplicate packets from a previous connection corrupting a new connection.',
    ],
  },
  {
    id: 'cn-05-http-vs-https',
    number: 5,
    title: 'HTTP vs HTTPS & TLS/SSL Handshake',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'HTTP (Hypertext Transfer Protocol, Port 80) transmits plaintext data over TCP; it is vulnerable to eavesdropping, tampering, and Man-in-the-Middle (MITM) attacks. HTTPS (HTTP Secure, Port 443) layers HTTP over TLS/SSL encryption. The TLS handshake authenticates the server using a Certificate Authority (CA) signed digital certificate, performs asymmetric key exchange (RSA / Diffie-Hellman) to establish a shared secret, and switches to high-speed symmetric encryption (AES) for actual payload transmission.',
    diagram: `HTTP vs HTTPS Architecture:
HTTP:   [ Application (HTTP) ] ──> [ TCP (Port 80) ]  (Plaintext! Vulnerable)
HTTPS:  [ Application (HTTP) ] ──> [ TLS / SSL ] ──> [ TCP (Port 443) ] (Encrypted)`,
    interviewQuestions: [
      'Why does HTTPS use both Asymmetric and Symmetric encryption instead of just Asymmetric?',
      'What is a Digital Certificate, a Certificate Authority (CA), and a Chain of Trust?',
      'What are the key evolutionary differences between HTTP/1.1, HTTP/2, and HTTP/3?',
    ],
    commonMistakes: [
      'Believing asymmetric encryption is used to encrypt the entire HTTP session payload (it is only used during the handshake to exchange the symmetric session key, because asymmetric encryption is computationally slow).',
      'Assuming HTTPS hides the domain name being visited (Server Name Indication / SNI exposes the domain in older TLS unless ESNI/ECH is used).',
    ],
    revisionNotes: [
      'HTTP = Port 80, plaintext. HTTPS = Port 443, encrypted with TLS.',
      'Asymmetric encryption (public/private key) used for authentication & key exchange.',
      'Symmetric encryption (AES) used for bulk data transfer (fast & efficient).',
    ],
  },
  {
    id: 'cn-06-dns-resolution',
    number: 6,
    title: 'DNS: Domain Name System & Recursive Resolution',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'DNS acts as the "phonebook of the Internet", resolving human-readable domain names (e.g., google.com) into machine-routable IP addresses (e.g., 142.250.190.46) over UDP Port 53. Resolution hierarchy: 1. Local Cache (Browser, OS, Router). 2. Recursive Resolver (ISP or 8.8.8.8). 3. Root DNS Servers (13 named IP authorities). 4. Top-Level Domain (TLD) Servers (.com, .org). 5. Authoritative DNS Servers (holds the true DNS records: A, AAAA, CNAME, MX, TXT).',
    diagram: `DNS Resolution Flow:
Client ──> [ Local Resolver / ISP ]
                 │
                 ├──(1. Where is .com?)──> [ Root DNS Server ]
                 │ <──(Ask .com TLD)──────┘
                 │
                 ├──(2. Where is example.com?)──> [ .com TLD Server ]
                 │ <──(Ask Authoritative)────────┘
                 │
                 └──(3. What is IP of example.com?)──> [ Authoritative Server ]
                   <──(IP: 93.184.216.34)──────────────┘`,
    interviewQuestions: [
      'What is the difference between Recursive DNS Query and Iterative DNS Query?',
      'Explain common DNS record types: A, AAAA, CNAME, MX, and TXT.',
      'What is DNS Caching and what is Time-To-Live (TTL)?',
    ],
    commonMistakes: [
      'Confusing an A record (maps hostname to IPv4) with a CNAME record (maps hostname to another hostname alias).',
      'Thinking DNS always hits root servers (aggressive caching at browser, OS, and recursive resolvers satisfies >95% of queries locally).',
    ],
    revisionNotes: [
      'DNS: Port 53, primarily UDP (TCP used for zone transfers and responses > 512 bytes).',
      'Resolution order: Browser Cache -> OS Cache -> Recursive Resolver -> Root -> TLD -> Authoritative.',
      'A record = IPv4. AAAA record = IPv6. CNAME = Canonical alias. MX = Mail server.',
    ],
  },
  {
    id: 'cn-07-dhcp-protocol',
    number: 7,
    title: 'DHCP: Dynamic Host Configuration Protocol & DORA Process',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'DHCP automatically assigns dynamic IP addresses, subnet masks, default gateways, and DNS server IPs to devices joining a network, preventing manual IP configuration errors and IP address conflicts. It operates over UDP (Ports 67 for server, 68 for client) using the 4-step DORA process: Discover, Offer, Request, Acknowledge.',
    diagram: `DHCP DORA Exchange:
Client                                           DHCP Server
  │ ─── [1. Discover: Broadcast 255.255.255.255] ──>  │ (Client has no IP)
  │ <── [2. Offer: Proposed IP e.g. 192.168.1.50] ──  │
  │ ─── [3. Request: Accept proposed IP] ──────────>  │ (Client commits choice)
  │ <── [4. Acknowledge (ACK): Lease confirmed] ────  │ (IP leased to client)`,
    interviewQuestions: [
      'Explain the 4 steps of the DHCP DORA process in detail.',
      'Why is the initial DHCP Discover message sent as a broadcast (255.255.255.255)?',
      'What is DHCP Lease Time and what happens when 50% of the lease expires?',
    ],
    commonMistakes: [
      'Thinking DHCP operates over TCP (it cannot use TCP because the client does not yet have an IP address to establish a handshake!).',
      'Confusing the Default Gateway with the DHCP Server IP.',
    ],
    revisionNotes: [
      'DORA: Discover (broadcast), Offer (unicast/broadcast), Request (broadcast), Acknowledge (unicast).',
      'Ports: Client listens on UDP 68, Server listens on UDP 67.',
      'Lease renewal attempts begin at 50% of lease time (T1 timer).',
    ],
  },
  {
    id: 'cn-08-ip-vs-mac-address',
    number: 8,
    title: 'IP Address vs MAC Address & ARP Protocol',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'A MAC Address (Media Access Control, Layer 2) is a 48-bit physical address burned into the Network Interface Card (NIC), formatted as 6 hexadecimal octets (e.g., 00:1A:2B:3C:4D:5E); it identifies devices on the local local-area network (LAN). An IP Address (Layer 3) is a 32-bit (IPv4) or 128-bit (IPv6) logical address that routes packets across global interconnected networks. Address Resolution Protocol (ARP) translates a known IP address into a destination physical MAC address on the local link.',
    diagram: `ARP Resolution Workflow:
Host A (192.168.1.10) wants to send packet to Host B (192.168.1.20)
1. Host A checks local ARP Cache.
2. If absent: Host A sends ARP Request (Broadcast to FF:FF:FF:FF:FF:FF):
   "Who has IP 192.168.1.20? Tell 192.168.1.10!"
3. Host B responds with ARP Reply (Unicast to Host A):
   "I have 192.168.1.20, my MAC is 00:14:22:01:23:45."
4. Host A caches mapping and transmits Ethernet frame.`,
    interviewQuestions: [
      'Why do we need both MAC addresses and IP addresses?',
      'How does the Address Resolution Protocol (ARP) work?',
      'What is ARP Poisoning / ARP Spoofing and how does it enable Man-in-the-Middle attacks?',
    ],
    commonMistakes: [
      'Thinking MAC addresses are routed across the Internet (MAC addresses change hop-by-hop at every router; the destination IP address remains constant).',
      'Confusing ARP (IP -> MAC) with RARP / DHCP (MAC -> IP).',
    ],
    revisionNotes: [
      'MAC: 48 bits (6 bytes), Layer 2, hardware identity, local LAN scope only.',
      'IP: 32 bits (IPv4) / 128 bits (IPv6), Layer 3, logical routing across networks.',
      'ARP resolves IP -> MAC address. Frame header changes at every router hop; IP header stays intact.',
    ],
  },
  {
    id: 'cn-09-ipv4-vs-ipv6',
    number: 9,
    title: 'IPv4 vs IPv6 Architecture',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'IPv4 uses 32-bit addresses divided into 4 decimal octets separated by dots (e.g., 192.168.1.1), providing ~4.3 billion addresses (exhausted; extended via NAT). IPv6 uses 128-bit addresses represented as 8 groups of 4 hexadecimal digits separated by colons (e.g., 2001:0db8:85a3::8a2e:0370:7334), providing ~3.4 x 10^38 addresses. IPv6 features simplified fixed-size 40-byte headers (no checksum, no router fragmentation), native IPSec support, and auto-configuration (SLAAC).',
    diagram: `IPv4 vs IPv6 Comparison:
+-------------------+----------------------------+---------------------------------+
| Feature           | IPv4                       | IPv6                            |
+-------------------+----------------------------+---------------------------------+
| Address Length    | 32 bits (4 bytes)          | 128 bits (16 bytes)             |
| Total Address Pool| ~4.3 x 10^9 addresses      | ~3.4 x 10^38 addresses (Undecillion)|
| Format            | Dotted decimal (192.168.1.1)| Hexadecimal with colons         |
| Header Size       | Variable (20 - 60 bytes)   | Fixed 40 bytes                  |
| Checksum in Header| Yes (computed at each hop) | No (eliminated for speed)       |
| NAT Requirement   | Heavily required           | Not needed (end-to-end IP)      |
+-------------------+----------------------------+---------------------------------+`,
    interviewQuestions: [
      'Why is the IPv6 header fixed at 40 bytes despite addresses being 4 times larger?',
      'What is Network Address Translation (NAT) and why did it prolong IPv4 lifespan?',
      'How does Dual-Stack technology facilitate the migration from IPv4 to IPv6?',
    ],
    commonMistakes: [
      'Assuming IPv6 headers are larger than IPv4 headers (IPv6 has a streamlined, fixed 40-byte base header).',
      'Thinking routers fragment packets in IPv6 (in IPv6, fragmentation is performed ONLY by the sending host via Path MTU Discovery).',
    ],
    revisionNotes: [
      'IPv4 = 32 bits (~4.3 billion addresses). IPv6 = 128 bits (~3.4 x 10^38).',
      'IPv6 removes header checksum and router fragmentation to accelerate routing speed.',
      'IPv6 includes built-in IPSec support and eliminates NAT.',
    ],
  },
  {
    id: 'cn-10-router-vs-switch',
    number: 10,
    title: 'Router vs Switch vs Hub: Hardware & Collision Domains',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'Hub (Layer 1): Dumb repeater; broadcasts all incoming electrical signals to all ports; single collision and broadcast domain. Switch (Layer 2): Intelligent bridge; inspects incoming frames, learns MAC addresses into a MAC Address Table (CAM Table), and forwards frames directly to destination port; each port is an independent collision domain; all ports share 1 broadcast domain. Router (Layer 3): Connects different networks, inspects IP packets, maintains Routing Tables, and breaks both collision domains and broadcast domains.',
    diagram: `Domains Comparison:
Device     Layer     Collision Domain            Broadcast Domain
------------------------------------------------------------------
Hub        Layer 1   1 Shared Collision Domain   1 Shared Broadcast Domain
Switch     Layer 2   Separate per port           1 Shared Broadcast Domain
Router     Layer 3   Separate per port           Separate per port (Breaks Broadcast)`,
    interviewQuestions: [
      'What is the difference between a Collision Domain and a Broadcast Domain?',
      'How does a Layer 2 Switch learn MAC addresses and populate its CAM table?',
      'What happens when a switch receives a frame destined for an unknown MAC address (Flooding)?',
    ],
    commonMistakes: [
      'Thinking switches isolate broadcast domains (a broadcast frame to FF:FF:FF:FF:FF:FF is forwarded out all switch ports).',
      'Confusing a Router Routing Table (IP -> Interface) with a Switch MAC Table (MAC -> Port).',
    ],
    revisionNotes: [
      'Hub: 1 collision domain, 1 broadcast domain (Layer 1).',
      'Switch: N collision domains (1 per port), 1 broadcast domain (Layer 2).',
      'Router: N collision domains, N broadcast domains (Layer 3). Stops broadcasts.',
    ],
  },
  {
    id: 'cn-11-common-ports',
    number: 11,
    title: 'Common Ports & Transport Layer Protocols',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'Ports are 16-bit integers (0 to 65535) identifying specific application services on a host. Ranges: Well-known ports (0–1023, requires administrative privileges), Registered ports (1024–49151), Dynamic / Ephemeral ports (49152–65535, used temporarily by clients). A Socket is the combination of an IP address and a Port number (e.g., 192.168.1.10:443), uniquely identifying an endpoint connection.',
    diagram: `Placement Must-Know Port Numbers:
Port 20/21: FTP (File Transfer Protocol - TCP)
Port 22:    SSH (Secure Shell) & SFTP - TCP
Port 25:    SMTP (Simple Mail Transfer Protocol - TCP)
Port 53:    DNS (Domain Name System - UDP / TCP)
Port 67/68: DHCP (Server/Client - UDP)
Port 80:    HTTP (Hypertext Transfer Protocol - TCP)
Port 110:   POP3 (Post Office Protocol v3 - TCP)
Port 143:   IMAP (Internet Message Access Protocol - TCP)
Port 443:   HTTPS (HTTP over TLS/SSL - TCP)
Port 3306:  MySQL Database - TCP
Port 5432:  PostgreSQL Database - TCP`,
    interviewQuestions: [
      'What is a Network Socket and how does an OS demultiplex incoming packets using ports?',
      'Why are ports 0–1023 called Well-Known Ports?',
      'Which transport protocol (TCP vs UDP) does DNS, DHCP, and HTTPS use?',
    ],
    commonMistakes: [
      'Confusing port 22 (SSH) with port 23 (Telnet, unencrypted legacy).',
      'Thinking two processes on the same machine can listen to the exact same port and protocol simultaneously.',
    ],
    revisionNotes: [
      'SSH: 22, DNS: 53, HTTP: 80, HTTPS: 443, MySQL: 3306, Postgres: 5432.',
      'Port numbers range from 0 to 65,535 (2^16 - 1).',
      'Socket = IP Address + Port Number.',
    ],
  },
  {
    id: 'cn-12-basic-subnetting',
    number: 12,
    title: 'Basic Subnetting & CIDR Notation',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'Subnetting divides a larger network into smaller, efficient sub-networks to reduce broadcast traffic and conserve IP addresses. Classless Inter-Domain Routing (CIDR) uses slash notation (e.g., 192.168.1.0/24) where the suffix /N specifies the number of bits in the Network Mask. The remaining (32 - N) bits represent Host bits. Total IP addresses = 2^(32 - N). Usable host addresses = 2^(32 - N) - 2 (subtracting Network Address and Broadcast Address).',
    diagram: `Subnetting Math Example: /24 vs /26
Subnet: 192.168.1.0/26
- Network bits = 26. Host bits = 32 - 26 = 6.
- Total IPs = 2^6 = 64.
- Usable Hosts = 64 - 2 = 62.
- Subnet Mask = 255.255.255.192
- Usable Range: 192.168.1.1 to 192.168.1.62
- Network Address = 192.168.1.0 (first address)
- Broadcast Address = 192.168.1.63 (last address)`,
    interviewQuestions: [
      'Why are 2 addresses subtracted when calculating usable host addresses in a subnet?',
      'What is the subnet mask and total usable hosts for a /28 network?',
      'Difference between Classful Addressing (Class A, B, C) and CIDR?',
    ],
    commonMistakes: [
      'Forgetting to subtract 2 for the Network ID and Broadcast ID when asked for usable hosts.',
      'Confusing network prefix bits with host bits in CIDR notation.',
    ],
    revisionNotes: [
      '/24 = 256 total IPs, 254 usable hosts (Mask: 255.255.255.0).',
      '/25 = 128 total IPs, 126 usable hosts.',
      '/26 = 64 total IPs, 62 usable hosts.',
      '/28 = 16 total IPs, 14 usable hosts.',
      'Formula: Usable Hosts = 2^(Host Bits) - 2.',
    ],
  },
  {
    id: 'cn-13-congestion-control',
    number: 13,
    title: 'TCP Congestion Control & Flow Control',
    category: 'cn',
    subject: 'Computer Networks',
    codeLanguage: 'text',
    explanation:
      'Flow Control prevents the sender from overwhelming the receiver; it is implemented via the Receiver Window (rwnd) advertised in TCP headers. Congestion Control prevents the sender from overwhelming the entire intermediate network; it is maintained via the Congestion Window (cwnd). Effective transmission window = min(rwnd, cwnd). 4 phases: 1. Slow Start (cwnd doubles exponentially each RTT). 2. Congestion Avoidance (linear growth by 1 MSS after reaching threshold ssthresh). 3. Fast Retransmit (retransmits on 3 duplicate ACKs without waiting for timeout). 4. Fast Recovery.',
    diagram: `TCP Congestion Window Phases:
cwnd
  ^                         Loss Event!
  |                             |
  |             /───/───/──────\\
  |            / (Linear: Congestion Avoidance)
  |           /
  |         /─' (ssthresh)
  |       /
  |     / (Exponential: Slow Start)
  |   /
  +--+----------------------------------> Time (RTT)`,
    interviewQuestions: [
      'What is the difference between TCP Flow Control and Congestion Control?',
      'What triggers Fast Retransmit in TCP (why 3 duplicate ACKs)?',
      'What is the difference between TCP Tahoe and TCP Reno algorithms on packet loss?',
    ],
    commonMistakes: [
      'Confusing Flow Control (receiver buffer constraint) with Congestion Control (network router constraint).',
      'Assuming Slow Start increases speed slowly (it doubles cwnd exponentially every round-trip time!).',
    ],
    revisionNotes: [
      'Flow Control: Protects receiver buffer (rwnd in TCP header).',
      'Congestion Control: Protects intermediate network (cwnd computed by sender).',
      'Actual Sending Window = min(rwnd, cwnd).',
      '3 Duplicate ACKs = Packet loss detected -> Fast Retransmit triggered.',
    ],
  },
];
