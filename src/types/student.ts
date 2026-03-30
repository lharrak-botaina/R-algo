export type LessonStatus = 'completed' | 'absent' | 'unknown';

export interface Lesson {
  id: string;
  name: string;
  status: LessonStatus;
}

export interface Module {
  id: string;
  name: string;
  lessons: Lesson[];
  expanded: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  maxLevel: number; // default 5
}

export interface Student {
  id: string;
  name: string;
  className: string;
  instructorName: string;
  academicYear: string;
  course: string;
  participation: number; // 1-5
  teamwork: number;
  creativity: number;
  modules: Module[];
  skills: Skill[];
  instructorImage?: string;
  feedback: string;
  generatedDate: string;
}

export interface ReportStats {
  overallCompletion: number;
  attendanceRate: number;
  participationPct: number;
  teamworkPct: number;
  creativityPct: number;
  lessonsDone: number;
  totalLessons: number;
}