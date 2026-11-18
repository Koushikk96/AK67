import { AK67Database } from './schema';

// Singleton instance used across the web application
export const db = new AK67Database();

/**
 * Initializes and verifies the IndexedDB database connection.
 * Returns true if opened successfully.
 */
export async function initDatabase(): Promise<boolean> {
  try {
    if (!db.isOpen()) {
      await db.open();
    }
    return true;
  } catch (error) {
    console.error('[AK67 Database] Initialization error:', error);
    return false;
  }
}

export * from './schema';
