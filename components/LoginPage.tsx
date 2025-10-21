
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
    onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [role, setRole] = useState<UserRole>(UserRole.TEACHER);
    const [schoolCode, setSchoolCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would validate the school code
        if (schoolCode) {
            onLogin(role);
        } else {
            alert('الرجاء إدخال رمز المدرسة');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-500">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">أهلاً بكِ في نظام الحضور</h2>
                    <p className="mt-2 text-gray-600">سجلي دخولك لمتابعة حضور الطالبات</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="school-code" className="block text-sm font-medium text-gray-700">
                            رمز المدرسة
                        </label>
                        <div className="mt-1">
                            <input
                                id="school-code"
                                name="school-code"
                                type="text"
                                required
                                value={schoolCode}
                                onChange={(e) => setSchoolCode(e.target.value)}
                                className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., S12345"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            الدخول بصفتي
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as UserRole)}
                            className="w-full px-3 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                            <option value={UserRole.TEACHER}>معلمة</option>
                            <option value={UserRole.ADMIN}>إدارية / مرشدة طلابية</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
                        >
                            تسجيل الدخول
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
