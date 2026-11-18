import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import {
  Download,
  Upload,
  HardDrive,
  Moon,
  Sun,
  AlertTriangle,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Storage & Safety</span>
          <Badge variant="easy">Phase 2 Full Engine</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Data Storage, Backup & Settings</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          AK67 does not collect accounts or transmit your study data to the cloud. You own your preparation data 100% locally on this device.
        </p>
      </div>

      {/* Critical Storage Warning Callout */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-amber-300">Device Independence & Browser Storage Notice</h4>
            <p className="text-zinc-300 leading-relaxed">
              Your preparation progress is saved strictly inside this browser's IndexedDB storage. If you clear browser cookies & site data, or switch devices, your data will not transfer automatically without a JSON backup file. Export your progress periodically to prevent accidental loss.
            </p>
          </div>
        </div>
      </div>

      {/* Backup and Restoration Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-emerald-400" />
                <CardTitle className="text-sm font-semibold">Export JSON Backup</CardTitle>
              </div>
              <Badge variant="solved">Deterministic</Badge>
            </div>
            <CardDescription className="pt-2 text-xs text-zinc-400">
              Downloads a complete snapshot of all solved problems, notes, revision queues, and mock test scores in a validated JSON file.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full text-xs" disabled>
              <Download className="mr-2 h-3.5 w-3.5" />
              Download Backup (Active in Phase 2)
            </Button>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-blue-400" />
                <CardTitle className="text-sm font-semibold">Restore From Backup</CardTitle>
              </div>
              <Badge variant="outline">Diff Preview</Badge>
            </div>
            <CardDescription className="pt-2 text-xs text-zinc-400">
              Safely import a previously exported backup file. Features dry-run diff preview and Merge vs Replace conflict resolution.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full text-xs" disabled>
              <Upload className="mr-2 h-3.5 w-3.5" />
              Import Backup (Active in Phase 2)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Visual & Application Preferences */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-200">Application Preferences</h3>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="h-4 w-4 text-blue-400" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-400" />
                )}
                <div>
                  <h4 className="text-xs font-semibold text-zinc-100">Interface Theme</h4>
                  <p className="text-[11px] text-zinc-400">
                    Switch between Premium Charcoal dark theme and Neutral paper light theme
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={toggleTheme} className="text-xs">
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HardDrive className="h-4 w-4 text-emerald-400" />
                <div>
                  <h4 className="text-xs font-semibold text-zinc-100">Persistent Engine</h4>
                  <p className="text-[11px] text-zinc-400">
                    Browser IndexedDB API with Dexie.js ACID transactions
                  </p>
                </div>
              </div>
              <Badge variant="solved">Enabled</Badge>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
