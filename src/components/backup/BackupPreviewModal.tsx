import React, { useState } from 'react';
import { BackupDiffAnalysis, RestorationMode } from '@/types/backup';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CheckCircle2,
  GitMerge,
  RefreshCw,
  X,
  FileText,
  Calendar,
  Layers,
} from 'lucide-react';

interface BackupPreviewModalProps {
  diff: BackupDiffAnalysis;
  onCancel: () => void;
  onConfirm: (mode: RestorationMode) => Promise<void>;
  isLoading: boolean;
}

export const BackupPreviewModal: React.FC<BackupPreviewModalProps> = ({
  diff,
  onCancel,
  onConfirm,
  isLoading,
}) => {
  const [selectedMode, setSelectedMode] = useState<RestorationMode>('merge');
  const [replaceConfirmed, setReplaceConfirmed] = useState(false);

  const formattedDate = new Date(diff.backupFile.exportedAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const handleConfirm = async () => {
    if (selectedMode === 'replace' && !replaceConfirmed) {
      return;
    }
    await onConfirm(selectedMode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onCancel : undefined}
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="backup-preview-title"
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-zinc-750 bg-[#121215] p-5 sm:p-6 shadow-2xl text-zinc-100 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="solved">Verified Backup</Badge>
              <span className="text-xs text-zinc-400">Schema v{diff.backupFile.schemaVersion}</span>
            </div>
            <h2 id="backup-preview-title" className="text-lg font-bold text-white mt-1">Review & Restore Backup</h2>
            <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
              <Calendar className="h-3 w-3 text-zinc-400" />
              <span>Exported on: {formattedDate}</span>
              <span>•</span>
              <FileText className="h-3 w-3 text-zinc-400" />
              <span>Format v{diff.backupFile.backupFormatVersion}</span>
            </p>
          </div>

          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800/80 text-zinc-400 hover:text-white disabled:opacity-50"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Diff Metrics Banner */}
        <div className="my-4 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-center">
            <p className="text-xl font-bold text-blue-400">{diff.totalNewRecords}</p>
            <p className="text-[11px] font-medium text-zinc-300">New Records</p>
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-center">
            <p className="text-xl font-bold text-amber-400">{diff.totalConflictingRecords}</p>
            <p className="text-[11px] font-medium text-zinc-300">Modified / Conflicts</p>
          </div>

          <div className="rounded-lg border border-zinc-750 bg-zinc-800/40 p-3 text-center">
            <p className="text-xl font-bold text-zinc-300">{diff.totalIdenticalRecords}</p>
            <p className="text-[11px] font-medium text-zinc-400">Identical Records</p>
          </div>
        </div>

        {/* Table breakdown accordion */}
        <div className="space-y-2 mb-5">
          <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-zinc-400" />
            <span>Storage Table Analysis</span>
          </h4>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 divide-y divide-zinc-800/60 max-h-48 overflow-y-auto">
            {diff.tables.map((t) => (
              <div key={t.tableName} className="flex items-center justify-between px-3.5 py-2 text-xs">
                <span className="font-medium text-zinc-300">{t.label}</span>
                <div className="flex items-center gap-2 text-[11px]">
                  {t.newCount > 0 && (
                    <span className="text-emerald-400">+{t.newCount} new</span>
                  )}
                  {t.conflictCount > 0 && (
                    <span className="text-amber-400">{t.conflictCount} conflicts</span>
                  )}
                  {t.identicalCount > 0 && (
                    <span className="text-zinc-500">{t.identicalCount} unchanged</span>
                  )}
                  {t.backupCount === 0 && (
                    <span className="text-zinc-600">0 in backup</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restoration Mode Selector */}
        <div className="space-y-3 border-t border-zinc-800 pt-4">
          <h4 className="text-xs font-semibold text-zinc-200">Select Restoration Strategy</h4>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Merge Card */}
            <div
              onClick={() => setSelectedMode('merge')}
              className={`cursor-pointer rounded-lg border p-3.5 transition ${
                selectedMode === 'merge'
                  ? 'border-blue-500/60 bg-blue-500/10 ring-1 ring-blue-500/30'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <GitMerge className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-semibold text-zinc-100">Merge (Recommended)</span>
                </div>
                {selectedMode === 'merge' && <CheckCircle2 className="h-4 w-4 text-blue-400" />}
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Non-destructive merge. Adds new records and preserves existing progress. Solved statuses take precedence over unsolved.
              </p>
            </div>

            {/* Replace Card */}
            <div
              onClick={() => setSelectedMode('replace')}
              className={`cursor-pointer rounded-lg border p-3.5 transition ${
                selectedMode === 'replace'
                  ? 'border-rose-500/60 bg-rose-500/10 ring-1 ring-rose-500/30'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-rose-400" />
                  <span className="text-xs font-semibold text-zinc-100">Clean Replace</span>
                </div>
                {selectedMode === 'replace' && <CheckCircle2 className="h-4 w-4 text-rose-400" />}
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Replaces current device storage with the exact snapshot from the backup file. Overwrites existing progress.
              </p>
            </div>
          </div>

          {/* Explicit Confirmation Checkbox for Replace Mode */}
          {selectedMode === 'replace' && (
            <div className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-xs text-rose-200">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={replaceConfirmed}
                  onChange={(e) => setReplaceConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-rose-600 focus:ring-rose-500"
                />
                <span className="leading-snug">
                  I understand that Clean Replace will overwrite my current device progress with this backup snapshot.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 border-t border-zinc-800 pt-4">
          <Button variant="outline" size="sm" onClick={onCancel} disabled={isLoading} className="w-full sm:w-auto">
            Cancel
          </Button>

          <Button
            variant={selectedMode === 'replace' ? 'destructive' : 'primary'}
            size="sm"
            onClick={handleConfirm}
            disabled={isLoading || (selectedMode === 'replace' && !replaceConfirmed)}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Restoring...</span>
              </span>
            ) : selectedMode === 'replace' ? (
              'Confirm Clean Replace'
            ) : (
              'Confirm Safe Merge'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
