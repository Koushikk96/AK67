import React, { useState } from 'react';
import { useDailyPlanner } from '@/hooks/useDailyPlanner';
import { PlannerCategory } from '@/types/database';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  CalendarCheck,
  Target,
  Clock,
  Plus,
  Trash2,
  Flame,
  CheckSquare,
  Square,
} from 'lucide-react';

const CATEGORIES: PlannerCategory[] = [
  'DSA',
  'C++',
  'SQL',
  'DBMS',
  'OS',
  'Computer Networks',
  'Software Engineering',
  'Aptitude',
  'Revision',
  'Mock Test',
];

export const PlannerPage: React.FC = () => {
  const {
    entry,
    addTask,
    toggleTask,
    deleteTask,
    updateTargets,
    updateReflection,
  } = useDailyPlanner();

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<PlannerCategory>('DSA');
  const [newTaskTopic, setNewTaskTopic] = useState('');
  const [newTaskDuration, setNewTaskDuration] = useState(30);
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTargets, setIsEditingTargets] = useState(false);

  // Target inputs
  const [targetProblems, setTargetProblems] = useState(entry?.targetProblemsCount || 3);
  const [targetMinutes, setTargetMinutes] = useState(entry?.targetStudyMinutes || 60);
  const [targetAptitude, setTargetAptitude] = useState(entry?.targetAptitudeCount || 5);

  const customTasks = entry?.customTasks || [];
  const completedTasks = customTasks.filter((t) => t.completed);
  const pendingTasks = customTasks.filter((t) => !t.completed);

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    await addTask(
      newTaskText,
      newTaskCategory,
      newTaskTopic,
      newTaskDuration,
      newTaskPriority
    );
    setNewTaskText('');
    setNewTaskTopic('');
    setIsAddingTask(false);
  };

  const handleSaveTargets = async () => {
    await updateTargets({
      targetProblemsCount: Number(targetProblems) || 3,
      targetStudyMinutes: Number(targetMinutes) || 60,
      targetAptitudeCount: Number(targetAptitude) || 5,
    });
    setIsEditingTargets(false);
  };

  const handleLogMinutes = async (minutesToAdd: number) => {
    const current = entry?.studyMinutes || 0;
    await updateTargets({
      studyMinutes: current + minutesToAdd,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module H</span>
          <Badge variant="outline">Placement Routine Architecture</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Daily Study Planner</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Structure your daily preparation targets, manage time-boxed checklists across DSA, technical topics, aptitude, and revision.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setIsAddingTask(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-8"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Daily Targets & Live Progress Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* DSA Target Card */}
        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                DSA Problem Target
              </span>
              <Target className="w-4 h-4 text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {entry?.actualProblemsCount || 0}{' '}
              <span className="text-sm font-normal text-zinc-500">
                / {entry?.targetProblemsCount || 3} problems
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (((entry?.actualProblemsCount || 0) / (entry?.targetProblemsCount || 3)) * 100)
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-zinc-400">
              <span>Progress</span>
              <button
                onClick={() =>
                  updateTargets({ actualProblemsCount: (entry?.actualProblemsCount || 0) + 1 })
                }
                className="text-blue-400 hover:underline"
              >
                +1 Solved Today
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Focus Study Time Card */}
        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Focus Study Time
              </span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {entry?.studyMinutes || 0}{' '}
              <span className="text-sm font-normal text-zinc-500">
                / {entry?.targetStudyMinutes || 60} mins
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (((entry?.studyMinutes || 0) / (entry?.targetStudyMinutes || 60)) * 100)
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-zinc-400">
              <span>Quick Log:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleLogMinutes(15)}
                  className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px]"
                >
                  +15m
                </button>
                <button
                  onClick={() => handleLogMinutes(30)}
                  className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px]"
                >
                  +30m
                </button>
                <button
                  onClick={() => handleLogMinutes(60)}
                  className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px]"
                >
                  +60m
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aptitude Target Card */}
        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Aptitude Goal
              </span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {entry?.actualAptitudeCount || 0}{' '}
              <span className="text-sm font-normal text-zinc-500">
                / {entry?.targetAptitudeCount || 5} questions
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (((entry?.actualAptitudeCount || 0) / (entry?.targetAptitudeCount || 5)) * 100)
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-zinc-400">
              <span>Progress</span>
              <button
                onClick={() =>
                  updateTargets({ actualAptitudeCount: (entry?.actualAptitudeCount || 0) + 1 })
                }
                className="text-amber-400 hover:underline"
              >
                +1 Solved
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target Configuration Dropdown / Modal */}
      {isEditingTargets ? (
        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/10 space-y-4">
          <h3 className="text-sm font-semibold text-white">Configure Today&apos;s Target Quotas</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Daily DSA Target (Problems)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={targetProblems}
                onChange={(e) => setTargetProblems(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Focus Time Target (Minutes)</label>
              <input
                type="number"
                min="15"
                max="600"
                step="15"
                value={targetMinutes}
                onChange={(e) => setTargetMinutes(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Aptitude Target (Questions)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={targetAptitude}
                onChange={(e) => setTargetAptitude(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingTargets(false)}
              className="text-xs h-7"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveTargets}
              className="bg-blue-600 hover:bg-blue-500 text-xs h-7 text-white"
            >
              Save Targets
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setTargetProblems(entry?.targetProblemsCount || 3);
              setTargetMinutes(entry?.targetStudyMinutes || 60);
              setTargetAptitude(entry?.targetAptitudeCount || 5);
              setIsEditingTargets(true);
            }}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ⚙ Edit Daily Targets
          </button>
        </div>
      )}

      {/* Add Task Form */}
      {isAddingTask && (
        <form
          onSubmit={handleSaveTask}
          className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-4 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="text-sm font-semibold text-white">Create New Study Task</h3>
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Task Action / Title *</label>
              <input
                type="text"
                placeholder="e.g., Solve 3Sum and Sliding Window Maximum"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Category</label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as PlannerCategory)}
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-blue-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Duration (Minutes)</label>
                <select
                  value={newTaskDuration}
                  onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-blue-500"
                >
                  <option value={15}>15 Minutes</option>
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                  <option value={90}>90 Minutes</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddingTask(false)}
              className="text-xs h-8"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-500 text-xs h-8 text-white">
              Add to Study Plan
            </Button>
          </div>
        </form>
      )}

      {/* Task List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-200">
            Today&apos;s Action Items ({pendingTasks.length} pending, {completedTasks.length} done)
          </h2>
        </div>

        {customTasks.length === 0 ? (
          <div className="p-10 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20 space-y-3">
            <CalendarCheck className="w-8 h-8 text-zinc-500 mx-auto" />
            <p className="text-sm text-zinc-300 font-medium">No tasks planned for today yet.</p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Plan 2-3 focused tasks to ensure consistent progress across coding, CS fundamentals, and aptitude.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddingTask(true)}
              className="text-xs mt-2"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Your First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Pending Tasks */}
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all gap-3"
              >
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-zinc-500 hover:text-blue-400 mt-0.5"
                    aria-label="Toggle task"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-zinc-100 leading-snug">{task.text}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {task.category && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {task.category}
                        </Badge>
                      )}
                      {task.targetDurationMinutes && (
                        <span className="text-[10px] text-zinc-500 flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {task.targetDurationMinutes}m
                        </span>
                      )}
                      <Badge
                        variant={
                          task.priority === 'high'
                            ? 'urgent'
                            : task.priority === 'medium'
                            ? 'attempted'
                            : 'secondary'
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 rounded text-zinc-500 hover:text-rose-400 transition-colors"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="pt-3 space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
                  Completed Tasks ({completedTasks.length})
                </span>
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-zinc-800/60 bg-zinc-950/40 opacity-75 gap-3"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-emerald-400 hover:text-zinc-400"
                        aria-label="Untoggle task"
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-zinc-400 line-through leading-snug">{task.text}</p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 text-zinc-600 hover:text-rose-400"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Daily Reflection Section */}
      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-3">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          End-of-Day Placement Reflection
        </h3>
        <textarea
          rows={3}
          value={entry?.dailyReflection || ''}
          onChange={(e) => updateReflection(e.target.value)}
          placeholder="What algorithmic edge case stumped you today? What concept needs faster recall tomorrow?"
          className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};
