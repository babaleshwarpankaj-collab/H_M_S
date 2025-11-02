import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { maintenanceRequests, students } from '../lib/mockData';
import PageHeader from '../components/ui/PageHeader';
import Modal from '../components/ui/Modal';
import toast from 'react-hot-toast';

const statusStyles = {
    Pending: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
    'In Progress': 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    Resolved: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const MaintenancePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddRequest = (e) => {
        e.preventDefault();
        toast.success('New maintenance request submitted! (Mock)');
        setIsModalOpen(false);
    };

    return (
        <>
            <PageHeader
                title="Maintenance Requests"
                buttonText="New Request"
                onButtonClick={() => setIsModalOpen(true)}
            />
            <div className="bg-base-100 dark:bg-dark-base-200 rounded-xl shadow-lg overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-base-200 dark:bg-dark-base-300">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Issue</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Room No.</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Reported By</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <motion.tbody 
                            className="divide-y divide-base-200 dark:divide-dark-base-300"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {maintenanceRequests.map((req) => (
                                <motion.tr key={req.id} className="hover:bg-base-200 dark:hover:bg-dark-base-300/50 transition-colors" variants={itemVariants}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content dark:text-dark-base-content">
                                        <Link to={`/maintenance/${req.id}`} className="text-primary hover:text-primary-focus dark:text-dark-primary dark:hover:text-dark-primary-focus">{req.issue}</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{req.roomNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{req.reportedBy}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{new Date(req.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[req.status]}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            <Modal title="New Maintenance Request" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleAddRequest} className="space-y-4">
                    <div>
                        <label htmlFor="issue" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Issue Description</label>
                        <input type="text" name="issue" id="issue" required className="mt-1 block w-full rounded-md border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="roomNumber" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Room Number</label>
                        <input type="number" name="roomNumber" id="roomNumber" required className="mt-1 block w-full rounded-md border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                     <div>
                        <label htmlFor="reportedBy" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Reported By</label>
                        <select id="reportedBy" name="reportedBy" required className="mt-1 block w-full rounded-md border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                            {students.map(s => <option key={s.id}>{s.fullName}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end pt-4 space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex justify-center py-2 px-4 border border-base-300 dark:border-dark-base-300 shadow-sm text-sm font-medium rounded-md text-base-content dark:text-dark-base-content bg-base-100 dark:bg-dark-base-200 hover:bg-base-200 dark:hover:bg-dark-base-300">Cancel</button>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-content bg-primary hover:bg-primary-focus">Submit Request</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default MaintenancePage;
