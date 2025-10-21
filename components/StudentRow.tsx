
import React, { useContext } from 'react';
import { Student, CustomStatus } from '../types';
import { IconBell } from './Icons';
import { AttendanceContext } from '../App';
import { IconComponent } from './IconMap';

interface StudentRowProps {
    student: Student;
    statusId: string | null;
    onStatusChange: (studentId: string, statusId: string) => void;
}

const StatusButton: React.FC<{
    status: CustomStatus;
    currentStatusId: string | null;
    onClick: () => void;
}> = ({ status, currentStatusId, onClick }) => {
    const isActive = status.id === currentStatusId;
    const colorClasses = `bg-${status.color}-500 border-${status.color}-500`;

    return (
        <button
            onClick={onClick}
            title={status.label}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-in-out border ${
                isActive
                    ? `${colorClasses} text-white shadow-sm`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
            <IconComponent iconName={status.icon} className="h-5 w-5" />
            <span className="hidden sm:inline">{status.label}</span>
        </button>
    );
};


const StudentRow: React.FC<StudentRowProps> = ({ student, statusId, onStatusChange }) => {
    const context = useContext(AttendanceContext);
    
    const handleNotifyParent = () => {
        alert(`تم إرسال إشعار لولي أمر الطالبة: ${student.name}`);
    };

    return (
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={student.photoUrl} alt={student.name} className="h-12 w-12 rounded-full object-cover" />
                <span className="font-semibold text-gray-800">{student.name}</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="grid grid-cols-3 gap-2 flex-grow" style={{gridTemplateColumns: `repeat(${context?.customStatuses.length || 3}, minmax(0, 1fr))`}}>
                     {context?.customStatuses.map(status => (
                         <StatusButton
                            key={status.id}
                            status={status}
                            currentStatusId={statusId}
                            onClick={() => onStatusChange(student.id, status.id)}
                        />
                    ))}
                </div>
                 <button
                    onClick={handleNotifyParent}
                    className="p-2.5 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    title="إرسال إشعار لولي الأمر"
                >
                    <IconBell className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default StudentRow;
