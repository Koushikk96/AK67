import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { useDatabaseStats } from '@/hooks/useDatabaseStats';
import { backupValidator } from '@/services/backup/backupValidator';
import { backupDiff } from '@/services/backup/backupDiff';
import { backupEngine } from '@/services/backup/backupEngine';
import { BackupDiffAnalysis, RestorationMode } from '@/types/backup';
import { BackupPreviewModal } from '@/components/backup/BackupPreviewModal';
import { StorageOverviewCard } from '@/components/backup/StorageOverviewCard';
import {
  Download,
  Upload,
  HardDrive,
  Moon,
  Sun,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  XCircle,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { stats, loading: statsLoading, refreshStats } = useDatabaseStats();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingDiff, setPendingDiff] = useState<BackupDiffAnalysis | null>(null);

  // 1. Handle JSON Export
  const handleExportBackup = async () => {
    try {
      setIsExporting(true);
      setErrorMessage(null);
      await backupEngine.downloadBackup();
      await refreshStats();
      setSuccessMessage('Backup successfully exported to your downloads folder!');
    } catch (err) {
      console.error('[Settings] Export failed:', err);
      setErrorMessage(`Export failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Handle File Selection for Import
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be selected again if needed
    e.target.value = '';

    setErrorMessage(null);
    setSuccessMessage(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          setErrorMessage('Selected file is not valid JSON. Please check the file and try again.');
          return;
        }

        // Validate structure & schema
        const validation = backupValidator.validate(parsed);
        if (!validation.isValid) {
          setErrorMessage(validation.error);
          return;
        }

        // Perform dry-run diff
        const diff = await backupDiff.analyze(validation.backup);
        setPendingDiff(diff);
      } catch (err) {
        console.error('[Settings] Parsing error:', err);
        setErrorMessage(`Failed to read backup file: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    reader.onerror = () => {
      setErrorMessage('Could not read the selected file from disk.');
    };

    reader.readAsText(file);
  };

  // 3. Confirm and Commit Restoration
  const handleConfirmRestoration = async (mode: RestorationMode) => {
    if (!pendingDiff) return;

    try {
      setIsImporting(true);
      setErrorMessage(null);

      const result =
        mode === 'replace'
          ? await backupEngine.restoreReplace(pendingDiff.backupFile)
          : await backupEngine.restoreMerge(pendingDiff.backupFile);

      await refreshStats();
      setPendingDiff(null);
      setSuccessMessage(result.message);
    } catch (err) {
      console.error('[Settings] Restoration failed:', err);
      setErrorMessage(`Restoration failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Page Title & Status */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Storage & Safety
          </span>
          <Badge variant="solved">Phase 2 Active</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Data Storage, Backup & Settings</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          AK67 never collects passwords or uploads your study logs to the cloud. You have 100% ownership of your placement data on this device.
        </p>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-200 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-400 hover:text-white"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      {/* Error Notification Banner */}
      {errorMessage && (
        <div className="flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-200 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-white"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Storage Architecture Overview */}
      <StorageOverviewCard stats={stats} loading={statsLoading} />

      {/* Storage Reality Notice Callout */}
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
        {/* Export Card */}
        <Card className="border-zinc-800 bg-[#121215]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-emerald-400" />
                <CardTitle className="text-sm font-semibold">Export JSON Backup</CardTitle>
              </div>
              <Badge variant="solved">Deterministic</Badge>
            </div>
            <CardDescription className="pt-2 text-xs text-zinc-400">
              Downloads a complete timestamped JSON snapshot of your solved problems, notes, revision queues, and mock test scores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="primary"
              onClick={handleExportBackup}
              disabled={isExporting}
              className="w-full text-xs gap-2"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Generating Backup...
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  Download Backup File (.json)
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Import Card */}
        <Card className="border-zinc-800 bg-[#121215]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-blue-400" />
                <CardTitle className="text-sm font-semibold">Restore From Backup</CardTitle>
              </div>
              <Badge variant="outline">Diff Preview</Badge>
            </div>
            <CardDescription className="pt-2 text-xs text-zinc-400">
              Restore previously exported progress with schema validation, dry-run diff preview, and Merge vs Replace options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="w-full text-xs gap-2 border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800"
            >
              <FileCheck className="h-3.5 w-3.5 text-blue-400" />
              Select Backup File to Restore
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Visual & Application Preferences */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-200">Application Preferences</h3>

        <Card className="border-zinc-800 bg-[#121215]">
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

        <Card className="border-zinc-800 bg-[#121215]">
          <CardHeader className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HardDrive className="h-4 w-4 text-emerald-400" />
                <div>
                  <h4 className="text-xs font-semibold text-zinc-100">Persistent Engine</h4>
                  <p className="text-[11px] text-zinc-400">
                    IndexedDB database: <code>AK67_Database</code> (Version 1)
                  </p>
                </div>
              </div>
              <Badge variant="solved">Active</Badge>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Restoration Modal */}
      {pendingDiff && (
        <BackupPreviewModal
          diff={pendingDiff}
          onCancel={() => setPendingDiff(null)}
          onConfirm={handleConfirmRestoration}
          isLoading={isImporting}
        />
      )}
    </div>
  );
};
