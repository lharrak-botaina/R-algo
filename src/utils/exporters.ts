import { Student } from '../types/student';

export function exportToJSON(student: Student) {
  const dataStr = JSON.stringify(student, null, 2);
  const dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = `report_${student.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function exportToHTML(student: Student) {
  // Save original title
  const originalTitle = document.title;

  // Set title to desired PDF file name
  document.title = `Progress Report - ${student.name}`;

  // Function to restore title
  const restoreTitle = () => {
    document.title = originalTitle;
    window.removeEventListener('afterprint', restoreTitle);
  };

  // Print dialog blocks execution, so we listen for afterprint
  window.addEventListener('afterprint', restoreTitle);

  // Trigger print dialog
  window.print();

  // Fallback for browsers where afterprint doesn't fire properly
  setTimeout(restoreTitle, 1000);
}

export function importFromJSON(file: File): Promise<Student> {
  return new Promise((resolve, reject) => {
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      reject(new Error('Only .json files are allowed'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);

        // Basic validation for Student interface
        const requiredFields: (keyof Student)[] = [
          'name', 'className', 'instructorName', 'modules', 'skills', 'feedback'
        ];

        for (const field of requiredFields) {
          if (json[field] === undefined) {
            throw new Error(`Invalid report format: Missing required field "${field}"`);
          }
        }

        if (!Array.isArray(json.modules) || !Array.isArray(json.skills)) {
          throw new Error('Invalid report format: "modules" and "skills" must be arrays');
        }

        resolve(json);
      } catch (e: any) {
        reject(e instanceof Error ? e : new Error('Invalid JSON file format'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}