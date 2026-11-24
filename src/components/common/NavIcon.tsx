import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  RotateCcw,
  BarChart3,
  Code2,
  FileCode2,
  Terminal,
  Database,
  Cpu,
  Brain,
  Timer,
  MessageSquare,
  Building2,
  BookOpen,
  AlertOctagon,
  Settings,
  LucideProps,
} from 'lucide-react';

interface NavIconProps extends LucideProps {
  name: string;
}

export const NavIcon: React.FC<NavIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'LayoutDashboard':
      return <LayoutDashboard {...props} />;
    case 'CalendarCheck':
      return <CalendarCheck {...props} />;
    case 'RotateCcw':
      return <RotateCcw {...props} />;
    case 'BarChart3':
      return <BarChart3 {...props} />;
    case 'Code2':
      return <Code2 {...props} />;
    case 'FileCode2':
      return <FileCode2 {...props} />;
    case 'Terminal':
      return <Terminal {...props} />;
    case 'Database':
      return <Database {...props} />;
    case 'Cpu':
      return <Cpu {...props} />;
    case 'Brain':
      return <Brain {...props} />;
    case 'Timer':
      return <Timer {...props} />;
    case 'MessageSquare':
      return <MessageSquare {...props} />;
    case 'Building2':
      return <Building2 {...props} />;
    case 'BookOpen':
      return <BookOpen {...props} />;
    case 'AlertOctagon':
      return <AlertOctagon {...props} />;
    case 'Settings':
      return <Settings {...props} />;
    default:
      return <LayoutDashboard {...props} />;
  }
};
