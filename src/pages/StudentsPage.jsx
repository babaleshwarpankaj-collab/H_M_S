import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { students } from '../lib/mockData';
import PageHeader from '../components/ui/PageHeader';
import Modal from '../components/ui/Modal';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const StudentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddStudent = (e) => {
        e.preventDefault();
        // In a real app, you'd handle form data and API calls here
        toast.success('New student added successfully! (Mock)');
        setIsModalOpen(false);
    };

    return (
        <>
            <PageHeader 
                title="Student Management" 
                buttonText="Add Student"
                onButtonClick={() => setIsModalOpen(true)}
            />
            
            <div className="bg-base-100 dark:bg-dark-base-200 rounded-2xl shadow-lg overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-base-200/50 dark:bg-dark-base-300/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Course</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Contact</th>
                            </tr>
                        </thead>
                        <motion.tbody 
                            className="divide-y divide-base-200 dark:divide-dark-base-300"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {students.map((student) => (
                                <motion.tr 
                                    key={student.id} 
                                    className="hover:bg-base-200/50 dark:hover:bg-dark-base-300/50 transition-colors"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.01, x: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-base-content dark:text-dark-base-content">
                                        <Link to={`/students/${student.id}`} className="text-primary hover:text-primary-focus dark:text-dark-primary dark:hover:text-dark-primary-focus font-semibold">{student.fullName}</Link>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{student.email}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{student.course}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{student.contact}</td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            <Modal title="Add New Student" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Full Name</label>
                        <input type="text" name="fullName" id="fullName" required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Email</label>
                        <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="course" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Course</label>
                        <input type="text" name="course" id="course" required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Contact</label>
                        <input type="tel" name="contact" id="contact" required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div className="flex justify-end pt-4 space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex justify-center py-2 px-4 border border-base-300 dark:border-dark-base-300 shadow-sm text-sm font-medium rounded-lg text-base-content dark:text-dark-base-content bg-base-100 dark:bg-dark-base-200 hover:bg-base-200 dark:hover:bg-dark-base-300">Cancel</button>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-primary-content bg-primary hover:bg-primary-focus">Add Student</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default StudentsPage;
