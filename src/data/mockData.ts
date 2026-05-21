import { Meal, Dish } from "../types";
import { getWeekDates, formatDateKey } from "../utils/dateUtils";

/**
 * 앱 구동 시 현재 주(Monday ~ Friday) 날짜를 동적으로 계산하고,
 * 씨마스고등학교의 맛있는 식단 백엔드를 구성하여 모의 데이터를 주입합니다.
 */
export function generateMockMeals(referenceDate: Date): Meal[] {
  const weekDates = getWeekDates(referenceDate); // 이번 주의 월요일~금요일 (5개 Date 객체)
  const schoolName = "씨마스고등학교";
  
  const dayLabels: ("월" | "화" | "수" | "목" | "금")[] = ["월", "화", "수", "목", "금"];
  
  // 5일치 중식 및 석식 (총 10개 식사) 빌드
  const meals: Meal[] = [];
  
  weekDates.forEach((date, index) => {
    const dayOfWeek = dayLabels[index];
    const dateKey = formatDateKey(date);
    
    // Day-specific menus
    if (dayOfWeek === "월") {
      // 월요일 중식 (치즈돈까스 정식 - 추천 급식 및 히어로)
      meals.push({
        id: `M_LUNCH_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "중식",
        title: "치즈돈까스 정식",
        recommended: true,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9yB3Wc12mq26RKxD1JBjUu9Y9MEt4BAGSu5HZ9jM-UA0851w6QHtVJZGykX7D2RM8bPrIpyNx8oz0mtkWdWyAVhA0gE5_4SlCbg6o8SHoDddlnyF_SYaarbjDSZk5QwI8WLlSI5gWS6RudfRRgEVvQXsvhVEpZ-JPPrPyhUPEy9vvjG0zS2tnZw_xCOwlLPfM3UorJVLjwBy3-ozW3TMQXWJq6LYJg9LDlbougjKbE2Hg1NoMAM6HlmaFciFW02f922lz_PFhMq0",
        imageAlt: "A crisp golden-brown pork slice cutlet bursting with premium Mozzarella cheese",
        dishes: [
          { name: "친환경현미밥", category: "밥류", kcal: 320, protein: 6, carbs: 70, fat: 1 },
          { name: "쇠고기미역국", category: "국/찌개", kcal: 120, protein: 8, carbs: 10, fat: 5 },
          { name: "치즈돈까스 정식", category: "반찬", kcal: 280, protein: 14, carbs: 20, fat: 15 },
          { name: "매콤돈육강정", category: "반찬", kcal: 90, protein: 3, carbs: 8, fat: 3 },
          { name: "숙주미나리무침", category: "반찬", kcal: 25, protein: 1, carbs: 2, fat: 1 },
          { name: "배추김치", category: "반찬", kcal: 10, protein: 0, carbs: 0, fat: 0 }
        ],
        totalCalories: 845,
        nutrition: { protein: 32, carbs: 110, fat: 25 },
        allergens: ["대두", "밀", "쇠고기", "돼지고기"]
      });
      
      // 월요일 석식 (참치마요덮밥)
      meals.push({
        id: `M_DINNER_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "석식",
        title: "참치마요덮밥",
        dishes: [
          { name: "참치마요덮밥", category: "밥류", kcal: 450, protein: 15, carbs: 65, fat: 15 },
          { name: "유부장국", category: "국/찌개", kcal: 60, protein: 2, carbs: 5, fat: 3 },
          { name: "매콤떡볶이", category: "반찬", kcal: 150, protein: 3, carbs: 30, fat: 2 },
          { name: "깍두기", category: "반찬", kcal: 10, protein: 0, carbs: 1, fat: 0 },
          { name: "요구르트", category: "디저트", kcal: 50, protein: 2, carbs: 4, fat: 4 }
        ],
        totalCalories: 720,
        nutrition: { protein: 22, carbs: 105, fat: 24 },
        allergens: ["난류", "우유", "대두", "밀"]
      });
    } else if (dayOfWeek === "화") {
      // 화요일 중식 (함박스테이크 정식)
      meals.push({
        id: `T_LUNCH_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "중식",
        title: "함박스테이크 정식",
        recommended: false,
        dishes: [
          { name: "혼합잡곡밥", category: "밥류", kcal: 310, protein: 6, carbs: 68, fat: 1 },
          { name: "크림스프", category: "국/찌개", kcal: 110, protein: 3, carbs: 12, fat: 6 },
          { name: "함박스테이크/데미소스", category: "반찬", kcal: 300, protein: 15, carbs: 22, fat: 18 },
          { name: "양상추샐러드/키위드레싱", category: "반찬", kcal: 120, protein: 4, carbs: 13, fat: 5 },
          { name: "배추김치", category: "반찬", kcal: 10, protein: 0, carbs: 0, fat: 0 }
        ],
        totalCalories: 850,
        nutrition: { protein: 28, carbs: 115, fat: 30 },
        allergens: ["난류", "우유", "대두", "밀", "돼지고기"]
      });
      
      // 화요일 석식 (마라탕 정식)
      meals.push({
        id: `T_DINNER_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "석식",
        title: "얼큰마라탕과 꿔바로우",
        dishes: [
          { name: "친환경쌀밥", category: "밥류", kcal: 320, protein: 5, carbs: 72, fat: 1 },
          { name: "얼큰마라탕", category: "국/찌개", kcal: 260, protein: 11, carbs: 15, fat: 16 },
          { name: "꿔바로우", category: "반찬", kcal: 180, protein: 8, carbs: 20, fat: 9 },
          { name: "단무지무침", category: "반찬", kcal: 15, protein: 0, carbs: 3, fat: 0 },
          { name: "배추김치", category: "반찬", kcal: 10, protein: 0, carbs: 0, fat: 0 }
        ],
        totalCalories: 785,
        nutrition: { protein: 24, carbs: 110, fat: 26 },
        allergens: ["대두", "밀", "땅콩", "돼지고기"]
      });
    } else if (dayOfWeek === "수") {
      // 수요일 중식 (수다날: 수요일은 다 먹는 날 - 안동찜닭)
      meals.push({
        id: `W_LUNCH_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "중식",
        title: "안동찜닭&모듬튀김",
        recommended: true,
        dishes: [
          { name: "흑미밥", category: "밥류", kcal: 310, protein: 6, carbs: 67, fat: 1 },
          { name: "팽이버섯계란국", category: "국/찌개", kcal: 80, protein: 4, carbs: 5, fat: 5 },
          { name: "안동찜닭", category: "반찬", kcal: 250, protein: 14, carbs: 15, fat: 12 },
          { name: "김말이&만두튀김", category: "반찬", kcal: 140, protein: 3, carbs: 18, fat: 6 },
          { name: "시금치나물무침", category: "반찬", kcal: 25, protein: 1, carbs: 2, fat: 1 },
          { name: "배추김치", category: "반찬", kcal: 10, protein: 0, carbs: 0, fat: 0 }
        ],
        totalCalories: 815,
        nutrition: { protein: 28, carbs: 107, fat: 25 },
        allergens: ["난류", "대두", "밀", "닭고기"]
      });
      
      // 수요일 석식 (수프 & 돈까스동)
      meals.push({
        id: `W_DINNER_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "석식",
        title: "수제 가츠동정식",
        dishes: [
          { name: "수제가츠동", category: "밥류", kcal: 520, protein: 18, carbs: 75, fat: 16 },
          { name: "미소된장국", category: "국/찌개", kcal: 45, protein: 2, carbs: 4, fat: 2 },
          { name: "락교와 단무지", category: "반찬", kcal: 15, protein: 0, carbs: 3, fat: 0 },
          { name: "샐러드/들깨소오스", category: "반찬", kcal: 90, protein: 2, carbs: 5, fat: 7 },
          { name: "요구르트", category: "디저트", kcal: 50, protein: 1, carbs: 12, fat: 0 }
        ],
        totalCalories: 720,
        nutrition: { protein: 23, carbs: 99, fat: 25 },
        allergens: ["난류", "우유", "대두", "밀", "돼지고기"]
      });
    } else if (dayOfWeek === "목") {
      // 목요일 중식 (갈비탕 정식)
      meals.push({
        id: `R_LUNCH_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "중식",
        title: "소갈비찜과 소고기무국",
        dishes: [
          { name: "친환경밥", category: "밥류", kcal: 320, protein: 5, carbs: 73, fat: 1 },
          { name: "맑은소고기무국", category: "국/찌개", kcal: 110, protein: 9, carbs: 4, fat: 6 },
          { name: "한방소갈비찜", category: "반찬", kcal: 290, protein: 18, carbs: 16, fat: 16 },
          { name: "오징어초무침", category: "반찬", kcal: 95, protein: 7, carbs: 5, fat: 3 },
          { name: "시금치나물", category: "반찬", kcal: 30, protein: 1, carbs: 2, fat: 1 },
          { name: "석박지", category: "반찬", kcal: 15, protein: 0, carbs: 3, fat: 0 }
        ],
        totalCalories: 860,
        nutrition: { protein: 40, carbs: 103, fat: 27 },
        allergens: ["대두", "밀", "쇠고기", "오징어"]
      });
      
      // 목요일 석식 (짜장면&해물짬뽕국)
      meals.push({
        id: `R_DINNER_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "석식",
        title: "수제 짜장밥&탕수육",
        dishes: [
          { name: "짜장소스와 밥", category: "밥류", kcal: 450, protein: 10, carbs: 80, fat: 10 },
          { name: "얼큰꼬치어묵국", category: "국/찌개", kcal: 90, protein: 5, carbs: 8, fat: 4 },
          { name: "바삭찹쌀탕수육", category: "반찬", kcal: 180, protein: 8, carbs: 16, fat: 9 },
          { name: "부추양파무침", category: "반찬", kcal: 20, protein: 1, carbs: 4, fat: 0 },
          { name: "단무지", category: "반찬", kcal: 10, protein: 0, carbs: 2, fat: 0 }
        ],
        totalCalories: 750,
        nutrition: { protein: 24, carbs: 110, fat: 23 },
        allergens: ["대두", "밀", "돼지고기"]
      });
    } else if (dayOfWeek === "금") {
      // 금요일 중식 (하이라이스 정식 & 수제 생선까스)
      meals.push({
        id: `F_LUNCH_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "중식",
        title: "생선까스&제육볶음 정식",
        dishes: [
          { name: "발아현미밥", category: "밥류", kcal: 320, protein: 6, carbs: 70, fat: 1 },
          { name: "아욱수제비된장국", category: "국/찌개", kcal: 95, protein: 4, carbs: 12, fat: 3 },
          { name: "생선까스/타르타르", category: "반찬", kcal: 220, protein: 12, carbs: 15, fat: 13 },
          { name: "고추장제육볶음", category: "반찬", kcal: 150, protein: 8, carbs: 8, fat: 10 },
          { name: "숙주나물무침", category: "반찬", kcal: 20, protein: 1, carbs: 2, fat: 1 },
          { name: "배추김치", category: "반찬", kcal: 10, protein: 0, carbs: 0, fat: 0 }
        ],
        totalCalories: 815,
        nutrition: { protein: 31, carbs: 107, fat: 31 },
        allergens: ["난류", "우유", "대두", "밀", "돼지고기"]
      });
      
      // 금요일 석식 (스팸김치볶음밥)
      meals.push({
        id: `F_DINNER_${dateKey}`,
        schoolName,
        date,
        dateKey,
        dayOfWeek,
        mealType: "석식",
        title: "스팸김치볶음밥&토스트",
        dishes: [
          { name: "스팸김치볶음밥", category: "밥류", kcal: 480, protein: 12, carbs: 75, fat: 14 },
          { name: "유부우동장국", category: "국/찌개", kcal: 70, protein: 2, carbs: 10, fat: 2 },
          { name: "길거리토스트", category: "디저트", kcal: 160, protein: 4, carbs: 25, fat: 5 },
          { name: "단무지", category: "반찬", kcal: 10, protein: 0, carbs: 2, fat: 0 },
          { name: "배추김치", category: "반찬", kcal: 10, protein: 0, carbs: 0, fat: 0 }
        ],
        totalCalories: 730,
        nutrition: { protein: 18, carbs: 112, fat: 21 },
        allergens: ["난류", "우유", "대두", "밀", "돼지고기"]
      });
    }
  });

  return meals;
}
