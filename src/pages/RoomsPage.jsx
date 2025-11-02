import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { rooms } from '../lib/mockData';
import { BedDouble, User, Wrench } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Modal from '../components/ui/Modal';
import toast from 'react-hot-toast';

const statusStyles = {
    Occupied: 'bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400',
    Vacant: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    Maintenance: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
};

const RoomsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddRoom = (e) => {
        e.preventDefault();
        toast.success('New room added successfully! (Mock)');
        setIsModalOpen(false);
    };

    return (
        <>
            <PageHeader 
                title="Room Management"
                buttonText="Add Room"
                onButtonClick={() => setIsModalOpen(true)}
            />
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {rooms.map(room => (
                    <motion.div 
                        key={room.id} 
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Link to={`/rooms/${room.id}`} className="block bg-base-100 dark:bg-dark-base-200 rounded-2xl shadow-lg p-5 flex flex-col justify-between h-full transition-all duration-300">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold font-heading text-base-content dark:text-dark-base-content">Room {room.roomNumber}</h3>
                                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[room.status]}`}>
                                        {room.status}
                                    </span>
                                </div>
                                <p className="text-sm text-base-content-secondary dark:text-dark-base-content-secondary mt-1">{room.type}</p>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-base-content-secondary dark:text-dark-base-content-secondary">
                                {room.status === 'Occupied' && <User className="w-4 h-4 mr-2" />}
                                {room.status === 'Vacant' && <BedDouble className="w-4 h-4 mr-2" />}
                                {room.status === 'Maintenance' && <Wrench className="w-4 h-4 mr-2" />}
                                <span>
                                    {room.status === 'Occupied' ? `${room.occupants} Occupant(s)` : room.status === 'Vacant' ? 'Available' : 'Under Repair'}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            <Modal title="Add New Room" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleAddRoom} className="space-y-4">
                    <div>
                        <label htmlFor="roomNumber" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Room Number</label>
                        <input type="number" name="roomNumber" id="roomNumber" required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Room Type</label>
                        <select id="type" name="type" required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                            <option>Single</option>
                            <option>Double</option>
                            <option>Triple</option>
                        </select>
                    </div>
                    <div className="flex justify-end pt-4 space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex justify-center py-2 px-4 border border-base-300 dark:border-dark-base-300 shadow-sm text-sm font-medium rounded-lg text-base-content dark:text-dark-base-content bg-base-100 dark:bg-dark-base-200 hover:bg-base-200 dark:hover:bg-dark-base-300">Cancel</button>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-primary-content bg-primary hover:bg-primary-focus">Add Room</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default RoomsPage;
