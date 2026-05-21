import { Meal } from "../types";
import { formatKoreanDate, getTodayKST } from "../utils/dateUtils";
import { motion } from "motion/react";

interface HomeViewProps {
  meals: Meal[];
}

export default function HomeView({ meals }: HomeViewProps) {
  const today = getTodayKST();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Find meals to display on Home screen
  let displayMeals: Meal[] = [];
  let isNextDayView = false;

  if (isWeekend) {
    // Option B: Show the upcoming Monday's meals
    isNextDayView = true;
    // Monday of next week is the upcoming Monday
    // Since mockMeals has dates from Monday to Friday of the reference week, 
    // we find the Monday meal in mock data.
    displayMeals = meals.filter((m) => m.dayOfWeek === "월");
  } else {
    // Current weekday: find matches for today
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const currentDayLabel = days[dayOfWeek];
    displayMeals = meals.filter((m) => m.dayOfWeek === currentDayLabel);
  }

  // If we can't find meals for some reason, fallback to first item
  if (displayMeals.length === 0 && meals.length > 0) {
    displayMeals = meals.slice(0, 2);
  }

  // Find recommended meal (or lunch) for hero section
  const recommendedMeal = displayMeals.find((m) => m.recommended) || displayMeals.find((m) => m.mealType === "중식") || displayMeals[0];

  // Midday card (중식) & Evening card (석식)
  const lunchMeal = displayMeals.find((m) => m.mealType === "중식");
  const dinnerMeal = displayMeals.find((m) => m.mealType === "석식");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-stack-gap-lg pb-10"
    >
      {/* Dynamic Date Area */}
      <div className="text-center py-2 select-none">
        <p className="font-display text-label-md text-on-surface-variant uppercase tracking-wider mb-1">
          TODAY'S MENU
        </p>
        <div className="flex items-center justify-center gap-2">
          <h2 className="font-display text-display-lg text-on-background font-bold tracking-tight">
            {formatKoreanDate(today)}
          </h2>
        </div>
        
        {/* Weekend Badge Information */}
        {isWeekend && (
          <div className="mt-2 flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-medium text-xs shadow-sm animate-pulse border border-primary/10">
              <span className="material-symbols-outlined text-[14px]">info</span>
              오늘은 주말이므로 다음 급식일 식단을 미리 보여드려요!
            </span>
          </div>
        )}
      </div>

      {/* Hero Card: Today's / Next Day's Highlight */}
      {recommendedMeal && (
        <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-[0_4px_25px_rgba(79,111,0,0.06)] border border-surface-variant/40 group active:scale-[0.99] transition-transform duration-300">
          <div className="relative h-48 w-full bg-surface-container overflow-hidden">
            <img 
              src={recommendedMeal.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuD9yB3Wc12mq26RKxD1JBjUu9Y9MEt4BAGSu5HZ9jM-UA0851w6QHtVJZGykX7D2RM8bPrIpyNx8oz0mtkWdWyAVhA0gE5_4SlCbg6o8SHoDddlnyF_SYaarbjDSZk5QwI8WLlSI5gWS6RudfRRgEVvQXsvhVEpZ-JPPrPyhUPEy9vvjG0zS2tnZw_xCOwlLPfM3UorJVLjwBy3-ozW3TMQXWJq6LYJg9LDlbougjKbE2Hg1NoMAM6HlmaFciFW02f922lz_PFhMq0"} 
              alt={recommendedMeal.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs shadow-md">
                <span className="material-symbols-outlined text-[14px] mr-1 fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                오늘의 추천 급식
              </span>
              
              {isNextDayView && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-on-primary font-bold text-xs shadow-md">
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    calendar_today
                  </span>
                  다음 급식일 ({recommendedMeal.dayOfWeek})
                </span>
              )}
            </div>
            
            <div className="absolute bottom-4 right-4 bg-black/50 text-white rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide shadow-sm backdrop-blur-sm">
              씨마스고등학교
            </div>
          </div>
          
          <div className="p-5 bg-surface-container-lowest">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-display text-headline-sm text-on-background font-bold leading-tight">
                  {recommendedMeal.title}
                </h3>
                <p className="font-sans text-body-md text-on-surface-variant mt-1.5 font-medium">
                  {recommendedMeal.mealType === "중식" 
                    ? "바삭하고 풍미 가득한 씨마스 특선 대표 점심 메뉴!" 
                    : "저녁 피로를 날려버릴 알찬 정성 가득 급식식단!"}
                </p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="font-display text-headline-md text-primary font-extrabold flex items-baseline leading-none">
                  {recommendedMeal.totalCalories}
                  <span className="font-sans text-xs text-on-surface-variant font-normal ml-0.5">kcal</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lunch Card */}
      {lunchMeal && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(79,111,0,0.05)] border border-surface-variant/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -z-10 pointer-events-none" />
          
          <div className="flex justify-between items-center mb-4 border-b border-surface-container-low pb-4 select-none">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                wb_sunny
              </span>
              <h3 className="font-display text-headline-sm font-bold text-on-background">중식</h3>
              
              {isNextDayView && (
                <span className="px-2 py-0.5 text-[10px] bg-secondary-container text-on-secondary-container rounded-md font-semibold font-sans">
                  월요일 식단
                </span>
              )}
            </div>
            
            <span className="font-display text-headline-sm text-primary font-extrabold flex items-baseline leading-none">
              {lunchMeal.totalCalories}
              <span className="font-sans text-xs text-on-surface-variant font-normal ml-0.5">kcal</span>
            </span>
          </div>

          <ul className="space-y-3 mb-6 select-text">
            {lunchMeal.dishes.map((dish, i) => {
              // Highlight highlight ingredients if needed
              const isMain = dish.category === "반찬" && dish.kcal > 100;
              return (
                <li key={i} className={`flex items-start text-base ${isMain ? "font-bold text-primary" : "text-on-background"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mt-2.5 mr-3 shrink-0 ${isMain ? "bg-primary" : "bg-secondary"}`} />
                  {dish.name}
                </li>
              );
            })}
          </ul>

          <div>
            <p className="font-sans text-label-md text-on-surface-variant mb-2 font-medium">알레르기 정보</p>
            <div className="flex flex-wrap gap-1.5">
              {lunchMeal.allergens.map((allergen, index) => (
                <span key={index} className="px-2.5 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[11px] rounded-full">
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dinner Card */}
      {dinnerMeal && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_20px_rgba(79,111,0,0.05)] border border-surface-variant/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/5 rounded-bl-[100px] -z-10 pointer-events-none" />

          <div className="flex justify-between items-center mb-4 border-b border-surface-container-low pb-4 select-none">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                dark_mode
              </span>
              <h3 className="font-display text-headline-sm font-bold text-on-background">석식</h3>
              
              {isNextDayView && (
                <span className="px-2 py-0.5 text-[10px] bg-tertiary-fixed text-on-tertiary-fixed rounded-md font-semibold font-sans">
                  월요일 식단
                </span>
              )}
            </div>
            
            <span className="font-display text-headline-sm text-tertiary font-extrabold flex items-baseline leading-none">
              {dinnerMeal.totalCalories}
              <span className="font-sans text-xs text-on-surface-variant font-normal ml-0.5">kcal</span>
            </span>
          </div>

          <ul className="space-y-3 mb-6 select-text">
            {dinnerMeal.dishes.map((dish, i) => {
              const isMain = dish.category === "밥류" || (dish.category === "반찬" && dish.kcal > 100);
              return (
                <li key={i} className={`flex items-start text-base ${isMain ? "font-bold text-tertiary" : "text-on-background"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mt-2.5 mr-3 shrink-0 ${isMain ? "bg-tertiary" : "bg-outline"}`} />
                  {dish.name}
                </li>
              );
            })}
          </ul>

          <div>
            <p className="font-sans text-label-md text-on-surface-variant mb-2 font-medium">알레르기 정보</p>
            <div className="flex flex-wrap gap-1.5">
              {dinnerMeal.allergens.map((allergen, index) => (
                <span key={index} className="px-2.5 py-0.5 bg-surface-container-high text-on-surface-variant font-bold text-[11px] rounded-full">
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
