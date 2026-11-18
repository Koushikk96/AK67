import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RouteId } from '@/types/navigation';
import {
  Code2,
  RotateCcw,
  HardDrive,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface DashboardPageProps {
  navigate: (route: RouteId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Phase 1 Active • Foundation Ready
              </span>
              <Badge variant="solved">Client Persistence</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome to AK67
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl">
              Your personal placement preparation command center. Zero logins, zero subscription costs, and independent persistent storage on your own device.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={() => navigate('dsa')}>
              <Code2 className="mr-2 h-4 w-4" />
              Start DSA Sheet
            </Button>
            <Button variant="outline" onClick={() => navigate('settings')}>
              <HardDrive className="mr-2 h-4 w-4" />
              Backup
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid (Foundational Layout) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>DSA Solved</span>
              <Code2 className="h-4 w-4 text-blue-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">0 / 67</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Curated high-yield sheet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Study Streak</span>
              <Flame className="h-4 w-4 text-amber-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">0 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Ready to start today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Revisions Due</span>
              <RotateCcw className="h-4 w-4 text-purple-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Spaced repetition queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Storage Status</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">IndexedDB local engine</p>
          </CardContent>
        </Card>
      </div>

      {/* Core Preparation Pillars */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-zinc-200">Preparation Roadmap Pillars</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('dsa')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="solved">Module B</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base">Curated 67 DSA Sheet</CardTitle>
              <CardDescription>
                Arrays, Strings, Two Pointers, Trees, Graphs, DP and verified C++ solutions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('revision')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="revise">Module G</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base">Spaced Revision Engine</CardTitle>
              <CardDescription>
                Automatic intervals (1, 3, 7, 21, 60 days) to prevent forgetting algorithms.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('core-cs')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Module E</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base">Core CS Mastery</CardTitle>
              <CardDescription>
                Operating Systems, DBMS, Computer Networks, and Software Engineering principles.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('mock-tests')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="attempted">Module I</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base">Mock Test Assessment</CardTitle>
              <CardDescription>
                Timed screening tests with accuracy metrics, answers, and local history.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('planner')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Module H</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base">Daily Study Planner</CardTitle>
              <CardDescription>
                Daily targets, custom tasks, study streak, and Pomodoro focus timer.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition hover:border-zinc-700 hover:bg-zinc-900/50"
            onClick={() => navigate('settings')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="easy">Storage & Safety</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
              <CardTitle className="mt-2 text-base">Backup & Recovery</CardTitle>
              <CardDescription>
                Deterministic JSON export, diff preview validation, and safe merge restoration.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};
