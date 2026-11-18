import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'solved' | 'attempted' | 'revise' | 'urgent' | 'easy';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors';

  const variants = {
    default: 'bg-zinc-800 text-zinc-300 border border-zinc-700/50',
    secondary: 'bg-zinc-900 text-zinc-400 border border-zinc-800',
    outline: 'border border-zinc-700/60 text-zinc-300',
    solved: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    attempted: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    revise: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    urgent: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    easy: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
