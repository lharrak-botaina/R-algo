import React from 'react';
import { Skill } from '../types/student';

interface SkillsAssessmentProps {
  skills: Skill[];
  isEditMode: boolean;
  onUpdate: (skillId: string, level: number) => void;
}

export function SkillsAssessment({
  skills,
  isEditMode,
  onUpdate
}: SkillsAssessmentProps) {
  return (
    <div className="print-no-break h-full flex flex-col">
      <h3 className="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-2">
        Skills Assessment
      </h3>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6 flex-1">
        <div className="space-y-3">
          {skills.map((skill) =>
            <div key={skill.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-gray-900 text-xs">
                  {skill.name}
                </span>
                <span className="text-[10px] font-medium text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                  Lvl {skill.level}/{skill.maxLevel}
                </span>
              </div>
              <div className="flex gap-1 h-1.5">
                {[...Array(skill.maxLevel)].map((_, idx) => {
                  const isActive = idx < skill.level;
                  return (
                    <div
                      key={idx}
                      onClick={() => isEditMode && onUpdate(skill.id, idx + 1)}
                      className={`
                        flex-1 rounded-full transition-colors duration-300
                        ${isActive ? 'bg-purple-600' : 'bg-gray-100'}
                        ${isEditMode ? 'cursor-pointer hover:bg-purple-400' : ''}
                      `}>
                    </div>);

                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);
}