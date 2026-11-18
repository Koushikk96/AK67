import { db, AK67Database } from '@/db';
import { DatabaseStats } from '@/types/database';
import { settingsRepository } from '@/db/repositories/settingsRepository';

export const statsService = {
  async getDatabaseStats(database: AK67Database = db): Promise<DatabaseStats> {
    const [
      problemProgressCount,
      solvedProblemsCount,
      topicProgressCount,
      dailyPlannerCount,
      mockTestsCount,
      companyProfilesCount,
      notesCount,
      mistakesCount,
      studySessionsCount,
      lastBackupDate,
    ] = await Promise.all([
      database.problem_progress.count(),
      database.problem_progress.where('status').equals('solved').count(),
      database.topic_progress.count(),
      database.daily_planner.count(),
      database.mock_tests.count(),
      database.company_profiles.count(),
      database.notes.count(),
      database.notes.filter((n) => n.isMistakeLog === true).count(),
      database.study_sessions.count(),
      settingsRepository.getLastBackupDate(database),
    ]);

    return {
      problemProgressCount,
      solvedProblemsCount,
      topicProgressCount,
      dailyPlannerCount,
      mockTestsCount,
      companyProfilesCount,
      notesCount,
      mistakesCount,
      studySessionsCount,
      lastBackupDate,
    };
  },
};
