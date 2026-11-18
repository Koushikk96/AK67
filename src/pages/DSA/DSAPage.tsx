import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Code2, CheckCircle2, Search, Filter } from 'lucide-react';

export const DSAPage: React.FC = () => {
  const categories = [
    'Arrays (7)',
    'Strings (5)',
    'Hashing (4)',
    'Two Pointers & Sliding Window (6)',
    'Sorting & Binary Search (6)',
    'Recursion & Backtracking (5)',
    'Linked Lists (6)',
    'Stack & Queue (6)',
    'Trees & BST (9)',
    'Dynamic Programming (8)',
    'Basic Graphs (5)',
  ];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module B</span>
            <Badge variant="solved">Phase 3 Implementation</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            67 Curated DSA Problem Sheet
          </h1>
          <p className="text-xs text-zinc-400 max-w-2xl mt-1">
            The highest-yield placement DSA problem list, organized by 11 foundational topics with progressive hints, complexity analysis, and verified C++ solutions.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Placeholder */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search problems by name, pattern, or topic..."
            disabled
            className="w-full rounded-md border border-zinc-800 bg-zinc-900/60 pl-9 pr-4 py-2 text-xs text-zinc-300 placeholder-zinc-500 disabled:opacity-70"
          />
        </div>
        <div className="flex gap-2">
          <button disabled className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-400 disabled:opacity-70">
            <Filter className="h-3.5 w-3.5" />
            <span>Difficulty</span>
          </button>
          <button disabled className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-400 disabled:opacity-70">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Status</span>
          </button>
        </div>
      </div>

      {/* Category Pills Preview */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, idx) => (
          <span
            key={idx}
            className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Architecture Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Code2 className="h-4 w-4 text-blue-400" />
            <span>Phase 3 Architecture Details</span>
          </CardTitle>
          <CardDescription>
            The DSA engine stores your status (`Not Started`, `Attempted`, `Solved`, `Revise`), personal notes, and revision schedules locally in IndexedDB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-950 p-4 font-mono text-xs text-zinc-400">
            <p className="text-zinc-300 font-semibold mb-1">// Planned Problem Detail View Contract:</p>
            <p>• Verified external problem links (LeetCode / GFG)</p>
            <p>• 3-level progressive hint drawer (no accidental spoilers)</p>
            <p>• Explicit Time O(N) & Space O(1) complexity breakdown</p>
            <p>• Idiomatic C++ solution code with clean explanation</p>
            <p>• Auto-enqueuing into Spaced Repetition queue upon completion</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
