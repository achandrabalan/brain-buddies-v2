export const BUCKET_URL =
  "https://hjeelebymhttxomgqoto.supabase.co/storage/v1/object/public/";

export const validFileTypes = ["image/png", "image/jpg", "image/webp"];

export const wordleScores = new Map<string, number>([
  ["X/6", 0],
  ["6/6", 1],
  ["5/6", 2],
  ["4/6", 3],
  ["3/6", 4],
  ["2/6", 5],
  ["1/6", 6],
]);

export const scoreToGrade = (score: number, precision: number = 0) => {
  const roundedScore = precision ? Math.round(score) : score;
  if (roundedScore === 0) return { color: "text-[#F44336]", grade: "F" };
  if (roundedScore === 1) return { color: "text-[#9C27B0]", grade: "D" };
  if (roundedScore === 2) return { color: "text-[#FF9800]", grade: "C" };
  if (roundedScore === 3) return { color: "text-[#2196F3]", grade: "B" };
  if (roundedScore === 4) return { color: "text-[#4CAF50]", grade: "A" };
  if (roundedScore === 5) return { color: "text-[#7D001C]", grade: "S" };
  if (roundedScore === 6) return { color: "text-[#7D001C]", grade: "S" };
};
