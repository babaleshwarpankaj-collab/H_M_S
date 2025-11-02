import React from 'react';
import { useParams } from 'react-router-dom';
import { students } from '../../lib/mockData';
import DetailPageLayout from '../../components/layout/DetailPageLayout';
import DetailItem from '../../components/ui/DetailItem';

const StudentDetailPage = () => {
    const { id } = useParams();
    const student = students.find(s => s.id === id);

    if (!student) {
        return <div className="text-center text-base-content-secondary dark:text-dark-base-content-secondary">Student not found</div>;
    }

    return (
        <DetailPageLayout title={student.fullName} backTo="/students">
            <DetailItem label="Full Name" value={student.fullName} />
            <DetailItem label="Email" value={student.email} />
            <DetailItem label="Course" value={student.course} />
            <DetailItem label="Contact" value={student.contact} />
            <DetailItem label="Role" value={student.role} />
        </DetailPageLayout>
    );
};

export default StudentDetailPage;
