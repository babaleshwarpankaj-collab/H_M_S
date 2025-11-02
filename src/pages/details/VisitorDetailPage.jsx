import React from 'react';
import { useParams } from 'react-router-dom';
import { visitors } from '../../lib/mockData';
import DetailPageLayout from '../../components/layout/DetailPageLayout';
import DetailItem from '../../components/ui/DetailItem';

const statusStyles = {
    In: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    Out: 'bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400',
};

const VisitorDetailPage = () => {
    const { id } = useParams();
    const visitor = visitors.find(v => v.id === id);

    if (!visitor) {
        return <div className="text-center text-base-content-secondary dark:text-dark-base-content-secondary">Visitor log not found</div>;
    }

    return (
        <DetailPageLayout title={`Visitor: ${visitor.visitorName}`} backTo="/visitors">
            <DetailItem label="Visitor Name" value={visitor.visitorName} />
            <DetailItem label="Visiting Student" value={visitor.studentName} />
            <DetailItem label="Check-in Time" value={new Date(visitor.checkInTime).toLocaleString()} />
            <DetailItem label="Check-out Time" value={visitor.checkOutTime ? new Date(visitor.checkOutTime).toLocaleString() : 'N/A'} />
            <DetailItem label="Status">
                 <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[visitor.status]}`}>
                    {visitor.status}
                </span>
            </DetailItem>
        </DetailPageLayout>
    );
};

export default VisitorDetailPage;
