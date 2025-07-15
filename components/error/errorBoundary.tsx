// components/error/errorBoundary.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '~/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // send error to monitoring service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center">
      <Button variant="outline" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
}
