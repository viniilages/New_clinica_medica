import React from 'react';
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import consultations from '../data/consultations.json';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useGlobalState } from '../context/GlobalContext';

const Agenda: React.FC = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useGlobalState();

  const events = consultations.consultations
    .filter((consultation) => {
      if (!startDate || !endDate) return true; 
      const consultationDate = new Date(consultation.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return consultationDate >= start && consultationDate <= end;
    })
    .map((consultation) => ({
      title: `Consulta com ${consultation.patient}`,
      date: consultation.date,
      color:
        consultation.status === 'scheduled'
          ? '#A672FF'
          : consultation.status === 'completed'
          ? '#00C49F'
          : '#FF6B6B',
    }));

  return (
    <Layout>
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
            <CalendarIcon size={24} className="text-[#A672FF]" />
            <span>Agenda</span>
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtrar por data</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-gray-600 font-medium mb-1">Data inicial</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A672FF] focus:outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Data final</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A672FF] focus:outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
          <div className="overflow-x-auto ">
            <Calendar events={events}/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
