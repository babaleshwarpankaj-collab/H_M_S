import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import PageHeader from '../components/ui/PageHeader';
import Modal from '../components/ui/Modal';
import { Loader, Edit, Trash2 } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null); // For editing

    const fetchStudents = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Failed to fetch students.');
            console.error(error);
        } else {
            setStudents(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const openAddModal = () => {
        setCurrentStudent(null);
        setIsModalOpen(true);
    };

    const openEditModal = (student) => {
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
            setLoading(true);
            const { error } = await supabase.from('students').delete().eq('id', studentId);
            if (error) {
                toast.error(`Failed to delete student: ${error.message}`);
            } else {
                toast.success('Student deleted successfully.');
                fetchStudents(); // Refreshes the list
            }
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        const formData = new FormData(e.target);
        const studentData = Object.fromEntries(formData.entries());

        const dataToSubmit = {
            full_name: studentData.fullName,
            email: studentData.email,
            course: studentData.course,
            contact: studentData.contact,
        };

        let error;
        if (currentStudent) {
            // Update existing student
            const { error: updateError } = await supabase.from('students').update(dataToSubmit).eq('id', currentStudent.id);
            error = updateError;
        } else {
            // Insert new student
            const { error: insertError } = await supabase.from('students').insert([dataToSubmit]);
            error = insertError;
        }

        if (error) {
            toast.error(`Operation failed: ${error.message}`);
        } else {
            toast.success(`Student ${currentStudent ? 'updated' : 'added'} successfully!`);
            setIsModalOpen(false);
            fetchStudents();
        }
        setFormLoading(false);
    };

    return (
        <>
            <PageHeader
                title="Student Management"
                buttonText="Add Student"
                onButtonClick={openAddModal}
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
                                <th className="px-6 py-4 text-right text-xs font-semibold text-base-content-secondary dark:text-dark-base-content-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            className="divide-y divide-base-200 dark:divide-dark-base-300"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-10"><Loader className="mx-auto animate-spin" /></td></tr>
                            ) : students.length > 0 ? (
                                students.map((student) => (
                                    <motion.tr
                                        key={student.id}
                                        className="hover:bg-base-200/50 dark:hover:bg-dark-base-300/50 transition-colors"
                                        variants={itemVariants}
                                    >
                                        <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-base-content dark:text-dark-base-content">
                                            <Link to={`/students/${student.id}`} className="text-primary hover:text-primary-focus dark:text-dark-primary dark:hover:text-dark-primary-focus font-semibold">{student.full_name}</Link>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{student.email}</td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{student.course}</td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-base-content-secondary dark:text-dark-base-content-secondary">{student.contact}</td>
                                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openEditModal(student)} className="p-2 text-primary/70 hover:text-primary dark:text-dark-primary/70 dark:hover:text-dark-primary transition-colors">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(student.id)} className="p-2 text-red-500/70 hover:text-red-500 dark:text-red-500/70 dark:hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="text-center py-10 text-base-content-secondary">No students found. Add one to get started!</td></tr>
                            )}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            <Modal title={currentStudent ? 'Edit Student' : 'Add New Student'} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Full Name</label>
                        <input type="text" name="fullName" id="fullName" defaultValue={currentStudent?.full_name || ''} required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Email</label>
                        <input type="email" name="email" id="email" defaultValue={currentStudent?.email || ''} required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="course" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Course</label>
                        <input type="text" name="course" id="course" defaultValue={currentStudent?.course || ''} required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-base-content-secondary dark:text-dark-base-content-secondary">Contact</label>
                        <input type="tel" name="contact" id="contact" defaultValue={currentStudent?.contact || ''} required className="mt-1 block w-full rounded-lg border-base-300 dark:border-dark-base-300 bg-base-100 dark:bg-dark-base-200 text-base-content dark:text-dark-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                    </div>
                    <div className="flex justify-end pt-4 space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex justify-center py-2 px-4 border border-base-300 dark:border-dark-base-300 shadow-sm text-sm font-medium rounded-lg text-base-content dark:text-dark-base-content bg-base-100 dark:bg-dark-base-200 hover:bg-base-200 dark:hover:bg-dark-base-300">Cancel</button>
                        <button type="submit" disabled={formLoading} className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-primary-content bg-primary hover:bg-primary-focus disabled:opacity-50">
                            {formLoading && <Loader className="animate-spin h-4 w-4 mr-2" />}
                            {currentStudent ? 'Save Changes' : 'Add Student'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default StudentsPage;
