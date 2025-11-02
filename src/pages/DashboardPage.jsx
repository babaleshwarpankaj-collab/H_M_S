import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import { Users, BedDouble, Wrench, CircleDollarSign } from 'lucide-react';
import { students, rooms, maintenanceRequests, fees } from '../lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

function DashboardPage() {
    const totalStudents = students.length;
    const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
    const occupancyRate = rooms.length > 0 ? ((occupiedRooms / rooms.length) * 100).toFixed(0) : 0;
    const pendingMaintenance = maintenanceRequests.filter(m => m.status === 'Pending').length;
    const overdueFees = fees.filter(f => f.status === 'Overdue').length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.h1 
                className="text-3xl font-bold text-base-content dark:text-dark-base-content mb-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
            >
                Dashboard Overview
            </motion.h1>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <StatCard title="Total Students" value={totalStudents} icon={<Users />} color="bg-blue-500" />
                <StatCard title="Occupancy Rate" value={`${occupancyRate}%`} icon={<BedDouble />} color="bg-green-500" />
                <StatCard title="Pending Maintenance" value={pendingMaintenance} icon={<Wrench />} color="bg-yellow-500" />
                <StatCard title="Overdue Fees" value={overdueFees} icon={<CircleDollarSign />} color="bg-red-500" />
            </motion.div>

            <motion.div 
                className="mt-8 bg-base-100 dark:bg-dark-base-200 p-6 rounded-xl shadow-lg transition-colors"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{delay: 0.5}}
            >
                 <h2 className="text-xl font-semibold text-base-content dark:text-dark-base-content mb-4">Recent Activity</h2>
                 <p className="text-base-content-secondary dark:text-dark-base-content-secondary">Recent activity feed will be displayed here.</p>
            </motion.div>
        </motion.div>
    );
}

export default DashboardPage;
