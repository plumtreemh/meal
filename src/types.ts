export interface Dish {
  name: string;
  category: "밥류" | "국/찌개" | "반찬" | "디저트";
  kcal: number;
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
}

export interface Meal {
  id: string;
  schoolName: string; // 반드시 "씨마스고등학교"
  date: Date;
  dateKey: string;    // "YYYYMMDD" 형식
  dayOfWeek: "월" | "화" | "수" | "목" | "금";
  mealType: "중식" | "석식";
  title: string;      // 대표 메뉴명 (예: "치즈돈까스 정식")
  dishes: Dish[];     // 각 개별 음식 항목
  totalCalories: number;
  nutrition: {
    protein: number;   // 총 단백질
    carbs: number;     // 총 탄수화물
    fat: number;       // 총 지방
  };
  allergens: string[];
  recommended?: boolean; // 오늘의 추천 여부
  imageUrl?: string;     // 히어로 카드용 이미지 URL
  imageAlt?: string;     // 이미지 설명
}

export type ViewType = "home" | "schedule" | "nutrition" | "profile";
