import React from 'react';
import Layout from '../components/Layout';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Home as HomeIcon } from 'lucide-react';
import contactsData from '../data/contacts.json';
import consultationsData from '../data/consultations.json';
import ClientOnly from '@/components/ClientOnly';
import { useGlobalState } from '../context/GlobalContext';

const Home: React.FC = () => {
  const { selectedMonth, setSelectedMonth } = useGlobalState();

  const filteredConsultations = consultationsData.consultations.filter((consultation) => {
    const consultationDate = new Date(consultation.date);
    return consultationDate.getMonth() + 1 === selectedMonth;
  });

  const aniversariantesMes = contactsData.contacts.filter((contact) => {
    const birthDate = new Date(contact.birthDate);
    return birthDate.getMonth() + 1 === selectedMonth;
  });

  const atendimentosPorMedico = [
    { name: 'Médico A', value: filteredConsultations.filter((c) => c.doctor === 5).length },
    { name: 'Médico B', value: filteredConsultations.filter((c) => c.doctor === 11).length },
    { name: 'Médico C', value: filteredConsultations.filter((c) => c.doctor === 16).length },
  ];

  const diasMaisMovimentados = filteredConsultations.reduce((acc, consultation) => {
    const date = new Date(consultation.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {} as Record<string, number>);

  const diasMaisMovimentadosData = Object.entries(diasMaisMovimentados).map(([day, atendimentos]) => ({
    day,
    atendimentos,
  }));

  const numeroAtendimentosMes = filteredConsultations.length;

  return (
    <Layout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
            <HomeIcon size={24} className="text-[#A672FF]" />
            <span>Visão Geral</span>
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Selecione o mês:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A672FF] focus:outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(2023, month - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700">Atendimentos no Mês</h2>
            <p className="text-4xl font-bold text-[#A672FF]">{numeroAtendimentosMes}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 ">Atendimentos por Médico</h2>
            <ClientOnly>
              <div className="w-full md:w-[350px] h-[260px] mx-auto ">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={atendimentosPorMedico} cx="50%" cy="50%" outerRadius={80} fill="#A672FF" dataKey="value" label>
                      {atendimentosPorMedico.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#A672FF', '#6B46C1', '#D53F8C'][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ClientOnly>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700">Dias Mais Movimentados</h2>
            <ClientOnly>
              <div className="w-full md:w-[350px] h-[250px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={diasMaisMovimentadosData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="atendimentos" fill="#A672FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ClientOnly>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Aniversariantes do Mês</h2>
          <ul className="mt-4">
            {aniversariantesMes.map((contact) => (
              <li key={contact._id} className="flex justify-between p-3 border-b border-gray-200">
                <span className="text-gray-800 font-medium mr-0.5">{contact.name}</span>
                <span className="text-gray-500">{new Date(contact.birthDate).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
