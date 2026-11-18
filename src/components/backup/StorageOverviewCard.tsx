import React from 'react';
import { DatabaseStats } from '@/types/database';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, AlertCircle, Clock, Database } from 'lucide-react';

interface StorageOverviewCardProps {
  stats: DatabaseStats;
  loading: boolean;
}

export const StorageOverviewCard: React.FC<StorageOverviewCardProps> = ({ stats, loading }) => {
  const formattedLastBackup = stats.lastBackupDate
    ? new Date(stats.lastBackupDate).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'No backup recorded on this device';

  return (
    <Card className="border-zinc-800 bg-[#121215]">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">IndexedDB Storage Health</CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                100% Client-Side Persistent Database
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="solved">ACID IndexedDB</Badge>
            <Badge variant="outline">Dexie v4</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="py-4 text-center text-xs text-zinc-500 animate-pulse">
            Loading storage metrics...
          </div>
        ) : (
          <div className="space-y-4">
            {/* Live Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-center">
                <p className="text-xs text-zinc-400">DSA Progress</p>
                <p className="text-base font-bold text-white mt-0.5">
                  {stats.solvedProblemsCount} <span className="text-xs font-normal text-zinc-500">/ {stats.problemProgressCount}</span>
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-center">
                <p className="text-xs text-zinc-400">Personal Notes</p>
                <p className="text-base font-bold text-white mt-0.5">{stats.notesCount}</p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-center">
                <p className="text-xs text-zinc-400">Mock Tests</p>
                <p className="text-base font-bold text-white mt-0.5">{stats.mockTestsCount}</p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-center">
                <p className="text-xs text-zinc-400">Study Sessions</p>
                <p className="text-base font-bold text-white mt-0.5">{stats.studySessionsCount}</p>
              </div>
            </div>

            {/* Last Backup Timestamp Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3 text-xs gap-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="h-4 w-4 text-zinc-500" />
                <span>Last Backup Created:</span>
                <span className="font-medium text-zinc-200">{formattedLastBackup}</span>
              </div>

              <div>
                {stats.lastBackupDate ? (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Backed Up
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Backup Recommended
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
