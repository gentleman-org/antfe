import { cn } from '~/lib/utils';

// Card 组件
function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-card text-card-foreground my-6 rounded-lg border shadow-sm', className)} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-2xl leading-none font-semibold tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
export { CardHeader, CardTitle, CardContent };
