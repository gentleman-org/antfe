import { cn } from '~/lib/utils';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

export interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
}

export default function Callout({ children, type = 'info' }: CalloutProps) {
  const icons = {
    info: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
  };

  const styles = {
    info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
    error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
    success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-200',
  };

  return (
    <div className={cn('my-4 flex items-start gap-3 rounded-lg border p-4', styles[type])}>
      <div className="mt-0.5 flex-shrink-0">{icons[type]}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
