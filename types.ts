
export type IconName = 'IconCheck' | 'IconX' | 'IconClock';

export interface CustomStatus {
  id: string;
  label: string;
  // Color name from a predefined palette (e.g., 'green', 'red')
  // used to generate Tailwind CSS classes.
  color: string;
  icon: IconName;
}

export interface Student {
  id: string;
  name: string;
  photoUrl: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  teacher: string;
  students: Student[];
}

export type AttendanceRecord = {
  studentId: string;
  statusId: string; // Corresponds to CustomStatus.id
  date: string; // YYYY-MM-DD
};

export enum UserRole {
  TEACHER = 'معلمة',
  ADMIN = 'إدارية'
}

export type User = {
  name: string;
  role: UserRole;
};
