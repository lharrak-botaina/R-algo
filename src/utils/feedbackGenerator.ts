import { Student, ReportStats } from '../types/student';

/**
 * Generates a professional and concise feedback text based on student performance.
 * Logic considers completion rate, attendance, participation, teamwork, and creativity.
 */
export function generateInstructorFeedback(student: Student, stats: ReportStats): string {
    const { name } = student;
    const firstName = name.split(' ')[0];

    const strengths: string[] = [];
    const improvements: string[] = [];

    // 1. Analyze Core Stats
    if (stats.overallCompletion >= 90) {
        strengths.push('exceptional module completion rate');
    } else if (stats.overallCompletion >= 75) {
        strengths.push('solid progress across the curriculum');
    } else if (stats.overallCompletion < 50) {
        improvements.push('increasing the pace of module completion');
    }

    if (stats.attendanceRate >= 95) {
        strengths.push('perfect attendance');
    } else if (stats.attendanceRate < 80) {
        improvements.push('improving attendance consistency');
    }

    // 2. Analyze Behavioral/Soft Skills
    if (student.participation >= 4) {
        strengths.push('active engagement in class discussions');
    } else if (student.participation <= 2) {
        improvements.push('increasing participation during lessons');
    }

    if (student.teamwork >= 4) {
        strengths.push('excellent collaborative spirit');
    }

    if (student.creativity >= 4) {
        strengths.push('high level of creative problem-solving');
    }

    // 3. Construct Feedback Paragraphs
    let feedback = `${firstName} has shown `;

    if (strengths.length > 0) {
        feedback += `${strengths.slice(0, 2).join(' and ')}. `;
        if (strengths.length > 2) {
            feedback += `We particularly appreciate ${firstName}'s ${strengths[2]}. `;
        }
    } else {
        feedback += `a steady effort this term. `;
    }

    if (improvements.length > 0) {
        feedback += `To further excel, we recommend focusing on ${improvements.join(' and ')}. `;
    } else {
        feedback += `Keep up the fantastic work and continue exploring more complex challenges! `;
    }

    // Overall Tone Adjustment
    if (stats.overallCompletion > 85 && student.participation >= 4) {
        feedback += ` A very promising start to the academic year.`;
    }

    // Safety length check for PDF (approx 400-500 chars max)
    return feedback.substring(0, 500);
}
