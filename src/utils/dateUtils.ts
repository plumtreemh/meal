/**
 * 날짜 처리 유틸리티 (Asia/Seoul 기준 KST)
 */

/**
 * 한국 시간 기준 오늘 날짜를 반환합니다.
 * Container 환경의 타임존에 구애받지 않고 항상 Asia/Seoul 기준의 올바른 양력 날짜 Date 객체를 가져옵니다.
 */
export function getTodayKST(): Date {
  // 현재 컴퓨터 시간과 무관하게 한국 시간 기준으로 시계를 맞춰 Date 인스턴스를 얻습니다.
  const now = new Date();
  const kstFormatted = now.toLocaleString("en-US", { timeZone: "Asia/Seoul" });
  return new Date(kstFormatted);
}

/**
 * "M월 D일 요일" 형식으로 변환합니다. (예: “5월 15일 금요일”)
 */
export function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = getKoreanDayOfWeek(date);
  return `${month}월 ${day}일 ${dayName}`;
}

/**
 * Date 객체를 "YYYYMMDD" 형식의 텍스트로 형식화합니다. (NEIS API 연동용)
 */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * 특정 날짜의 한국어 요일을 반환합니다. (예: "금요일")
 */
export function getKoreanDayOfWeek(date: Date, short: boolean = false): string {
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const shortDays = ["일", "월", "화", "수", "목", "금", "토"];
  return short ? shortDays[date.getDay()] : days[date.getDay()];
}

/**
 * 해당 날짜가 포함된 주의 월요일부터 금요일까지 5일의 Date 배열을 반환합니다.
 */
export function getWeekDates(date: Date): Date[] {
  const current = new Date(date);
  const dayOfWeek = current.getDay(); // 0(일) ~ 6(토)
  
  // 한국 주초 기준(월요일 시작): 만약 일요일(0)이면 직전 월요일(-6)로 이동, 그 외에는 1 - dayOfWeek 만큼 대수 이동
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(current);
  monday.setDate(current.getDate() + diffToMonday);
  
  const weekDates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d);
  }
  return weekDates;
}

/**
 * 해당 날짜의 달력상 "M월 N주차"를 계산합니다.
 * 월요일 시작 달력을 기준으로, 해당 주차가 시각적으로 몇 번째 줄에 표시되는지 계산합니다.
 */
export function getWeekOfMonth(date: Date): { month: number; week: number } {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  
  // 이번 달 1일이 주중 무슨 요일인지 구함 (0은 일요일, 1은 월요일...)
  const firstOfMonth = new Date(year, d.getMonth(), 1);
  const firstDay = firstOfMonth.getDay();
  
  // 월요일 시작 기준으로 보정: 월=0, 화=1 ... 일=6
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const dayOfMonth = d.getDate();
  
  // 1주차 첫째 날 이전의 빈 칸(startOffset개)을 더한 후 7로 나누어 올림 처리
  const week = Math.ceil((dayOfMonth + startOffset) / 7);
  
  return { month, week };
}

/**
 * 오늘이 토요일이나 일요일인 경우 급식을 보여줄 디폴트 선택일을 계산합니다.
 * 평일 선택 기본 조건:
 * - 오늘이 평일이면(월~금) -> 오늘 날짜 반환
 * - 오늘이 토요일/일요일이면 -> 다음 월요일 날짜를 기본 반환하여 월요일 예약된 메뉴가 먼저 보이도록 함
 */
export function getDefaultSelectedDate(today: Date): Date {
  const day = today.getDay();
  if (day === 0) { // 일요일
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 1);
    return nextMonday;
  } else if (day === 6) { // 토요일
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 2);
    return nextMonday;
  }
  return today;
}
