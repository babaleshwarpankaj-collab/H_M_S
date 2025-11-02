import React from 'react';
import { useParams } from 'react-router-dom';
import { rooms } from '../../lib/mockData';
import DetailPageLayout from '../../components/layout/DetailPageLayout';
import DetailItem from '../../components/ui/DetailItem';

const statusStyles = {
    Occupied: 'bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400',
    Vacant: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    Maintenance: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
};

const RoomDetailPage = () => {
    const { id } = useParams();
    const room = rooms.find(r => r.id === id);

    if (!room) {
        return <div className="text-center text-base-content-secondary dark:text-dark-base-content-secondary">Room not found</div>;
    }

    return (
        <DetailPageLayout title={`Room ${room.roomNumber}`} backTo="/rooms">
            <DetailItem label="Room Number" value={room.roomNumber} />
            <DetailItem label="Room Type" value={room.type} />
            <DetailItem label="Status">
                <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[room.status]}`}>
                    {room.status}
                </span>
            </DetailItem>
            <DetailItem label="Occupants" value={room.occupants} />
        </DetailPageLayout>
    );
};

export default RoomDetailPage;
