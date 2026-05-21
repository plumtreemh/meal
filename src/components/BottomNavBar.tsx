import { ViewType } from "../types";
import { motion } from "motion/react";

interface BottomNavBarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function BottomNavBar({ currentView, onViewChange }: BottomNavBarProps) {
  const navItems: { view: ViewType; label: string; icon: string }[] = [
    { view: "home", label: "홈", icon: "home" },
    { view: "schedule", label: "식단표", icon: "calendar_month" },
    { view: "nutrition", label: "영양계산", icon: "calculate" },
    { view: "profile", label: "프로필", icon: "person" }
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] h-20 bg-surface/80 backdrop-blur-md border-t border-surface-container-high/40 shadow-lg z-50 flex justify-around items-center px-4 rounded-t-2xl">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            aria-label={`${item.label} 탭`}
            onClick={() => onViewChange(item.view)}
            className={`flex flex-col items-center justify-center relative py-1 px-4 rounded-2xl transition-all duration-200 outline-none select-none ${
              isActive 
                ? "bg-primary text-on-primary font-bold shadow-md scale-95" 
                : "text-on-surface-variant hover:text-primary active:scale-95"
            }`}
          >
            <span 
              className="material-symbols-outlined mb-0.5 text-[24px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[11px] tracking-wide leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
