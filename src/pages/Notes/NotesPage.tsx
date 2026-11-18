import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Bookmark, AlertOctagon } from 'lucide-react';

export const NotesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module M</span>
          <Badge variant="outline">Phase 7 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Notes & Mistake Repository</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Personal markdown notes, bookmarked algorithms, and a dedicated repository to record algorithmic errors, off-by-one mistakes, and recruiter traps.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-400" />
              <CardTitle className="text-sm font-semibold">Personal Notes</CardTitle>
            </div>
            <CardDescription className="pt-2 text-xs text-zinc-400">
              Create and organize searchable study notes with custom tags.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-amber-400" />
              <CardTitle className="text-sm font-semibold">Bookmarked Problems</CardTitle>
            </div>
            <CardDescription className="pt-2 text-xs text-zinc-400">
              Instant 1-click filter for bookmarked DSA and SQL questions.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertOctagon className="h-4 w-4 text-rose-400" />
              <CardTitle className="text-sm font-semibold">Mistake Repository</CardTitle>
            </div>
            <CardDescription className="pt-2 text-xs text-zinc-400">
              Log coding bugs and exam traps to review prior to company drives.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
