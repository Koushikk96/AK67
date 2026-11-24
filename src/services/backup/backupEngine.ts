import { AK67Database, db } from '@/db';
import { AK67BackupFile, BackupData, RestorationResult } from '@/types/backup';
import { settingsRepository } from '@/db/repositories/settingsRepository';
import { ProblemProgress, TopicProgress, DailyPlannerEntry, CompanyProfile } from '@/types/database';

export const backupEngine = {
  /**
   * Generates a complete in-memory snapshot of user IndexedDB data.
   */
  async generateExport(database: AK67Database = db): Promise<AK67BackupFile> {
    const [
      problemProgress,
      topicProgress,
      dailyPlanner,
      mockTests,
      companyProfiles,
      notes,
      studySessions,
      appSettings,
    ] = await Promise.all([
      database.problem_progress.toArray(),
      database.topic_progress.toArray(),
      database.daily_planner.toArray(),
      database.mock_tests.toArray(),
      database.company_profiles.toArray(),
      database.notes.toArray(),
      database.study_sessions.toArray(),
      database.app_settings.toArray(),
    ]);

    const now = new Date().toISOString();

    const summary = {
      totalProblemsTracked: problemProgress.length,
      solvedCount: problemProgress.filter((p) => p.status === 'solved').length,
      attemptedCount: problemProgress.filter((p) => p.status === 'attempted').length,
      totalTopicsTracked: topicProgress.length,
      dailyPlannerCount: dailyPlanner.length,
      totalNotes: notes.length,
      mistakesCount: notes.filter((n) => n.isMistakeLog === true).length,
      mockTestsCount: mockTests.length,
      studySessionsCount: studySessions.length,
      companyProfilesCount: companyProfiles.length,
    };

    const data: BackupData = {
      problem_progress: problemProgress,
      topic_progress: topicProgress,
      daily_planner: dailyPlanner,
      mock_tests: mockTests,
      company_profiles: companyProfiles,
      notes: notes,
      study_sessions: studySessions,
      app_settings: appSettings,
    };

    // Update last backup timestamp in settings
    await settingsRepository.setLastBackupDate(now, database);

    return {
      appName: 'AK67',
      appVersion: '1.0.0',
      schemaVersion: 1,
      backupFormatVersion: 1,
      exportedAt: now,
      summary,
      data,
    };
  },

  /**
   * Generates and triggers browser download of the JSON backup.
   */
  async downloadBackup(database: AK67Database = db): Promise<AK67BackupFile> {
    const backup = await this.generateExport(database);
    const jsonString = JSON.stringify(backup, null, 2);

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(
      now.getHours()
    )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    const filename = `AK67_Backup_${dateStr}.json`;

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    return backup;
  },

  /**
   * Non-destructive merge restoration.
   * Resolves conflicts by preserving solved status and merging checkpoints/tasks.
   */
  async restoreMerge(backupFile: AK67BackupFile, database: AK67Database = db): Promise<RestorationResult> {
    let recordsRestored = 0;
    let conflictsResolved = 0;

    const allTables = [
      database.problem_progress,
      database.topic_progress,
      database.daily_planner,
      database.mock_tests,
      database.company_profiles,
      database.notes,
      database.study_sessions,
      database.app_settings,
    ];

    await database.transaction('rw', allTables, async () => {
      // 1. Merge problem_progress
      for (const incoming of backupFile.data.problem_progress || []) {
        const local = await database.problem_progress.get(incoming.id);
        if (!local) {
          await database.problem_progress.put(incoming);
          recordsRestored += 1;
        } else {
          conflictsResolved += 1;
          const merged: ProblemProgress = { ...local };

          // Status precedence: solved > revise > attempted > not_started
          const statusRank: Record<string, number> = {
            solved: 4,
            revise: 3,
            attempted: 2,
            not_started: 1,
          };
          if ((statusRank[incoming.status] || 0) > (statusRank[local.status] || 0)) {
            merged.status = incoming.status;
            merged.solvedAt = incoming.solvedAt || local.solvedAt;
          }

          // Merge notes if distinct
          if (incoming.personalNotes && incoming.personalNotes !== local.personalNotes) {
            if (!local.personalNotes) {
              merged.personalNotes = incoming.personalNotes;
            } else if (!local.personalNotes.includes(incoming.personalNotes)) {
              merged.personalNotes = `${local.personalNotes}\n\n[Restored Note]: ${incoming.personalNotes}`;
            }
          }

          // Bookmark is true if either is true
          merged.bookmarked = local.bookmarked || incoming.bookmarked;

          // Keep larger revision count
          merged.revisionCount = Math.max(local.revisionCount || 0, incoming.revisionCount || 0);

          await database.problem_progress.put(merged);
        }
      }

      // 2. Merge topic_progress
      for (const incoming of backupFile.data.topic_progress || []) {
        const local = await database.topic_progress.get(incoming.id);
        if (!local) {
          await database.topic_progress.put(incoming);
          recordsRestored += 1;
        } else {
          conflictsResolved += 1;
          const mergedCheckpoints = Array.from(
            new Set([...(local.completedCheckpoints || []), ...(incoming.completedCheckpoints || [])])
          );

          // Status precedence: completed > revise > learning > not_started
          const topicStatusRank: Record<string, number> = {
            completed: 4,
            revise: 3,
            learning: 2,
            not_started: 1,
          };
          const localStatus = local.status || 'not_started';
          const incomingStatus = incoming.status || 'not_started';
          const resolvedStatus =
            (topicStatusRank[incomingStatus] || 0) > (topicStatusRank[localStatus] || 0)
              ? incoming.status
              : local.status;

          // Merge notes if distinct
          let mergedNotes = local.notes || '';
          if (incoming.notes && incoming.notes !== local.notes) {
            if (!local.notes) {
              mergedNotes = incoming.notes;
            } else if (!local.notes.includes(incoming.notes)) {
              mergedNotes = `${local.notes}\n\n[Restored Note]: ${incoming.notes}`;
            }
          }

          const mergedTopic: TopicProgress = {
            ...local,
            status: resolvedStatus,
            bookmarked: local.bookmarked || incoming.bookmarked,
            notes: mergedNotes,
            completedCheckpoints: mergedCheckpoints,
            isMastered:
              local.isMastered ||
              incoming.isMastered ||
              mergedCheckpoints.length >= (local.totalCheckpoints || 1),
            revisionCount: Math.max(local.revisionCount || 0, incoming.revisionCount || 0),
            intervalDays: Math.max(local.intervalDays || 0, incoming.intervalDays || 0),
            nextRevisionDate:
              (incoming.nextRevisionDate || '') > (local.nextRevisionDate || '')
                ? incoming.nextRevisionDate
                : local.nextRevisionDate,
            inRevisionQueue: local.inRevisionQueue || incoming.inRevisionQueue,
            lastStudiedAt:
              (incoming.lastStudiedAt || '') > (local.lastStudiedAt || '')
                ? incoming.lastStudiedAt
                : local.lastStudiedAt,
          };
          await database.topic_progress.put(mergedTopic);
        }
      }

      // 3. Merge daily_planner
      for (const incoming of backupFile.data.daily_planner || []) {
        const local = await database.daily_planner.get(incoming.id);
        if (!local) {
          await database.daily_planner.put(incoming);
          recordsRestored += 1;
        } else {
          conflictsResolved += 1;
          const taskMap = new Map();
          for (const t of local.customTasks || []) taskMap.set(t.id, t);
          for (const t of incoming.customTasks || []) {
            if (!taskMap.has(t.id)) {
              taskMap.set(t.id, t);
            }
          }
          const mergedEntry: DailyPlannerEntry = {
            ...local,
            actualProblemsCount: Math.max(local.actualProblemsCount || 0, incoming.actualProblemsCount || 0),
            studyMinutes: Math.max(local.studyMinutes || 0, incoming.studyMinutes || 0),
            customTasks: Array.from(taskMap.values()),
            completed: local.completed || incoming.completed,
          };
          await database.daily_planner.put(mergedEntry);
        }
      }

      // 4. Merge mock_tests
      for (const incoming of backupFile.data.mock_tests || []) {
        const exists = await database.mock_tests.get(incoming.id);
        if (!exists) {
          await database.mock_tests.put(incoming);
          recordsRestored += 1;
        }
      }

      // 5. Merge company_profiles
      for (const incoming of backupFile.data.company_profiles || []) {
        const local = await database.company_profiles.get(incoming.id);
        if (!local) {
          await database.company_profiles.put(incoming);
          recordsRestored += 1;
        } else {
          conflictsResolved += 1;
          const checklistMap = new Map();
          for (const item of local.checklist || []) checklistMap.set(item.id, item);
          for (const item of incoming.checklist || []) {
            if (!checklistMap.has(item.id)) {
              checklistMap.set(item.id, item);
            } else if (item.completed) {
              checklistMap.set(item.id, item);
            }
          }

          const mergedCompany: CompanyProfile = {
            ...local,
            checklist: Array.from(checklistMap.values()),
            updatedAt:
              (incoming.updatedAt || '') > (local.updatedAt || '') ? incoming.updatedAt : local.updatedAt,
          };
          await database.company_profiles.put(mergedCompany);
        }
      }

      // 6. Merge notes
      for (const incoming of backupFile.data.notes || []) {
        const local = await database.notes.get(incoming.id);
        if (!local) {
          await database.notes.put(incoming);
          recordsRestored += 1;
        } else {
          conflictsResolved += 1;
          if ((incoming.updatedAt || '') > (local.updatedAt || '')) {
            await database.notes.put(incoming);
          }
        }
      }

      // 7. Merge study_sessions
      for (const incoming of backupFile.data.study_sessions || []) {
        const exists = await database.study_sessions.get(incoming.id);
        if (!exists) {
          await database.study_sessions.put(incoming);
          recordsRestored += 1;
        }
      }

      // 8. Merge app_settings (Keep local unless unset)
      for (const incoming of backupFile.data.app_settings || []) {
        const local = await database.app_settings.get(incoming.key);
        if (!local) {
          await database.app_settings.put(incoming);
        }
      }
    });

    const nowIso = new Date().toISOString();
    await settingsRepository.setLastBackupDate(nowIso, database);

    return {
      success: true,
      mode: 'merge',
      message: `Successfully merged backup. Added ${recordsRestored} new records and reconciled ${conflictsResolved} conflicts.`,
      recordsRestored,
      conflictsResolved,
      timestamp: nowIso,
    };
  },

  /**
   * Complete clean replace restoration.
   * Atomically clears existing local tables and restores exact state of the backup.
   * Restores snapshot if an error occurs.
   */
  async restoreReplace(backupFile: AK67BackupFile, database: AK67Database = db): Promise<RestorationResult> {
    const allTables = [
      database.problem_progress,
      database.topic_progress,
      database.daily_planner,
      database.mock_tests,
      database.company_profiles,
      database.notes,
      database.study_sessions,
      database.app_settings,
    ];

    // Take snapshot for fallback safety
    const snapshot = {
      problem_progress: await database.problem_progress.toArray(),
      topic_progress: await database.topic_progress.toArray(),
      daily_planner: await database.daily_planner.toArray(),
      mock_tests: await database.mock_tests.toArray(),
      company_profiles: await database.company_profiles.toArray(),
      notes: await database.notes.toArray(),
      study_sessions: await database.study_sessions.toArray(),
      app_settings: await database.app_settings.toArray(),
    };

    let totalRestored = 0;

    try {
      await database.transaction('rw', allTables, async () => {
        // Clear all tables
        await Promise.all([
          database.problem_progress.clear(),
          database.topic_progress.clear(),
          database.daily_planner.clear(),
          database.mock_tests.clear(),
          database.company_profiles.clear(),
          database.notes.clear(),
          database.study_sessions.clear(),
          database.app_settings.clear(),
        ]);

        // Bulk put all records
        if (backupFile.data.problem_progress?.length) {
          await database.problem_progress.bulkPut(backupFile.data.problem_progress);
          totalRestored += backupFile.data.problem_progress.length;
        }
        if (backupFile.data.topic_progress?.length) {
          await database.topic_progress.bulkPut(backupFile.data.topic_progress);
          totalRestored += backupFile.data.topic_progress.length;
        }
        if (backupFile.data.daily_planner?.length) {
          await database.daily_planner.bulkPut(backupFile.data.daily_planner);
          totalRestored += backupFile.data.daily_planner.length;
        }
        if (backupFile.data.mock_tests?.length) {
          await database.mock_tests.bulkPut(backupFile.data.mock_tests);
          totalRestored += backupFile.data.mock_tests.length;
        }
        if (backupFile.data.company_profiles?.length) {
          await database.company_profiles.bulkPut(backupFile.data.company_profiles);
          totalRestored += backupFile.data.company_profiles.length;
        }
        if (backupFile.data.notes?.length) {
          await database.notes.bulkPut(backupFile.data.notes);
          totalRestored += backupFile.data.notes.length;
        }
        if (backupFile.data.study_sessions?.length) {
          await database.study_sessions.bulkPut(backupFile.data.study_sessions);
          totalRestored += backupFile.data.study_sessions.length;
        }
        if (backupFile.data.app_settings?.length) {
          await database.app_settings.bulkPut(backupFile.data.app_settings);
          totalRestored += backupFile.data.app_settings.length;
        }
      });
    } catch (err) {
      console.error('[backupEngine] Error during replace, rolling back snapshot:', err);
      // Attempt rollback from snapshot
      try {
        await database.transaction('rw', allTables, async () => {
          await database.problem_progress.bulkPut(snapshot.problem_progress);
          await database.topic_progress.bulkPut(snapshot.topic_progress);
          await database.daily_planner.bulkPut(snapshot.daily_planner);
          await database.mock_tests.bulkPut(snapshot.mock_tests);
          await database.company_profiles.bulkPut(snapshot.company_profiles);
          await database.notes.bulkPut(snapshot.notes);
          await database.study_sessions.bulkPut(snapshot.study_sessions);
          await database.app_settings.bulkPut(snapshot.app_settings);
        });
      } catch (rollbackErr) {
        console.error('[backupEngine] Rollback failed:', rollbackErr);
      }
      throw new Error(`Failed to restore backup: ${err instanceof Error ? err.message : String(err)}`);
    }

    const nowIso = new Date().toISOString();
    await settingsRepository.setLastBackupDate(nowIso, database);

    return {
      success: true,
      mode: 'replace',
      message: `Clean restoration complete. Successfully restored ${totalRestored} records across all tables.`,
      recordsRestored: totalRestored,
      conflictsResolved: 0,
      timestamp: nowIso,
    };
  },
};
