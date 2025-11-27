export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  date: string;
}
