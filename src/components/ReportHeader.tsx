import React from 'react';
import { Student } from '../types/student';
import { ScoreRing } from './ScoreRing';
import {
  UserIcon,
  BookOpenIcon,
  CalendarIcon,
  GraduationCapIcon,
  ShieldCheckIcon
} from 'lucide-react';

interface ReportHeaderProps {
  student: Student;
  isEditMode: boolean;
  onUpdate: (field: keyof Student, value: any) => void;
  overallCompletion: number;
}

export function ReportHeader({
  student,
  isEditMode,
  onUpdate,
  overallCompletion
}: ReportHeaderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#6348D2] text-white p-7 mb-4 print:mb-4 print:shadow-none border border-white/10">
      {/* Premium Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Decorative Gradient Glows */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>

      <div className="relative z-10 flex">
        {/* Column 1: Avatar */}
        {/* <div className="flex justify-center md:justify-start">
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border-2 border-white/30 backdrop-blur-md">
              <span className="text-4xl md:text-5xl font-black text-white leading-none">
                {student.name.
                  split(' ').
                  map((n) => n[0]).
                  join('').
                  substring(0, 2).
                  toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-2.5 border-2 border-purple-600">
              <GraduationCapIcon className="w-4.5 h-4.5 text-purple-600" />
            </div>
          </div>
        </div> */}

        {/* Column 2: Personal Info & Meta */}
        <div className="flex-1 min-w-0 flex flex-col items-left md:items-start text-left md:text-left">
          <div className="flex items-left gap-2 mb-3">
            <div className="flex items-left justify-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-[9px] font-bold tracking-widest uppercase backdrop-blur-md border border-white/10">
              <div className="flex items-center justify-center">
                <ShieldCheckIcon className="w-3 h-3 text-purple-200" />
              </div>
              Official Report
            </div>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <div className="text-[9px] font-bold tracking-widest uppercase text-white/60">
              Academic Year 2025-2026
            </div>
          </div>

          {isEditMode ?
            <input
              type="text"
              value={student.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              className="block w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2 text-3xl font-bold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 mb-1" /> :
            <h1 className="text-4xl md:text-5xl font-black mb-1 truncate tracking-tight text-white">
              {student.name}
            </h1>
          }

          {isEditMode ?
            <input
              type="text"
              value={student.className}
              onChange={(e) => onUpdate('className', e.target.value)}
              className="block w-full bg-white/10 border border-white/30 rounded-lg px-4 py-1 text-base text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 mb-6" /> :
            <p className="text-xl text-white/80 mb-6 font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
              {student.className}
            </p>
          }

          <div className="flex flex-col gap-2.5 w-full max-w-sm">
            <div className="flex items-center bg-black/20 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/5">
              <div className="flex items-center gap-3 w-32 shrink-0 border-r border-white/10 mr-4">
                <BookOpenIcon className="w-4 h-4 text-white/40" />
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Course</span>
              </div>
              {isEditMode ?
                <input
                  value={student.course}
                  onChange={(e) => onUpdate('course', e.target.value)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none w-full" /> :
                <span className="text-xs font-bold text-white tracking-widest">{student.course.toUpperCase()}</span>
              }
            </div>

            <div className="flex items-center bg-black/20 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/5">
              <div className="flex items-center gap-3 w-32 shrink-0 border-r border-white/10 mr-4">
                <UserIcon className="w-4 h-4 text-white/40" />
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Instructor</span>
              </div>
              {isEditMode ?
                <input
                  value={student.instructorName}
                  onChange={(e) => onUpdate('instructorName', e.target.value)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none w-full" /> :
                <span className="text-xs font-bold text-white uppercase tracking-tight">{student.instructorName}</span>
              }
            </div>

            <div className="flex items-center bg-black/20 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/5">
              <div className="flex items-center gap-3 w-32 shrink-0 border-r border-white/10 mr-4">
                <CalendarIcon className="w-4 h-4 text-white/40" />
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Generated</span>
              </div>
              {isEditMode ?
                <input
                  value={student.generatedDate}
                  onChange={(e) => onUpdate('generatedDate', e.target.value)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none w-full" /> :
                <span className="text-xs font-bold text-white">{student.generatedDate}</span>
              }
            </div>
          </div>
        </div>

        {/* Column 3: Score Ring */}
        <div className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
          <ScoreRing
            percentage={overallCompletion}
            size={140}
            strokeWidth={12}
            color="#ffffff"
            subLabel="Total Score" />
        </div>
      </div>
    </div>);
}