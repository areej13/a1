
import { SchoolClass, Student, CustomStatus } from './types';

const generateStudents = (count: number, prefix: string): Student[] => {
  const students: Student[] = [
    { id: `${prefix}-1`, name: 'نورة عبدالله', photoUrl: `https://picsum.photos/seed/${prefix}1/100` },
    { id: `${prefix}-2`, name: 'فاطمة خالد', photoUrl: `https://picsum.photos/seed/${prefix}2/100` },
    { id: `${prefix}-3`, name: 'سارة محمد', photoUrl: `https://picsum.photos/seed/${prefix}3/100` },
    { id: `${prefix}-4`, name: 'شهد فهد', photoUrl: `https://picsum.photos/seed/${prefix}4/100` },
    { id: `${prefix}-5`, name: 'ريم علي', photoUrl: `https://picsum.photos/seed/${prefix}5/100` },
    { id: `${prefix}-6`, name: 'جود ياسر', photoUrl: `https://picsum.photos/seed/${prefix}6/100` },
    { id: `${prefix}-7`, name: 'لمى سعد', photoUrl: `https://picsum.photos/seed/${prefix}7/100` },
    { id: `${prefix}-8`, name: 'حصة أحمد', photoUrl: `https://picsum.photos/seed/${prefix}8/100` },
    { id: `${prefix}-9`, name: 'مريم تركي', photoUrl: `https://picsum.photos/seed/${prefix}9/100` },
    { id: `${prefix}-10`, name: 'الجوهزة وليد', photoUrl: `https://picsum.photos/seed/${prefix}10/100` },
    { id: `${prefix}-11`, name: 'ديمة سلطان', photoUrl: `https://picsum.photos/seed/${prefix}11/100` },
    { id: `${prefix}-12`, name: 'ليان عبدالعزيز', photoUrl: `https://picsum.photos/seed/${prefix}12/100` },
  ];
  return students.slice(0, count);
};

export const DEFAULT_STATUSES: CustomStatus[] = [
  { id: 'status-1', label: 'حاضرة', color: 'green', icon: 'IconCheck' },
  { id: 'status-2', label: 'غائبة', color: 'red', icon: 'IconX' },
  { id: 'status-3', label: 'متأخرة', color: 'yellow', icon: 'IconClock' },
];

export const SCHOOL_CLASSES: SchoolClass[] = [
  { id: 'c1', name: 'أول ثانوي / ١', teacher: 'أ. منيرة', students: generateStudents(12, 'c1') },
  { id: 'c2', name: 'أول ثانوي / ٢', teacher: 'أ. هدى', students: generateStudents(11, 'c2') },
  { id: 'c3', name: 'ثاني ثانوي / ١', teacher: 'أ. سارة', students: generateStudents(12, 'c3') },
  { id: 'c4', name: 'ثاني ثانوي / ٢', teacher: 'أ. فاطمة', students: generateStudents(10, 'c4') },
  { id: 'c5', name: 'ثالث ثانوي / ١', teacher: 'أ. نورة', students: generateStudents(12, 'c5') },
  { id: 'c6', name: 'ثالث ثانوي / ٢', teacher: 'أ. أمل', students: generateStudents(11, 'c6') },
];
