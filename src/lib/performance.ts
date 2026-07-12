export function getPerformanceLabel(percent: number) {
  if (percent >= 90) return { label: "Excelente!", color: "text-brand-green" };
  if (percent >= 70) return { label: "Muito Bom!", color: "text-brand-cyan" };
  if (percent >= 50) return { label: "Bom!", color: "text-amber-400" };
  return { label: "Continue Praticando", color: "text-brand-red" };
}
