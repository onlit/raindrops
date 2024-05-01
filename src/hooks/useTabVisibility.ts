import React from 'react';

interface useTabVisibilityProps {
  onVisible: () => void;
  onHidden: () => void;
}

export default function useTabVisibility({
  onVisible,
  onHidden,
}: useTabVisibilityProps) {
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onHidden();
      } else {
        onVisible();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onVisible, onHidden]);
}
