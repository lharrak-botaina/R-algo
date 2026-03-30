import { Student, ReportStats } from '../types/student';
import { generateInstructorFeedback } from '../utils/feedbackGenerator';
import { SparklesIcon } from 'lucide-react';

interface InstructorFeedbackProps {
  student: Student;
  stats: ReportStats;
  isEditMode: boolean;
  onUpdate: (field: keyof Student, value: any) => void;
}

export function InstructorFeedback({
  student,
  stats,
  isEditMode,
  onUpdate
}: InstructorFeedbackProps) {
  const handleAutoGenerate = () => {
    const newFeedback = generateInstructorFeedback(student, stats);
    onUpdate('feedback', newFeedback);
  };
  return (
    <div className="print-no-break">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-bold text-purple-700 uppercase tracking-widest">
          Instructor Feedback
        </h3>
        {isEditMode && (
          <button
            onClick={handleAutoGenerate}
            className="flex items-center gap-1 text-[10px] font-bold text-purple-600 hover:bg-purple-50 px-2 py-0.5 rounded transition-colors"
            title="Auto-generate feedback based on data"
          >
            <SparklesIcon className="w-3 h-3" /> Auto-Generate
          </button>
        )}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6">
        <div className="flex gap-4 mb-4">
          <div className="w-1 bg-purple-600 rounded-full shrink-0"></div>
          <div className="flex-1">
            {isEditMode ?
              <textarea
                value={student.feedback}
                onChange={(e) => onUpdate('feedback', e.target.value)}
                className="w-full min-h-[100px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 text-xs leading-relaxed"
                placeholder="Enter instructor feedback here..." /> :

              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-xs">
                {student.feedback}
              </p>
            }
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
          <div className="relative group shrink-0">
            {student.instructorImage ? (
              <img
                src={student.instructorImage}
                alt={student.instructorName}
                className="w-10 h-10 rounded-full object-cover border border-gray-200" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                {student.instructorName.
                  split(' ').
                  map((n) => n[0]).
                  join('').
                  substring(0, 2).
                  toUpperCase()}
              </div>
            )}
            {isEditMode && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        onUpdate('instructorImage', reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="text-[8px] text-white font-bold uppercase">Edit</div>
              </label>
            )}
          </div>
          <div>
            <div className="font-bold text-gray-900 text-xs">
              {student.instructorName}
            </div>
            <div className="text-[10px] text-gray-500">
              Course Instructor · Algorithmics Tanger
            </div>
          </div>
        </div>
      </div>
    </div>);

}