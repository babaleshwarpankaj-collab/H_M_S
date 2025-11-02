import React from 'react';
import { useParams } from 'react-router-dom';
import { fees } from '../../lib/mockData';
import DetailPageLayout from '../../components/layout/DetailPageLayout';
import DetailItem from '../../components/ui/DetailItem';

const statusStyles = {
    Paid: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    Due: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
    Overdue: 'bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400',
};

const FeeDetailPage = () => {
    const { id } = useParams();
    const fee = fees.find(f => f.id === id);

    if (!fee) {
        return <div className="text-center text-base-content-secondary dark:text-dark-base-content-secondary">Fee record not found</div>;
    }

    return (
        <DetailPageLayout title={`Fee Record for ${fee.studentName}`} backTo="/fees">
            <DetailItem label="Student Name" value={fee.studentName} />
            <DetailItem label="Amount" value={fee.amount} />
            <DetailItem label="Due Date" value={new Date(fee.dueDate).toLocaleDateString()} />
            <DetailItem label="Status">
                <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[fee.status]}`}>
                    {fee.status}
                </span>
            </DetailItem>
            <DetailItem label="Payment Date" value={fee.status === 'Paid' ? new Date(fee.paymentDate).toLocaleDateString() : 'N/A'} />
        </DetailPageLayout>
    );
};

export default FeeDetailPage;
