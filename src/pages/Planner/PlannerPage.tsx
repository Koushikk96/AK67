import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CalendarCheck, Timer, Flame, Target } from 'lucide-react';

export const PlannerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module H</span>
          <Badge variant="outline">Phase 5 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Daily Study Planner</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Set daily targets, manage custom study tasks, track focus time with an integrated Pomodoro timer, and build your unbroken preparation streak.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Today's Target</span>
              <Target className="h-4 w-4 text-blue-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">3 Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Customizable daily quota</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Active Streak</span>
              <Flame className="h-4 w-4 text-amber-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">0 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Calculated from study sessions</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Pomodoro Timer</span>
              <Timer className="h-4 w-4 text-emerald-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">25 : 00</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Focus interval logger</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <CalendarCheck className="h-4 w-4 text-blue-400" />
            <span>Task Management Architecture</span>
          </CardTitle>
          <CardDescription>
            Custom tasks and daily reflection logs are committed directly to the `daily_planner` table in IndexedDB, giving you complete personal ownership without external syncing delays.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
