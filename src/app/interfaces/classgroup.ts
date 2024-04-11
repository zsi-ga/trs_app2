import { TeacherAverage } from "./teacheravarage";

export interface ClassGroup
 {
  class: string;
  registrations: number;
  totalSchoolPoints: number;
  averageSchoolPoints: number;
  classification: string;
  studentData: { 
    fullName: string;
    email: string;
    totalSchoolPoints: number;
    teacherResults: { 
      teacherName: string; 
      teacherPoints: number;
    }[];
  }[];
  teacherAverages?: TeacherAverage[];
}