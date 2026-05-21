import { useState } from "react";
import { ViewType } from "./types";
import { getTodayKST, getDefaultSelectedDate } from "./utils/dateUtils";
import { generateMockMeals } from "./data/mockData";

// Modular View Components
import AppHeader from "./components/AppHeader";
import BottomNavBar from "./components/BottomNavBar";
import HomeView from "./components/HomeView";
import ScheduleView from "./components/ScheduleView";
import NutritionView from "./components/NutritionView";
import ProfileView from "./components/ProfileView";

import { AnimatePresence } from "motion/react";

export default function App() {
  // 1. 한국 표준시로 오늘 날짜를 가져옵니다.
  const [todayKST] = useState(() => getTodayKST());
  
  // 2. 현재 날짜를 기반으로 이번 주의 씨마스고등학교 식단표 데이터(Mon~Fri)를 동적으로 생성합니다.
  const [meals] = useState(() => generateMockMeals(todayKST));
  
  // 3. 네비게이션과 선택 날짜를 관리합니다.
  // 오늘이 주말인 경우 캘린더나 식단 계산 기준일이 다음 월요일 혹은 직전 금요일(getDefaultSelectedDate)로 가도록 자동 조절됩니다.
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [selectedDate, setSelectedDate] = useState<Date>(() => getDefaultSelectedDate(todayKST));

  // 4. 수신 알림함 액션 핸들러
  const handleAnnouncement = () => {
    alert("📢 씨마스고등학교 공지사항:\n- 가구별 오븐 가동 점검 중입니다.\n- 우유 및 땅콩 알레르기 수시점검 대상 학생은 행정실로 동의서를 제출바랍니다.");
  };

  // 5. 뷰 전환 제어
  const renderActiveView = () => {
    switch (currentView) {
      case "home":
        return <HomeView meals={meals} />;
      case "schedule":
        return (
          <ScheduleView 
            meals={meals} 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
        );
      case "nutrition":
        return <NutritionView meals={meals} />;
      case "profile":
        return <ProfileView />;
      default:
        return <HomeView meals={meals} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-stretch font-sans">
      {/* 
        모바일 장치 형태로 보이는 아름답게 제한된 너비의 컨테이너입니다.
        PC 화면에서도 완벽한 비율로 랜더링되며 섀도우를 통해 존재감 있는 세련됨을 전달합니다. (max-w-[420px])
      */}
      <div className="w-full max-w-[420px] bg-background min-h-screen relative pb-28 shadow-2xl overflow-hidden flex flex-col justify-between">
        
        {/* 상단 공통 헤더 */}
        <AppHeader onNotificationClick={handleAnnouncement} />
        
        {/* 본문 콘텐츠 스크롤 영역 */}
        <main className="flex-1 px-edge-margin pt-4 pb-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            {renderActiveView()}
          </AnimatePresence>
        </main>
        
        {/* 하단 탭 네비게이션 바 */}
        <BottomNavBar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
      </div>
    </div>
  );
}
