import { spawnSync } from 'node:child_process';
import { allPythonTopics } from '../src/content/python';

const PYTHON_PATH = 'C:\\Users\\ATHIK\\.gemini\\antigravity\\scratch\\python311\\tools\\python.exe';

interface AuditResult {
  topicNumber: number;
  topicId: string;
  exampleIndex: number;
  title: string;
  status: 'EXEC_MATCH' | 'EXEC_MISMATCH' | 'EXEC_ERROR';
  actualOutput?: string;
  expectedOutput?: string;
  error?: string;
}

console.log(`Starting automated execution audit of all ${allPythonTopics.length} topics (178 code examples)...\n`);

const results: AuditResult[] = [];
let matchCount = 0;
let mismatchCount = 0;
let errorCount = 0;

for (const topic of allPythonTopics) {
  topic.codeExamples.forEach((ex, idx) => {
    const code = ex.code;
    const expected = ex.expectedOutput.trim();

    // Run python with the code passed via stdin
    const proc = spawnSync(PYTHON_PATH, ['-'], {
      input: code,
      encoding: 'utf-8',
      timeout: 5000,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
    });

    if (proc.error) {
      errorCount++;
      results.push({
        topicNumber: topic.topicNumber,
        topicId: topic.id,
        exampleIndex: idx,
        title: ex.title,
        status: 'EXEC_ERROR',
        error: proc.error.message,
      });
      return;
    }

    if (proc.status !== 0) {
      errorCount++;
      results.push({
        topicNumber: topic.topicNumber,
        topicId: topic.id,
        exampleIndex: idx,
        title: ex.title,
        status: 'EXEC_ERROR',
        error: proc.stderr || proc.stdout,
      });
      return;
    }

    const actual = (proc.stdout || '').trim();

    // Normalize line endings and trailing whitespace for comparison
    const normActual = actual.replace(/\r\n/g, '\n').trim();
    const normExpected = expected.replace(/\r\n/g, '\n').trim();

    if (normActual === normExpected) {
      matchCount++;
      results.push({
        topicNumber: topic.topicNumber,
        topicId: topic.id,
        exampleIndex: idx,
        title: ex.title,
        status: 'EXEC_MATCH',
        actualOutput: normActual,
        expectedOutput: normExpected,
      });
    } else {
      mismatchCount++;
      results.push({
        topicNumber: topic.topicNumber,
        topicId: topic.id,
        exampleIndex: idx,
        title: ex.title,
        status: 'EXEC_MISMATCH',
        actualOutput: normActual,
        expectedOutput: normExpected,
      });
    }
  });
}

console.log('================ AUDIT SUMMARY ================');
console.log(`Total Code Examples: ${results.length}`);
console.log(`Exact Matches: ${matchCount}`);
console.log(`Mismatches: ${mismatchCount}`);
console.log(`Runtime Errors: ${errorCount}`);
console.log('===============================================\n');

if (errorCount > 0) {
  console.log('--- RUNTIME ERRORS ---');
  results
    .filter((r) => r.status === 'EXEC_ERROR')
    .forEach((r) => {
      console.log(`[Topic #${r.topicNumber} ${r.topicId} Ex ${r.exampleIndex + 1}: "${r.title}"]`);
      console.log(`Error: ${r.error?.slice(0, 300)}\n`);
    });
}

if (mismatchCount > 0) {
  console.log('--- OUTPUT MISMATCHES ---');
  results
    .filter((r) => r.status === 'EXEC_MISMATCH')
    .forEach((r) => {
      console.log(`[Topic #${r.topicNumber} ${r.topicId} Ex ${r.exampleIndex + 1}: "${r.title}"]`);
      console.log('--- EXPECTED ---');
      console.log(r.expectedOutput);
      console.log('--- ACTUAL ---');
      console.log(r.actualOutput);
      console.log('--------------------------------------------------\n');
    });
}
