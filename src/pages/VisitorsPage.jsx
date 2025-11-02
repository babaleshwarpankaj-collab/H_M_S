import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { visitors, students } from '../lib/mockData';
import PageHeader from '../components/ui/PageHeader';
import Modal from '../components/ui/Modal';
import toast from 'react-hot-toast';

const statusStyles = {
    In: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    Out: 'bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const VisitorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddVisitor = (e) => {
        e.preventDefault();
        toast.success('New visitor logged successfully! (Mock)');
        setIsModalOpen(false);
    };

    return (
        <>
            <PageHeader 
                title="Visitor Log"
                buttonText="Log Visitor"
                onButtonClick={() => setIsModalOpen(true)}
            />
            <div className="bg-base-100 dark:bg-dark-base-200 rounded-xl shadow-lg overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-base-200 dark:bg-dark-base-300">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Visitor Name</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Visiting</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Check-in</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Check-out</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <motion.tbody 
                            className="divide-y divide-base-200 dark:divide-dark-base-300"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {visitors.map((visitor) => (
                                <motion.tr key={visitor.id} className="hover:bg-base-200 dark:hover:bg-dark-base-300/50 transition-colors" variants={itemVariants}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content dark:text-dark-base-content">
                                        <Link to={`/visitors/${visitor.id}`} className="text-primary hover:text-primary-focus dark:text-dark-primary dark:hover:text-dark-primary-focus">{visitor.visitorName}</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{visitor.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{new Date(visitor.checkInTime).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{visitor.checkOutTime ? new Date(visitor.checkOutTime).toLocaleString() : 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[visitor.status]}`}>
                                            {visitor.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            <Modal title="Log New Visitor" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleAddVisitor} className="space-y-4">
                    <div>
                        <label htmlFor="visitorName" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Visitor Name</label>
                        <input type="text" name="visitorName" id="visitorName" required className="mt-1 block w-full rounded-md border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="student" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Visiting Student</label>
                        <select id="student" name="student" required className="mt-1 block w-full rounded-md border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                            {students.map(s => <option key={s.id}>{s.fullName}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end pt-4 space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex justify-center py-2 px-4 border border-base-300 dark:border-dark-base-300 shadow-sm text-sm font-medium rounded-md text-base-content dark:text-dark-base-content bg-base-100 dark:bg-dark-base-200 hover:bg-base-200 dark:hover:bg-dark-base-300">Cancel</button>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-content bg-primary hover:bg-primary-focus">Log Visitor</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default VisitorsPage;
