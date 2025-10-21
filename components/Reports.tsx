
import React, { useContext, useMemo } from 'react';
import { AttendanceContext } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IconDownload } from './Icons';
import { CustomStatus } from '../types';

const COLORS: { [key: string]: string } = {
    green: '#22C55E',
    red: '#EF4444',
    yellow: '#F59E0B',
    blue: '#3B82F6',
    indigo: '#6366F1',
    purple: '#8B5CF6',
    pink: '#EC4899',
    gray: '#6B7280',
};

const Reports: React.FC = () => {
    const context = useContext(AttendanceContext);

    const today = new Date().toISOString().split('T')[0];

    const { dailyStats, totalStudents } = useMemo(() => {
        if (!context) return { dailyStats: [], totalStudents: 0 };
        const { attendance, classes, customStatuses } = context;
        
        const total = classes.reduce((sum, cls) => sum + cls.students.length, 0);
        
        const todayAttendance = attendance.filter(r => r.date === today);

        const stats = customStatuses.map(status => {
            const count = todayAttendance.filter(r => r.statusId === status.id).length;
            return { ...status, count };
        });
        
        return { dailyStats: stats, totalStudents: total };
    }, [context, today]);

    const weeklyData = useMemo(() => {
        if (!context) return [];
        const { customStatuses } = context;
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
        
        // Mock data for weekly chart
        return days.map(day => {
            const entry: { name: string, [key: string]: any } = { name: day };
            customStatuses.forEach(status => {
                if (status.label !== 'حاضرة') { // Don't chart "present" students
                   entry[status.label] = Math.floor(Math.random() * (status.label.includes('غائبة') ? 5 : 3));
                }
            });
            return entry;
        });
    }, [context]);

    const handleExport = () => {
        alert("سيتم تجهيز التقرير للطباعة والتصدير بصيغة PDF.");
        window.print();
    };

    if (!context) return <div>تحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">تقارير الحضور والغياب</h1>
                    <p className="text-gray-600">نظرة عامة على إحصاءات الحضور لليوم والأسبوع.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    <IconDownload className="h-5 w-5" />
                    تصدير التقرير
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 {dailyStats.map(stat => (
                    <StatCard key={stat.id} title={`إجمالي (${stat.label})`} value={stat.count} total={totalStudents} color={stat.color} />
                ))}
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">معدل الحالات الأسبوعي</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fill: '#4A5568' }} />
                            <YAxis tick={{ fill: '#4A5568' }} />
                            <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: '0.5rem' }} />
                            <Legend wrapperStyle={{ fontFamily: 'Cairo' }}/>
                            {context.customStatuses.filter(s => s.label !== 'حاضرة').map(status => (
                                <Bar key={status.id} dataKey={status.label} fill={COLORS[status.color] || '#8884d8'} name={status.label} radius={[4, 4, 0, 0]}/>
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    title: string;
    value: number;
    total: number;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, total, color }) => {
    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
    
    const colorsMap: {[key: string]: string} = {
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        blue: 'bg-blue-100 text-blue-800',
        indigo: 'bg-indigo-100 text-indigo-800',
        purple: 'bg-purple-100 text-purple-800',
        pink: 'bg-pink-100 text-pink-800',
        gray: 'bg-gray-100 text-gray-800',
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h4 className="text-sm font-medium text-gray-500">{title}</h4>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                <span className="text-sm text-gray-500">/ {total}</span>
            </div>
            <div className={`mt-2 text-xs font-semibold px-2 py-1 rounded-full inline-block ${colorsMap[color] || colorsMap.gray}`}>
                {percentage}%
            </div>
        </div>
    );
};

export default Reports;
