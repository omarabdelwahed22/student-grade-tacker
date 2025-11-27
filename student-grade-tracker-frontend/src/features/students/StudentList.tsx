import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../store/studentSlice';
import { RootState } from '../../store';
import './StudentList.css';

const StudentList: React.FC = () => {
  const dispatch = useDispatch();
  const { items: students, loading, error } = useSelector((state: RootState) => state.students);

  useEffect(() => {
    dispatch(fetchStudents() as any);
  }, [dispatch]);

  if (loading) {
    return <div className="student-list-loading">Loading students...</div>;
  }

  if (error) {
    return <div className="student-list-error">Error: {error}</div>;
  }

  return (
    <div className="student-list-container">
      <h2>Students</h2>
      {students.length === 0 ? (
        <p className="student-list-empty">No students found.</p>
      ) : (
        <table className="student-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Enrollment Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="student-row">
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
