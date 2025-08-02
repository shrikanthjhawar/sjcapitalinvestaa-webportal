import { useState, useCallback } from 'react';

type CopyStatus = 'inactive' | 'copied' | 'failed';

export const useCopyToClipboard = (timeout = 2000): [CopyStatus, (text: string) => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('inactive');

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('inactive'), timeout);
      },
      () => {
        setCopyStatus('failed');
        setTimeout(() => setCopyStatus('inactive'), timeout);
      }
    );
  }, [timeout]);

  return [copyStatus, copy];
};