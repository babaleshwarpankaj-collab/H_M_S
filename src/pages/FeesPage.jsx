import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fees, students } from '../lib/mockData';
import PageHeader from '../components/ui/PageHeader';
import Modal from '../components/ui/Modal';
import toast from 'react-hot-toast';

const statusStyles = {
    Paid: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    Due: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
    Overdue: 'bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const FeesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddFee = (e) => {
        e.preventDefault();
        toast.success('New fee record added! (Mock)');
        setIsModalOpen(false);
    };

    return (
        <>
            <PageHeader 
                title="Fee Management"
                buttonText="Add Fee Record"
                onButtonClick={() => setIsModalOpen(true)}
            />
            <div className="bg-base-100 dark:bg-dark-base-200 rounded-xl shadow-lg overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-base-200 dark:bg-dark-base-300">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <motion.tbody 
                            className="divide-y divide-base-200 dark:divide-dark-base-300"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {fees.map((fee) => (
                                <motion.tr key={fee.id} className="hover:bg-base-200 dark:hover:bg-dark-base-300/50 transition-colors" variants={itemVariants}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content dark:text-dark-base-content">
                                        <Link to={`/fees/${fee.id}`} className="text-primary hover:text-primary-focus dark:text-dark-primary dark:hover:text-dark-primary-focus">{fee.studentName}</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{fee.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{new Date(fee.dueDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[fee.status]}`}>
                                            {fee.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </div>
            <Modal title="Add Fee Record" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleAddFee} className="space-y-4">
                    <div>
                        <label htmlFor="student" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Student</label>
                        <select id="student" name="student" required className="mt-1 block w-full rounded-md border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                            {students.map(s => <option key={s.id}>{s.fullName}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Amount ($)</label>
                        <input type="number" name="amount" id="amount" step="0.01" required className="mt-1 block w-full rounded-md border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Due Date</label>
                        <input type="date" name="dueDate" id="dueDate" required className="mt-1 block w-full rounded-md border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div className="flex justify-end pt-4 space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex justify-center py-2 px-4 border border-base-300 dark:border-dark-base-300 shadow-sm text-sm font-medium rounded-md text-base-content dark:text-dark-base-content bg-base-100 dark:bg-dark-base-200 hover:bg-base-200 dark:hover:bg-dark-base-300">Cancel</button>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-content bg-primary hover:bg-primary-focus">Add Record</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default FeesPage;
