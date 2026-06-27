import React from 'react';

interface TopNavigationBarProps {
  badgeText?: string;
  rightElement?: React.ReactNode;
}

export function TopNavigationBar({ badgeText, rightElement }: TopNavigationBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300 py-4 px-6 md:px-12 flex justify-between items-center transition-all w-full">
      <div className="flex items-center gap-3">
        <img src="/impact.svg" alt="IMPACT Logo" className="h-10 w-auto -my-2 object-contain" />
        {badgeText && (
          <span className="badge badge-sm badge-outline badge-neutral hidden sm:inline-flex">
            {badgeText}
          </span>
        )}
      </div>
      
      {rightElement && (
        <div className="flex items-center gap-4">
          {rightElement}
        </div>
      )}
    </header>
  );
}
