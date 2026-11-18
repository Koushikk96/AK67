import React from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Database } from 'lucide-react';

export const SQLPage: React.FC = () => {
  const categories = [
    'Clauses: SELECT, WHERE, ORDER BY, GROUP BY, HAVING',
    'Joins: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF JOINS',
    'Aggregation & Filters: COUNT, SUM, AVG, MIN, MAX with GROUP BY',
    'Advanced: Subqueries (correlated vs non-correlated), CTEs (WITH)',
    'Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG()',
    'Database Normalization: 1NF, 2NF, 3NF, BCNF with practical examples',
    'Placement Queries: Nth highest salary, duplicate emails, department top 3',
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module D</span>
          <Badge variant="outline">Phase 4 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">SQL Query & Schema Arena</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Comprehensive relational querying from basic filtering to analytical window functions, normalization theory, and high-frequency company interview queries.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((cat, idx) => (
          <Card key={idx} className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2.5">
                <Database className="h-4 w-4 text-cyan-400 shrink-0" />
                <p className="text-xs font-medium text-zinc-200">{cat}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
