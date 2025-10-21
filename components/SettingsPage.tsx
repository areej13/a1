
import React, { useState, useContext } from 'react';
import { AttendanceContext } from '../App';
import { CustomStatus, IconName } from '../types';
import { IconComponent, AVAILABLE_STATUS_ICONS } from './IconMap';
import { IconPlus, IconPencil, IconTrash, IconPalette } from './Icons';

const COLORS = ['green', 'red', 'yellow', 'blue', 'purple', 'indigo', 'gray', 'pink'];

const SettingsPage: React.FC = () => {
    const context = useContext(AttendanceContext);
    const [editingStatus, setEditingStatus] = useState<CustomStatus | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    if (!context) return null;

    const { customStatuses, setCustomStatuses } = context;

    const handleEdit = (status: CustomStatus) => {
        setEditingStatus(status);
        setIsFormVisible(true);
    };

    const handleDelete = (statusId: string) => {
        if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه الحالة؟ لا يمكن التراجع عن هذا الإجراء.')) {
            setCustomStatuses(prev => prev.filter(s => s.id !== statusId));
        }
    };

    const handleAddNew = () => {
        setEditingStatus(null);
        setIsFormVisible(true);
    }

    const handleFormClose = () => {
        setIsFormVisible(false);
        setEditingStatus(null);
    };

    const handleSave = (statusToSave: CustomStatus) => {
        if (editingStatus) {
            // Update existing
            setCustomStatuses(prev => prev.map(s => s.id === statusToSave.id ? statusToSave : s));
        } else {
            // Add new
            setCustomStatuses(prev => [...prev, { ...statusToSave, id: `status-${Date.now()}` }]);
        }
        handleFormClose();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">إعدادات النظام</h1>
                    <p className="text-gray-600">إدارة وتخصيص حالات الحضور والغياب.</p>
                </div>
                 <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
                >
                    <IconPlus className="h-5 w-5" />
                    إضافة حالة جديدة
                </button>
            </div>
            
            {isFormVisible && (
                <StatusForm 
                    status={editingStatus} 
                    onSave={handleSave} 
                    onCancel={handleFormClose} 
                />
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">حالات الحضور المخصصة</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {customStatuses.map(status => (
                        <div key={status.id} className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center bg-${status.color}-100 text-${status.color}-600`}>
                                    <IconComponent iconName={status.icon} className="h-5 w-5" />
                                </span>
                                <span className="font-semibold text-gray-800">{status.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(status)}
                                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                                    title="تعديل"
                                >
                                    <IconPencil className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(status.id)}
                                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-red-600"
                                    title="حذف"
                                >
                                    <IconTrash className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


interface StatusFormProps {
    status: CustomStatus | null;
    onSave: (status: CustomStatus) => void;
    onCancel: () => void;
}

const StatusForm: React.FC<StatusFormProps> = ({ status, onSave, onCancel }) => {
    const [label, setLabel] = useState(status?.label || '');
    const [color, setColor] = useState(status?.color || 'gray');
    const [icon, setIcon] = useState<IconName>(status?.icon || 'IconCheck');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!label) {
            alert('الرجاء إدخال اسم الحالة.');
            return;
        }
        onSave({
            id: status?.id || '',
            label,
            color,
            icon,
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-teal-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {status ? 'تعديل حالة' : 'إضافة حالة جديدة'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="status-label" className="block text-sm font-medium text-gray-700">اسم الحالة</label>
                    <input
                        id="status-label"
                        type="text"
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                        className="mt-1 w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اللون</label>
                    <div className="flex flex-wrap gap-2">
                        {COLORS.map(c => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setColor(c)}
                                className={`h-8 w-8 rounded-full bg-${c}-500 transition-transform duration-150 ${color === c ? 'ring-2 ring-offset-2 ring-teal-500 scale-110' : ''}`}
                                title={c}
                            />
                        ))}
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">الأيقونة</label>
                     <div className="flex flex-wrap gap-2">
                        {AVAILABLE_STATUS_ICONS.map(iconName => (
                             <button
                                key={iconName}
                                type="button"
                                onClick={() => setIcon(iconName)}
                                className={`p-2 rounded-md border-2 transition-colors ${icon === iconName ? 'bg-teal-100 border-teal-500 text-teal-600' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                            >
                                <IconComponent iconName={iconName} className="h-6 w-6" />
                            </button>
                        ))}
                     </div>
                </div>
                 <div className="flex items-center justify-end gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        إلغاء
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700">
                        حفظ
                    </button>
                </div>
            </form>
        </div>
    )
}


export default SettingsPage;
