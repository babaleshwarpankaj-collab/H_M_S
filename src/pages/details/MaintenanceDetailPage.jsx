import React from 'react';
import { useParams } from 'react-router-dom';
import { maintenanceRequests } from '../../lib/mockData';
import DetailPageLayout from '../../components/layout/DetailPageLayout';
import DetailItem from '../../components/ui/DetailItem';

const statusStyles = {
    Pending: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
    'In Progress': 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    Resolved: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
};

const MaintenanceDetailPage = () => {
    const { id } = useParams();
    const request = maintenanceRequests.find(r => r.id === id);

    if (!request) {
        return <div className="text-center text-base-content-secondary dark:text-dark-base-content-secondary">Maintenance request not found</div>;
    }

    return (
        <DetailPageLayout title={`Request: ${request.issue}`} backTo="/maintenance">
            <DetailItem label="Issue" value={request.issue} />
            <DetailItem label="Room Number" value={request.roomNumber} />
            <DetailItem label="Reported By" value={request.reportedBy} />
            <DetailItem label="Date Reported" value={new Date(request.date).toLocaleDateString()} />
            <DetailItem label="Status">
                <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[request.status]}`}>
                    {request.status}
                </span>
            </DetailItem>
        </DetailPageLayout>
    );
};

export default MaintenanceDetailPage;
