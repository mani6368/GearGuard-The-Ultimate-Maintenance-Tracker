import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from 'date-fns';
import { useData } from '../context/DataContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CreateRequestModal from '../components/CreateRequestModal';

export default function CalendarView({ setView }) {
    const { requests } = useData();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    // Generate days
    const days = [];
    let day = startDate;
    while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
    }

    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const isCurrentMonth = (day) => isSameMonth(day, monthStart);

    const getRequestsForDay = (day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        return requests.filter(r => r.date === dateStr);
    };

    return (
        <div className="h-full flex flex-col pb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white">Schedule</h2>
                    <p className="text-slate-600 dark:text-slate-400">Preventive maintenance calendar.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"><ChevronLeft size={20} /></button>
                    <span className="font-bold text-lg px-2 w-[180px] text-center text-slate-900 dark:text-white">{format(currentDate, 'MMMM yyyy')}</span>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"><ChevronRight size={20} /></button>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl flex flex-col">
                <div className="grid grid-cols-7 gap-4 mb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <div key={d} className="text-center text-slate-900 dark:text-slate-500 font-medium text-sm uppercase tracking-wider">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 grid-rows-5 gap-4 h-full">
                    {days.map((day, idx) => {
                        const dayRequests = getRequestsForDay(day);
                        const preventive = dayRequests.filter(r => r.type === 'Preventive');
                        const corrective = dayRequests.filter(r => r.type === 'Corrective');
                        const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

                        return (
                            <div key={idx} className={`bg-slate-50 dark:bg-slate-800/30 rounded-xl border ${isToday ? 'border-blue-500/50 bg-blue-500/5' : 'border-slate-200 dark:border-slate-800/50'} p-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors relative group min-h-[100px] flex flex-col`}>
                                <span className={`text-sm font-bold ${!isCurrentMonth(day) ? 'text-slate-400 dark:text-slate-700' : dayRequests.length > 0 ? 'text-slate-900 dark:text-slate-200' : 'text-slate-500 dark:text-slate-600'}`}>
                                    {format(day, 'd')}
                                </span>

                                <div className="mt-2 space-y-1 overflow-y-auto custom-scrollbar">
                                    {preventive.map(req => (
                                        <div key={req.id} className="text-[10px] bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 px-1.5 py-1 rounded truncate border dark:border-blue-500/20" title={req.subject}>
                                            {req.subject}
                                        </div>
                                    ))}
                                    {corrective.map(req => (
                                        <div key={req.id} className="text-[10px] bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-500 px-1.5 py-1 rounded truncate border dark:border-amber-500/10" title={req.subject}>
                                            {req.subject}
                                        </div>
                                    ))}
                                </div>

                                {/* Add Button on Hover */}
                                <button
                                    onClick={() => {
                                        setSelectedDate(format(day, 'yyyy-MM-dd'));
                                        setIsModalOpen(true);
                                    }}
                                    className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                                >
                                    +
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <CreateRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialDate={selectedDate}
            />
        </div>
    );
}
