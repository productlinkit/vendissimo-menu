/** 187 -> "3:07" */
export function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, `0`)}`;
}
