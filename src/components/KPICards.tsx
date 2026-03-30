import React from 'react';
import { ReportStats } from '../types/student';
import {
  ClockIcon,
  CalendarIcon,
  BarChart3Icon,
  UsersIcon,
  LightbulbIcon,
  BookOpenIcon
} from
  'lucide-react';

interface KPICardsProps {
  stats: ReportStats;
}

export function KPICards({ stats }: KPICardsProps) {
  const cards = [
    {
      label: 'Overall Completion',
      value: `${stats.overallCompletion}%`,
      icon: ClockIcon,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      barColor: 'bg-orange-500',
      percent: stats.overallCompletion
    },
    {
      label: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      icon: CalendarIcon,
      color: 'text-green-600',
      bg: 'bg-green-50',
      barColor: 'bg-green-600',
      percent: stats.attendanceRate
    },
    {
      label: 'Participation',
      value: `${stats.participationPct}%`,
      icon: BarChart3Icon,
      color: 'text-green-600',
      bg: 'bg-green-50',
      barColor: 'bg-green-600',
      percent: stats.participationPct
    },
    {
      label: 'Teamwork',
      value: `${stats.teamworkPct}%`,
      icon: UsersIcon,
      color: 'text-green-600',
      bg: 'bg-green-50',
      barColor: 'bg-green-600',
      percent: stats.teamworkPct
    },
    {
      label: 'Creativity',
      value: `${stats.creativityPct}%`,
      icon: LightbulbIcon,
      color: 'text-green-600',
      bg: 'bg-green-50',
      barColor: 'bg-green-600',
      percent: stats.creativityPct
    }];

  return (
    <div className="print-no-break">
      <h3 className="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-2">
        Performance Overview
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {cards.map((card, idx) =>
          <div
            key={idx}
            className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col justify-between h-28">

            <div
              className={`w-6 h-6 rounded-lg ${card.bg} flex items-center justify-center mb-1`}>
              <card.icon className={`w-3 h-3 ${card.color}`} />
            </div>
            <div>
              <div className={`text-xl font-bold ${card.color}`}>
                {card.value}
              </div>
              <div className="text-[9px] text-gray-500 font-medium uppercase tracking-wide mb-1">
                {card.label}
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${card.barColor}`}
                  style={{
                    width: `${card.percent}%`
                  }}>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lessons Done Card Special Case */}
        <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col justify-between h-28">
          <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center mb-1">
            <BookOpenIcon className="w-3 h-3 text-purple-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-orange-500">
              {stats.lessonsDone}
              <span className="text-gray-300 text-sm">
                /{stats.totalLessons}
              </span>
            </div>
            <div className="text-[9px] text-gray-500 font-medium uppercase tracking-wide mb-1">
              Lessons Done
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-orange-500"
                style={{
                  width: `${stats.lessonsDone / stats.totalLessons * 100}%`
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >);
}