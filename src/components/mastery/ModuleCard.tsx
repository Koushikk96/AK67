import React from 'react';
import { MasteryModule } from '@/types/mastery';
import { CheckCircle2 } from 'lucide-react';

interface ModuleCardProps {
  module: MasteryModule;
  completedCount: number;
  isSelected: boolean;
  onSelect: (moduleNumber: number) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  completedCount,
  isSelected,
  onSelect,
}) => {
  const totalTopics = module.topics.length;
  const percentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div
      onClick={() => onSelect(module.number)}
      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400">
            Module {module.number}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {completedCount}/{totalTopics} topics
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1">
          {module.title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {module.description}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Progress
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{percentage}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
