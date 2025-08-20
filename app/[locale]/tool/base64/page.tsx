'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Copy, ArrowUpDown, ArrowLeft } from 'lucide-react';
import PageLayout from '~/components/layout/pageLayout';
import { Link } from '~/lib/i18n/navigation';

export default function Base64Page() {
  const t = useTranslations('tool.base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isEncoding, setIsEncoding] = useState(true);

  const handleConvert = () => {
    try {
      if (isEncoding) {
        // Encode to Base64
        const encoded = btoa(input);
        setOutput(encoded);
      } else {
        // Decode from Base64
        const decoded = atob(input);
        setOutput(decoded);
      }
    } catch {
      setOutput('Error: Invalid input for decoding');
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setIsEncoding(!isEncoding);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <PageLayout>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/tools" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('backToTools')}
            </Link>
          </Button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('description')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {isEncoding ? t('plainTextInput') : t('base64Input')}
                <Button variant="outline" size="sm" onClick={handleSwap} className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  {t('swap')}
                </Button>
              </CardTitle>
              <CardDescription>{isEncoding ? t('inputDescription') : t('base64InputDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={isEncoding ? t('inputPlaceholder') : t('base64Placeholder')}
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                className="min-h-32"
              />
              <Button onClick={handleConvert} className="mt-4 w-full" disabled={!input.trim()}>
                {isEncoding ? t('encodeButton') : t('decodeButton')}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {isEncoding ? t('base64Output') : t('plainTextOutput')}
                {output && (
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(output)} className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    {t('copy')}
                  </Button>
                )}
              </CardTitle>
              <CardDescription>{isEncoding ? t('outputDescription') : t('decodedOutputDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder={t('resultPlaceholder')} value={output} readOnly className="min-h-32" />
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t('aboutTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t('aboutDescription')}</p>
            <ul className="mt-4">
              <li>{t('aboutFeatures.size')}</li>
              <li>{t('aboutFeatures.characters')}</li>
              <li>{t('aboutFeatures.padding')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
