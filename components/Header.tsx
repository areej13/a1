
import React from 'react';
import { User, UserRole } from '../types';
import { Page } from '../App';
import { IconChartBar, IconLayoutDashboard, IconLogout, IconUsers, IconSettings } from './Icons';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, currentPage, setCurrentPage }) => {
    const NavLink: React.FC<{ page: Page; label: string; icon: React.ReactNode }> = ({ page, label, icon }) => (
        <button
            onClick={() => setCurrentPage(page)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                    ? 'bg-teal-700 text-white'
                    : 'text-gray-300 hover:bg-teal-600 hover:text-white'
            }`}
        >
            {icon}
            {label}
        </button>
    );

    return (
        <header className="bg-teal-800 text-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                           <IconUsers className="h-8 w-8 text-teal-300" />
                           <span className="text-xl font-bold">نظام الحضور</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-2">
                            <NavLink page="dashboard" label="لوحة التحكم" icon={<IconLayoutDashboard className="h-5 w-5"/>} />
                            <NavLink page="reports" label="التقارير" icon={<IconChartBar className="h-5 w-5" />} />
                            {user.role === UserRole.ADMIN && (
                                <NavLink page="settings" label="الإعدادات" icon={<IconSettings className="h-5 w-5" />} />
                            )}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-right">
                           <div className="text-sm font-semibold">{user.name}</div>
                           <div className="text-xs text-teal-300">{user.role}</div>
                       </div>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 p-2 rounded-full text-gray-300 hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white transition-colors"
                            aria-label="تسجيل الخروج"
                        >
                            <IconLogout className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                {/* Mobile Navigation */}
                 <nav className="md:hidden pt-2 pb-3 space-x-1 rtl:space-x-reverse flex justify-center border-t border-teal-700">
                    <NavLink page="dashboard" label="التحكم" icon={<IconLayoutDashboard className="h-5 w-5"/>} />
                    <NavLink page="reports" label="التقارير" icon={<IconChartBar className="h-5 w-5" />} />
                    {user.role === UserRole.ADMIN && (
                        <NavLink page="settings" label="الإعدادات" icon={<IconSettings className="h-5 w-5" />} />
                    )}
                 </nav>
            </div>
        </header>
    );
};

export default Header;
