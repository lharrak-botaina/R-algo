import { Student, ReportStats, Module } from '../types/student';

export function calculateStats(student: Student): ReportStats {
  let totalLessons = 0;
  let completedLessons = 0;
  let absentLessons = 0;

  student.modules.forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      totalLessons++;
      if (lesson.status === 'completed') {
        completedLessons++;
      } else if (lesson.status === 'absent') {
        absentLessons++;
      }
    });
  });

  const overallCompletion =
  totalLessons > 0 ? Math.round(completedLessons / totalLessons * 100) : 0;

  // Attendance: (Total - Absent) / Total
  const attendanceRate =
  totalLessons > 0 ?
  Math.round((totalLessons - absentLessons) / totalLessons * 100) :
  100;

  const participationPct = Math.round(student.participation / 5 * 100);
  const teamworkPct = Math.round(student.teamwork / 5 * 100);
  const creativityPct = Math.round(student.creativity / 5 * 100);

  return {
    overallCompletion,
    attendanceRate,
    participationPct,
    teamworkPct,
    creativityPct,
    lessonsDone: completedLessons,
    totalLessons
  };
}

export function calculateModuleProgress(module: Module): number {
  if (module.lessons.length === 0) return 0;
  const completed = module.lessons.filter(
    (l) => l.status === 'completed'
  ).length;
  return Math.round(completed / module.lessons.length * 100);
}

export function getGradeColor(percentage: number): string {
  if (percentage >= 80) return '#22C55E'; // Green
  if (percentage >= 60) return '#F5A623'; // Orange
  return '#EF4444'; // Red
}