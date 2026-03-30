import React from 'react';
import {
  DownloadIcon,
  FileJsonIcon,
  PrinterIcon,
  Edit3Icon,
  EyeIcon,
  PlusIcon,
  UploadIcon
} from
  'lucide-react';
import { Student } from '../types/student';
import { exportToJSON, exportToHTML, importFromJSON } from '../utils/exporters';
interface EditToolbarProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  student: Student;
  onImport: (student: Student) => void;
}
export function EditToolbar({
  isEditMode,
  toggleEditMode,
  student,
  onImport
}: EditToolbarProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const data = await importFromJSON(file);
        onImport(data);
        // Success feedback could be added here
      } catch (err: any) {
        console.error('Import error:', err);
        alert(err.message || 'Failed to import JSON');
      } finally {
        // Reset input value to allow re-importing the same file
        e.target.value = '';
      }
    }
  };
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between print:hidden">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-lg">
            Algorithmics Report System
          </span>
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
            v2.0
          </span>
        </div>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-1.5 rounded-md transition-colors">
          <UploadIcon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Import JSON</span>
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange} />

        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleEditMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isEditMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>

          {isEditMode ?
            <>
              <EyeIcon className="w-4 h-4" /> Preview Mode
            </> :

            <>
              <Edit3Icon className="w-4 h-4" /> Edit Mode
            </>
          }
        </button>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <button
          onClick={() => exportToJSON(student)}
          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
          title="Save as JSON">

          <FileJsonIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => exportToHTML(student)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">

          <DownloadIcon className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>);

}