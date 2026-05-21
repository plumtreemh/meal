import { useState, useEffect } from "react";
import { Meal, Dish } from "../types";
import { getTodayKST, getDefaultSelectedDate } from "../utils/dateUtils";
import { motion, AnimatePresence } from "motion/react";

interface NutritionViewProps {
  meals: Meal[];
}

export default function NutritionView({ meals }: NutritionViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedDishes, setSelectedDishes] = useState<Record<string, boolean>>({});
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);

  // Initialize dishes from today KST's lunch menu (or next Monday/default weekday if weekend)
  useEffect(() => {
    const today = getTodayKST();
    const defaultDate = getDefaultSelectedDate(today);
    const defaultDateKey = defaultDate.getFullYear() + 
      String(defaultDate.getMonth() + 1).padStart(2, "0") + 
      String(defaultDate.getDate()).padStart(2, "0");

    // "기본 선택 메뉴는 오늘 날짜의 중식 메뉴를 기준으로 구성해 주세요"
    const todayLunch = meals.find((m) => m.dateKey === defaultDateKey && m.mealType === "중식");
    
    if (todayLunch) {
      setCurrentMeal(todayLunch);
      
      // Default select all dishes in this lunch meal
      const initialSelection: Record<string, boolean> = {};
      todayLunch.dishes.forEach((dish) => {
        initialSelection[dish.name] = true; // All initially checked
      });
      setSelectedDishes(initialSelection);
    } else if (meals.length > 0) {
      // Fallback to first available lunch
      const fallbackLunch = meals.find((m) => m.mealType === "중식") || meals[0];
      setCurrentMeal(fallbackLunch);
      const initialSelection: Record<string, boolean> = {};
      fallbackLunch.dishes.forEach((dish) => {
        initialSelection[dish.name] = true;
      });
      setSelectedDishes(initialSelection);
    }
  }, [meals]);

  if (!currentMeal) {
    return (
      <div className="bg-surface-container-lowest rounded-2xl p-10 text-center text-on-surface-variant select-none border border-surface-variant">
        <span className="material-symbols-outlined text-4xl text-outline mb-2">database</span>
        <p className="font-sans text-body-md font-bold">식단 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  const dishes = currentMeal.dishes;

  // Toggle selection
  const handleToggleDish = (dishName: string) => {
    setSelectedDishes((prev) => ({
      ...prev,
      [dishName]: !prev[dishName]
    }));
  };

  // Calculate totals of CHECKED dishes
  let totalKcal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  dishes.forEach((dish) => {
    if (selectedDishes[dish.name]) {
      totalKcal += dish.kcal;
      totalProtein += dish.protein;
      totalCarbs += dish.carbs;
      totalFat += dish.fat;
    }
  });

  // Recommended Daily Values for High School Students (estimation context for standard indicators)
  const targetKcal = currentMeal.totalCalories; // Base target from meal
  const targetProtein = 50; // Reference daily target (grams per meal approx)
  const targetCarbs = 130;  // Reference daily target (grams per meal approx)
  const targetFat = 30;     // Reference daily target (grams per meal approx)

  const filterCategories = ["전체", "밥류", "국/찌개", "반찬", "디저트"];

  // Filtered list of dishes
  const filteredDishes = selectedCategory === "전체" 
    ? dishes 
    : dishes.filter((d) => d.category === selectedCategory);

  const handleSaveResult = () => {
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-stack-gap-lg pb-10"
    >
      {/* Title Area */}
      <div className="select-none">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-primary-container shadow-sm">
            <span className="material-symbols-outlined text-[19px] fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              calculate
            </span>
          </div>
          <h2 className="font-display text-headline-md font-bold text-on-background">
            오늘의 영양 계산
          </h2>
        </div>
        <p className="font-sans text-body-md text-on-surface-variant font-medium">
          먹고 싶거나 식단에서 제외할 메뉴를 직접 선택해 총 섭취 성분을 알아봅시다.
        </p>
      </div>

      {/* Success Notification Alert */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="bg-primary text-on-primary rounded-xl p-4 flex items-center justify-between shadow-md text-sm font-semibold select-none border border-primary-container"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>식단 영양 계산 결과가 성공적으로 마이노트에 저장되었습니다!</span>
            </div>
            <button onClick={() => setShowSaveSuccess(false)}>
              <span className="material-symbols-outlined text-lg hover:opacity-80">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cumulative Bento Summary Component */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_22px_rgba(79,111,0,0.05)] border border-surface-variant/40 relative overflow-hidden select-none">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col items-center mb-6 relative z-10">
          <span className="font-sans text-label-md text-on-secondary-container bg-secondary-container px-3.5 py-1 rounded-full mb-1 border border-primary/5 font-bold">
            총 섭취 칼로리
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-display text-display-lg text-primary font-extrabold leading-none tracking-tight">
              {totalKcal}
            </span>
            <span className="font-sans text-body-lg text-on-surface-variant font-bold">
              / {targetKcal} kcal
            </span>
          </div>
        </div>

        {/* Nutrition Bar Indicators */}
        <div className="space-y-4 relative z-10 font-sans">
          {/* Protein */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-on-surface">단백질</span>
              <span className="text-primary font-bold">{totalProtein}g</span>
            </div>
            <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totalProtein / targetProtein) * 100)}%` }}
              />
            </div>
          </div>

          {/* Carbohydrates */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-on-surface">탄수화물</span>
              <span className="text-secondary font-bold">{totalCarbs}g</span>
            </div>
            <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totalCarbs / targetCarbs) * 100)}%` }}
              />
            </div>
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-on-surface">지방</span>
              <span className="text-tertiary font-bold">{totalFat}g</span>
            </div>
            <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-tertiary rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totalFat / targetFat) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Choices Section */}
      <div>
        <div className="flex justify-between items-center mb-4 select-none">
          <h3 className="font-display text-headline-sm font-bold text-on-background">
            메뉴 구성 선택
          </h3>
          <span className="text-xs text-on-surface-variant font-medium">
            오늘 급식 메뉴: <span className="text-primary font-bold">{currentMeal.title}</span>
          </span>
        </div>

        {/* Filter Chips list */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-4 select-none">
          {filterCategories.map((cat) => {
            const isChipOn = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-transform active:scale-95 border cursor-pointer ${
                  isChipOn 
                    ? "bg-primary text-on-primary border-primary shadow-sm"
                    : "bg-surface-container-low text-on-surface-variant border-outline-variant/60 hover:bg-surface-variant/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Dish Cards Items */}
        <div className="space-y-3">
          {filteredDishes.map((dish) => {
            const isChecked = !!selectedDishes[dish.name];
            
            // Icon mapping for aesthetics
            let iconLabel = "restaurant";
            if (dish.category === "밥류") iconLabel = "rice_bowl";
            else if (dish.category === "국/찌개") iconLabel = "soup_kitchen";
            else if (dish.category === "반찬") iconLabel = "dining";
            else if (dish.category === "디저트") iconLabel = "cookie";

            return (
              <label
                key={dish.name}
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleDish(dish.name);
                }}
                className={`flex items-center p-4 bg-surface-container-lowest rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                  isChecked 
                    ? "border-2 border-primary shadow-[0_2px_12px_rgba(79,111,0,0.06)]" 
                    : "border border-surface-container-high/60 shadow-sm opacity-70 hover:opacity-100"
                }`}
              >
                {/* Image / Icon container */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0 overflow-hidden relative">
                  <div className={`absolute inset-0 ${isChecked ? "bg-primary/10" : "bg-neutral-200/25"}`} />
                  <span className={`material-symbols-outlined text-[24px] ${isChecked ? "text-primary" : "text-on-surface-variant"}`}>
                    {iconLabel}
                  </span>
                </div>

                {/* Main description info */}
                <div className="flex-grow">
                  <h4 className={`text-[15px] leading-tight ${isChecked ? "font-bold text-on-background" : "font-semibold text-on-surface-variant"}`}>
                    {dish.name}
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-1.5 font-medium">
                    {dish.kcal} kcal · 탄 {dish.carbs}g · 단 {dish.protein}g · 지 {dish.fat}g
                  </p>
                </div>

                {/* Custom modern checkbox block */}
                <div className="shrink-0 ml-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors border ${
                    isChecked 
                      ? "bg-primary border-primary text-on-primary" 
                      : "bg-surface-container-lowest border-outline-variant"
                  }`}>
                    {isChecked && (
                      <span className="material-symbols-outlined text-sm font-black" style={{ fontSize: "16px" }}>
                        check
                      </span>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Button Section */}
      <div className="mt-8 pb-4 select-none">
        <button 
          onClick={handleSaveResult}
          className="w-full bg-primary text-on-primary font-bold py-4 px-6 rounded-full shadow-[0_8px_20px_rgba(60,85,0,0.15)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer border border-primary-container"
        >
          <span className="material-symbols-outlined text-[20px] fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            save
          </span>
          계산 결과 저장하기
        </button>
      </div>
    </motion.div>
  );
}
