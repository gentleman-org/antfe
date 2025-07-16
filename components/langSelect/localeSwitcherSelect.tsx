'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Locale } from '~/lib/i18n/routing';
import { usePathname, useRouter } from '~/lib/i18n/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

type Props = {
  defaultValue: string;
  label: string;
  options: Array<{ value: string; label: string }>;
};

export default function LocaleSwitcherSelect({ defaultValue, label, options }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div className="relative">
      <span className="sr-only">{label}</span>
      <Select value={defaultValue} onValueChange={onSelectChange} disabled={isPending}>
        <SelectTrigger className="liquid-glass-button min-w-[80px] border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="liquid-glass-dropdown">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="cursor-pointer">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
