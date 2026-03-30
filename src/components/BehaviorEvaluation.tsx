import React from 'react';
import { Student } from '../types/student';

interface BehaviorEvaluationProps {
  student: Student;
  isEditMode: boolean;
  onUpdate: (field: keyof Student, value: any) => void;
}

export function BehaviorEvaluation({
  student,
  isEditMode,
  onUpdate
}: BehaviorEvaluationProps) {
  const items = [
    {
      label: 'Participation',
      value: student.participation,
      field: 'participation' as keyof Student
    },
    {
      label: 'Teamwork',
      value: student.teamwork,
      field: 'teamwork' as keyof Student
    },
    {
      label: 'Creativity',
      value: student.creativity,
      field: 'creativity' as keyof Student
    }
  ];

  return (
    <div className="print-no-break h-full flex flex-col">
      <h3 className="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-2">
        Behavioral Evaluation
      </h3>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6 flex-1">
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-gray-900 text-xs">
                  {item.label}
                </span>
                <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  Score {item.value}/5
                </span>
              </div>
              <div className="flex gap-1 h-1.5">
                {[...Array(5)].map((_, i) => {
                  const isActive = i < item.value;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (isEditMode) {
                          onUpdate(item.field, i + 1);
                        }
                      }}
                      className={`
                        flex-1 rounded-full transition-colors duration-300
                        ${isActive ? 'bg-green-500' : 'bg-gray-100'}
                        ${isEditMode ? 'cursor-pointer hover:bg-green-400' : ''}
                      `}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}