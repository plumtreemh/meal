import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ProfileView() {
  const [allergyAlert, setAllergyAlert] = useState<boolean>(true);
  const [dailyAlert, setDailyAlert] = useState<boolean>(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-stack-gap-lg pb-10 select-none"
    >
      {/* Profile Card Banner (Sage Green Organic Gradient) */}
      <section className="relative bg-gradient-to-br from-secondary-container to-surface-bright rounded-2xl p-6 shadow-[0_6px_22px_rgba(79,111,0,0.06)] overflow-hidden group border border-primary/5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar container */}
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-white/50 relative overflow-hidden shrink-0">
              <span className="material-symbols-outlined text-[36px] text-secondary fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                face
              </span>
            </div>
            
            <div className="flex flex-col">
              <h2 className="font-display text-headline-md text-on-secondary-container font-extrabold leading-tight">
                김학생
              </h2>
              <span className="font-sans text-body-md text-on-surface-variant mt-1 font-semibold">
                2학년 3반 15번
              </span>
            </div>
          </div>
          
          <button 
            aria-label="프로필 정보 편집"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 hover:bg-white text-secondary transition-colors shadow-sm cursor-pointer border border-primary/5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
      </section>

      {/* Logout Dialog Option */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-error-container/20 text-on-error-container p-4 rounded-xl text-sm border border-error-container font-medium flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error">info</span>
              <span>정말 로그아웃 하시겠습니까?</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-1 bg-surface-container-highest rounded-md hover:bg-surface-dim transition-colors text-xs font-bold text-on-surface"
              >
                취소
              </button>
              <button 
                onClick={() => {
                  alert("데모 환경이므로 로그아웃 기능은 비활성화되었습니다.");
                  setShowLogoutConfirm(false);
                }}
                className="px-3 py-1 bg-error text-on-error rounded-md hover:bg-opacity-90 transition-opacity text-xs font-bold"
              >
                확인
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel List */}
      <section className="flex flex-col gap-3">
        <h3 className="font-display text-label-md text-outline px-2 mb-1 select-none">
          환경 설정
        </h3>

        {/* Alerts Settings Card */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(79,111,0,0.03)] divide-y divide-surface-container-high/60 overflow-hidden border border-surface-variant/40">
          
          {/* Allergy Settings Switcher block */}
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-body-lg text-on-surface font-bold">
                    알레르기 경고 알림
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant mt-0.5 font-medium">
                    식단에 위험 성분이 포함되면 알림
                  </span>
                </div>
              </div>
              
              {/* Custom IOS-style slider Toggle Switch */}
              <button
                onClick={() => setAllergyAlert(!allergyAlert)}
                aria-label="알레르기 알림 토글"
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  allergyAlert ? "bg-primary" : "bg-surface-container-highest"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    allergyAlert ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            
            {/* Active Alert Allergy Specific Chips */}
            <div className="flex gap-1.5 pl-[52px]">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase">
                우유
              </span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase">
                땅콩
              </span>
            </div>
          </div>

          {/* Daily Alert Alert Switcher */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container/45 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px] fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  notifications_active
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-body-lg text-on-surface font-bold">
                  일일 식단 알림
                </span>
                <span className="font-sans text-xs text-on-surface-variant mt-0.5 font-medium">
                  매일 아침 오늘 급식 메뉴를 알려드려요
                </span>
              </div>
            </div>
            
            {/* Custom slider Toggle Switch */}
            <button
              onClick={() => setDailyAlert(!dailyAlert)}
              aria-label="일일 식단 알림 토글"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                dailyAlert ? "bg-primary" : "bg-surface-container-highest"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  dailyAlert ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Account and Customer Support Link Buttons Card */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(79,111,0,0.03)] divide-y divide-surface-container-high/60 overflow-hidden border border-surface-variant/40">
          
          <button 
            type="button"
            onClick={() => alert("고객센터 준비 중입니다. 급식 관련 건의는 행정실에 문의해 주세요!")}
            className="w-full p-5 flex items-center justify-between hover:bg-surface-bright active:bg-surface-container transition-colors text-left outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <span className="font-sans text-body-lg text-on-surface font-bold">
                고객센터
              </span>
            </div>
            <span className="material-symbols-outlined text-outline text-lg">chevron_right</span>
          </button>

          <button 
            type="button"
            onClick={handleLogout}
            className="w-full p-5 flex items-center justify-between hover:bg-surface-bright active:bg-surface-container transition-colors text-left outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </div>
              <span className="font-sans text-body-lg text-on-surface font-bold text-on-surface-variant">
                로그아웃
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="mt-8 flex flex-col items-center justify-center gap-1.5 pb-6 text-center select-none font-sans">
        <span className="font-display text-label-md text-outline">
          © 2026 씨마스고등학교 급식
        </span>
        <span className="text-[10px] text-outline/60 font-bold tracking-wide uppercase">
          버전 1.3.0 · 안정 버전
        </span>
      </footer>
    </motion.div>
  );
}
