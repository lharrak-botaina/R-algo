import React from 'react';
import { Student } from '../types/student';
import { AlertTriangleIcon } from 'lucide-react';
export function ValidationBanner({ student }: {student: Student;}) {
  const warnings = [];
  if (!student.name.trim()) warnings.push('Student name is missing');
  if (student.modules.length === 0) warnings.push('No modules added');
  const incompleteModules = student.modules.filter((m) =>
  m.lessons.some((l) => l.status === 'unknown')
  );
  if (incompleteModules.length > 0) {
    warnings.push(`${incompleteModules.length} modules have unmarked lessons`);
  }
  if (warnings.length === 0) return null;
  return (
    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 rounded-r-md print:hidden">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangleIcon
            className="h-5 w-5 text-orange-400"
            aria-hidden="true" />

        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-orange-800">
            Report Attention Needed
          </h3>
          <div className="mt-2 text-sm text-orange-700">
            <ul className="list-disc pl-5 space-y-1">
              {warnings.map((warning, idx) =>
              <li key={idx}>{warning}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>);

}