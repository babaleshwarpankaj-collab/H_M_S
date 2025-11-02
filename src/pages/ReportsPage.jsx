import React from 'react';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';

const ReportsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="text-3xl font-bold text-base-content dark:text-dark-base-content mb-6">Generate Reports</h1>
            <div className="bg-base-100 dark:bg-dark-base-200 p-8 rounded-xl shadow-lg transition-colors">
                <p className="text-base-content-secondary dark:text-dark-base-content-secondary mb-6">Select a report to download. (Functionality to be implemented)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center w-full px-4 py-3 font-medium text-primary-content bg-primary rounded-lg hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-base-200 transition-colors">
                        <FileDown className="w-5 h-5 mr-2" />
                        Occupancy Report
                    </button>
                     <button className="flex items-center justify-center w-full px-4 py-3 font-medium text-primary-content bg-primary rounded-lg hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-base-200 transition-colors">
                        <FileDown className="w-5 h-5 mr-2" />
                        Fee Collection Report
                    </button>
                     <button className="flex items-center justify-center w-full px-4 py-3 font-medium text-primary-content bg-primary rounded-lg hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-base-200 transition-colors">
                        <FileDown className="w-5 h-5 mr-2" />
                        Visitor Log Report
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ReportsPage;
