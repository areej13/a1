
import React, { useContext, useMemo } from 'react';
import { AttendanceContext } from '../App';
import StudentRow from './StudentRow';
import { IconComponent } from './IconMap';

interface AttendanceListProps {
    classId: string;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const AttendanceList: React.FC<AttendanceListProps> = ({ classId }) => {
    const context = useContext(AttendanceContext);

    if (!context) return null;

    const { classes, attendance, updateAttendance, customStatuses } = context;
    const schoolClass = classes.find(c => c.id === classId);

    const today = getTodayDateString();

    const classAttendance = useMemo(() => {
        const studentMap = new Map<string, string | null>();
        schoolClass?.students.forEach(s => studentMap.set(s.id, null));
        attendance
            .filter(r => r.date === today && studentMap.has(r.studentId))
            .forEach(r => studentMap.set(r.studentId, r.statusId));
        return studentMap;
    }, [attendance, schoolClass, today]);

    const handleStatusChange = (studentId: string, statusId: string) => {
        updateAttendance(studentId, statusId);
    };

    const markAllPresent = () => {
        const presentStatus = customStatuses.find(s => s.label === 'حاضرة');
        if (!presentStatus) {
            alert("لم يتم العثور على حالة 'حاضرة' في الإعدادات.");
            return;
        }

        schoolClass?.students.forEach(student => {
            if (classAttendance.get(student.id) !== presentStatus.id) {
                updateAttendance(student.id, presentStatus.id);
            }
        });
    };

    if (!schoolClass) return <div>لم يتم العثور على الفصل.</div>;

    const summary = useMemo(() => {
        const statusCounts: { [key: string]: number } = {};
        customStatuses.forEach(status => {
            statusCounts[status.id] = 0;
        });

        for (const statusId of classAttendance.values()) {
            if (statusId && statusCounts[statusId] !== undefined) {
                statusCounts[statusId]++;
            }
        }
        return statusCounts;
    }, [classAttendance, customStatuses]);
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex items-center flex-wrap gap-4">
                    <h3 className="text-xl font-bold text-gray-800">قائمة الطالبات</h3>
                    <div className="flex items-center gap-4 text-sm">
                        {customStatuses.map(status => (
                            <span key={status.id} className={`flex items-center gap-1 text-${status.color}-600`}>
                                <IconComponent iconName={status.icon} className="h-5 w-5" /> {summary[status.id] || 0}
                            </span>
                        ))}
                    </div>
                 </div>
                 <button 
                    onClick={markAllPresent}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
                >
                    تحضير الجميع
                </button>
            </div>
            <div className="divide-y divide-gray-200">
                {schoolClass.students.map((student) => (
                    <StudentRow
                        key={student.id}
                        student={student}
                        statusId={classAttendance.get(student.id) || null}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default AttendanceList;
