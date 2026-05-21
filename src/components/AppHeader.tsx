import { motion } from "motion/react";

interface AppHeaderProps {
  onNotificationClick?: () => void;
}

export default function AppHeader({ onNotificationClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full max-w-[420px] bg-background text-primary px-edge-margin h-16 flex justify-between items-center select-none shadow-sm/5 border-b border-surface-container-high/40 backdrop-blur-md bg-opacity-90">
      <button 
        aria-label="학교 홈"
        className="text-on-surface-variant hover:bg-surface-variant/40 rounded-full p-2 transition-transform active:scale-95 flex items-center justify-center hover:text-primary"
      >
        <span className="material-symbols-outlined text-primary fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
          restaurant
        </span>
      </button>
      
      <h1 className="font-display text-headline-sm font-bold text-primary tracking-tight truncate px-4">
        씨마스고등학교 급식
      </h1>
      
      <button 
        onClick={onNotificationClick}
        aria-label="알림 수신함"
        className="text-on-surface-variant hover:bg-surface-variant/40 rounded-full p-2 transition-transform active:scale-95 flex items-center justify-center hover:text-primary relative"
      >
        <span className="material-symbols-outlined">
          notifications
        </span>
        {/* Subtle unread dot */}
        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full" />
      </button>
    </header>
  );
}
