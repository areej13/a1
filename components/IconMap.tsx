
import React from 'react';
import { IconCheck, IconX, IconClock } from './Icons';
import { IconName } from '../types';

export const ICONS: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
    IconCheck,
    IconX,
    IconClock,
};

// The icons that users can choose from for their custom statuses.
export const AVAILABLE_STATUS_ICONS: IconName[] = ['IconCheck', 'IconX', 'IconClock'];

/**
 * A component that dynamically renders an icon based on its name.
 * @param {iconName} - The name of the icon to render from the ICONS map.
 * @param {className} - Optional CSS classes to apply to the SVG icon.
 */
export const IconComponent: React.FC<{ iconName: IconName; className?: string }> = ({ iconName, className }) => {
    const Icon = ICONS[iconName];
    if (!Icon) return null; // Or return a default icon
    return <Icon className={className} />;
};
