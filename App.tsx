
import React, { useState, useCallback, useMemo } from 'react';
import { User, UserRole, AttendanceRecord, SchoolClass, CustomStatus } from './types';
import { SCHOOL_CLASSES, DEFAULT_STATUSES } from './constants';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import SettingsPage from './components/SettingsPage';

export type Page = 'dashboard' | 'reports' | 'settings';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const AttendanceContext = React.createContext<{
    attendance: AttendanceRecord[];
    updateAttendance: (studentId: string, statusId: string) => void;
    classes: SchoolClass[];
    customStatuses: CustomStatus[];
    setCustomStatuses: React.Dispatch<React.SetStateAction<CustomStatus[]>>;
} | null>(null);


const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [customStatuses, setCustomStatuses] = useState<CustomStatus[]>(DEFAULT_STATUSES);

    const handleLogin = useCallback((role: UserRole) => {
        const userName = role === UserRole.ADMIN ? 'المرشدة الطلابية' : 'المعلمة';
        setUser({ name: userName, role });
    }, []);

    const handleLogout = useCallback(() => {
        setUser(null);
        setCurrentPage('dashboard');
    }, []);

    const updateAttendance = useCallback((studentId: string, statusId: string) => {
        const today = getTodayDateString();
        setAttendance(prev => {
            const existingRecordIndex = prev.findIndex(r => r.studentId === studentId && r.date === today);
            if (existingRecordIndex > -1) {
                const updated = [...prev];
                updated[existingRecordIndex] = { ...updated[existingRecordIndex], statusId };
                return updated;
            }
            return [...prev, { studentId, statusId, date: today }];
        });
    }, []);
    
    const contextValue = useMemo(() => ({
        attendance,
        updateAttendance,
        classes: SCHOOL_CLASSES,
        customStatuses,
        setCustomStatuses,
    }), [attendance, updateAttendance, customStatuses]);

    if (!user) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <AttendanceContext.Provider value={contextValue}>
            <div className="min-h-screen bg-gray-100">
                <Header user={user} onLogout={handleLogout} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <main className="p-4 sm:p-6 lg:p-8">
                    {currentPage === 'dashboard' && <Dashboard user={user} />}
                    {currentPage === 'reports' && <Reports />}
                    {currentPage === 'settings' && user.role === UserRole.ADMIN && <SettingsPage />}
                </main>
            </div>
        </AttendanceContext.Provider>
    );
};

export default App;
