import axios from 'axios';
import { Student, Grade } from '../types';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student endpoints
export const getStudents = async (): Promise<Student[]> => {
  const response = await apiClient.get<Student[]>('/students');
  return response.data;
};

export const getStudent = async (id: string): Promise<Student> => {
  const response = await apiClient.get<Student>(`/students/${id}`);
  return response.data;
};

export const createStudent = async (student: Omit<Student, 'id'>): Promise<Student> => {
  const response = await apiClient.post<Student>('/students', student);
  return response.data;
};

export const updateStudent = async (id: string, student: Partial<Student>): Promise<Student> => {
  const response = await apiClient.put<Student>(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await apiClient.delete(`/students/${id}`);
};

// Grade endpoints
export const getGrades = async (): Promise<Grade[]> => {
  const response = await apiClient.get<Grade[]>('/grades');
  return response.data;
};

export const getGrade = async (id: string): Promise<Grade> => {
  const response = await apiClient.get<Grade>(`/grades/${id}`);
  return response.data;
};

export const createGrade = async (grade: Omit<Grade, 'id'>): Promise<Grade> => {
  const response = await apiClient.post<Grade>('/grades', grade);
  return response.data;
};

export const updateGrade = async (id: string, grade: Partial<Grade>): Promise<Grade> => {
  const response = await apiClient.put<Grade>(`/grades/${id}`, grade);
  return response.data;
};

export const deleteGrade = async (id: string): Promise<void> => {
  await apiClient.delete(`/grades/${id}`);
};
