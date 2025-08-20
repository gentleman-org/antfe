import * as React from 'react';
import { cn } from '~/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, resize = 'vertical', ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        {
          'resize-none': resize === 'none',
          resize: resize === 'both',
          'resize-x': resize === 'horizontal',
          'resize-y': resize === 'vertical',
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
