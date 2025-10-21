
import React, { useState, useContext } from 'react';
import { User, SchoolClass, UserRole } from '../types';
import { AttendanceContext } from '../App';
import AttendanceList from './AttendanceList';
import { IconUsersGroup } from './Icons';

interface DashboardProps {
    user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const context = useContext(AttendanceContext);

    if (!context) {
        return <div>Loading...</div>;
    }
    const { classes } = context;

    const handleSelectClass = (classId: string) => {
        setSelectedClassId(classId);
    };
    
    const visibleClasses = user.role === UserRole.ADMIN ? classes : classes.slice(0, 2); // Mock: Teacher sees first 2 classes

    const selectedClass = classes.find(c => c.id === selectedClassId);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">مرحباً, {user.name}</h1>
                <p className="text-gray-600">
                    {selectedClassId ? `أنتِ الآن في صفحة الحضور لفصل ${selectedClass?.name}` : 'الرجاء اختيار فصل لبدء تسجيل الحضور.'}
                </p>
            </div>

            {!selectedClassId ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {visibleClasses.map((cls) => (
                        <button
                            key={cls.id}
                            onClick={() => handleSelectClass(cls.id)}
                            className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 text-center"
                        >
                            <IconUsersGroup className="h-10 w-10 mx-auto text-teal-600" />
                            <h3 className="mt-2 text-lg font-semibold text-gray-800">{cls.name}</h3>
                            <p className="text-sm text-gray-500">{cls.teacher}</p>
                            <p className="text-sm text-gray-500">{cls.students.length} طالبة</p>
                        </button>
                    ))}
                </div>
            ) : (
                <div>
                     <button 
                        onClick={() => setSelectedClassId(null)}
                        className="mb-4 px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    >
                        → العودة لاختيار الفصول
                    </button>
                    <AttendanceList classId={selectedClassId} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
