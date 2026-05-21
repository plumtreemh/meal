import { Meal } from "../types";
import { getWeekDates, getWeekOfMonth, getKoreanDayOfWeek, formatDateKey } from "../utils/dateUtils";
import { motion, AnimatePresence } from "motion/react";

interface ScheduleViewProps {
  meals: Meal[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function ScheduleView({ meals, selectedDate, onDateChange }: ScheduleViewProps) {
  // 이번 주 월~금 날짜 계산
  const weekDates = getWeekDates(selectedDate);
  const weekOfMonthInfo = getWeekOfMonth(selectedDate);
  
  // 현재 선택된 날짜의 "YYYYMMDD"
  const selectedDateKey = formatDateKey(selectedDate);
  
  // 선택된 날짜에 대응하는 맛있는 식단들
  const selectedMeals = meals.filter((meal) => meal.dateKey === selectedDateKey);
  const lunchMeal = selectedMeals.find((m) => m.mealType === "중식");
  const dinnerMeal = selectedMeals.find((m) => m.mealType === "석식");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-stack-gap-lg pb-10 select-none"
    >
      {/* Week Selector Area */}
      <section className="flex flex-col gap-stack-gap-sm">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-display text-headline-sm font-bold text-on-surface">
            {weekOfMonthInfo.month}월 {weekOfMonthInfo.week}주차
          </h2>
          <button 
            aria-label="달력 아이콘 안내"
            className="text-primary hover:bg-surface-variant/40 rounded-full p-2 transition-colors flex items-center justify-center cursor-default"
          >
            <span className="material-symbols-outlined select-none text-[22px]">calendar_today</span>
          </button>
        </div>
        
        {/* Date Scroller (Monday to Friday) */}
        <div className="flex justify-between items-center bg-surface-container-low rounded-xl p-1.5 gap-2 border border-surface-container/60 shadow-inner">
          {weekDates.map((dateItem) => {
            const isChosen = formatDateKey(dateItem) === selectedDateKey;
            const dayLabel = getKoreanDayOfWeek(dateItem, true); // "월", "화" 등
            const dateNum = dateItem.getDate();
            
            return (
              <button
                key={dateItem.toString()}
                onClick={() => onDateChange(dateItem)}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-200 outline-none select-none cursor-pointer ${
                  isChosen 
                    ? "bg-primary text-on-primary font-bold shadow-md scale-95" 
                    : "text-on-surface-variant hover:bg-surface-variant/40 hover:text-primary"
                }`}
              >
                <span className="text-[11px] font-bold tracking-wider mb-1 uppercase">{dayLabel}</span>
                <span className="text-base font-extrabold leading-tight">{dateNum}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Meals Bento Grid */}
      <section className="flex flex-col gap-stack-gap-md">
        <AnimatePresence mode="wait">
          {selectedMeals.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-2xl p-10 text-center text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-4xl text-outline mb-3">
                no_meals
              </span>
              <p className="font-sans text-body-md font-semibold">선택한 날짜에는 등록된 식단표가 없습니다.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={selectedDateKey}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-stack-gap-md"
            >
              {/* Lunch Card */}
              {lunchMeal && (
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_22px_rgba(79,111,0,0.05)] flex flex-col gap-4 border border-surface-variant/40 relative">
                  <div className="flex justify-between items-center select-none">
                    <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed font-extrabold text-xs px-3 py-1 rounded-full">
                      중식
                    </span>
                    <span className="font-display text-body-lg text-primary font-bold">
                      {lunchMeal.totalCalories} <span className="text-[11px] text-on-surface-variant font-normal">kcal</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-headline-sm text-on-surface font-extrabold">
                      {lunchMeal.title}
                    </h3>
                    <p className="font-sans text-body-md text-on-surface-variant leading-relaxed select-text mt-1">
                      {lunchMeal.dishes.map((d) => d.name).join(", ")}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap mt-1 select-none">
                    <span className="bg-surface-variant text-on-surface-variant px-2.5 py-0.5 rounded-md text-[10px] font-bold">
                      알레르기: {lunchMeal.allergens.join(", ")}
                    </span>
                  </div>

                  {/* Nutrition Bar */}
                  <div className="mt-2 flex flex-col gap-1.5 select-none pt-4 border-t border-surface-container-low">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-on-surface-variant">단백질 권장 달성률</span>
                      <span className="text-primary font-extrabold">
                        {Math.min(100, Math.round((lunchMeal.nutrition.protein / 30) * 100))}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-primary h-all rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, Math.round((lunchMeal.nutrition.protein / 30) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Dinner Card */}
              {dinnerMeal && (
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_22px_rgba(79,111,0,0.05)] flex flex-col gap-4 border border-surface-variant/40 relative">
                  <div className="flex justify-between items-center select-none">
                    <span className="inline-block bg-surface-container border border-surface-variant text-on-surface-variant font-extrabold text-xs px-3 py-1 rounded-full">
                      석식
                    </span>
                    <span className="font-display text-body-lg text-tertiary font-bold">
                      {dinnerMeal.totalCalories} <span className="text-[11px] text-on-surface-variant font-normal">kcal</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-headline-sm text-on-surface font-extrabold">
                      {dinnerMeal.title}
                    </h3>
                    <p className="font-sans text-body-md text-on-surface-variant leading-relaxed select-text mt-1">
                      {dinnerMeal.dishes.map((d) => d.name).join(", ")}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap mt-1 select-none">
                    <span className="bg-surface-variant text-on-surface-variant px-2.5 py-0.5 rounded-md text-[10px] font-bold">
                      알레르기: {dinnerMeal.allergens.join(", ")}
                    </span>
                  </div>

                  {/* Nutrition Bar */}
                  <div className="mt-2 flex flex-col gap-1.5 select-none pt-4 border-t border-surface-container-low">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-on-surface-variant">단백질 권장 달성률</span>
                      <span className="text-tertiary font-extrabold">
                        {Math.min(100, Math.round((dinnerMeal.nutrition.protein / 30) * 100))}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-tertiary h-all rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, Math.round((dinnerMeal.nutrition.protein / 30) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
