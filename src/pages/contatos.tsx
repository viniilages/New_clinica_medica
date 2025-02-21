import React from 'react';
import Layout from '../components/Layout';
import AddContactModal from '../components/AddContactModal';
import { Search, Trash2, CheckCircle, XCircle, Plus, Users } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useGlobalState } from '../context/GlobalContext';

const Contatos: React.FC = () => {
  const { contacts, addContact, removeContact, search, setSearch, isModalOpen, setIsModalOpen } = useGlobalState();

  const handleAddContact = (newContact: { name: string; phone: string; role: string; active: boolean }) => {
    const contactWithId = {
      ...newContact,
      _id: contacts.length + 1,
    };
    addContact(contactWithId);
  };

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
            <Users size={24} className="text-[#A672FF]" />
            <span>Contatos</span>
          </h2>
        </div>

        <div className="flex justify-between items-center mb-4">

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-[#A672FF] text-white px-4 py-2 rounded-lg shadow hover:bg-[#9250e8] transition"
          >
            <Plus size={18} />
            <span>Adicionar novo contato</span>
          </button>

          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A672FF] focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-gray-600 text-left bg-gray-100">
                  <th className="p-3 font-medium">Nome</th>
                  <th className="p-3 font-medium">Telefone</th>
                  <th className="p-3 font-medium text-center">Ativo</th>
                  <th className="p-3 font-medium text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="border-b border-gray-200">

                    <td className="p-3 text-gray-800">
                      <div>
                        <span className="font-medium">{contact.name}</span>
                        <p className="text-sm text-gray-500">{contact.role}</p>
                      </div>
                    </td>

                    <td className="p-3 text-gray-800 whitespace-nowrap">
                      <div className="flex justify-between items-center w-44">
                        <span>{contact.phone}</span>
                        <FaWhatsapp className="text-green-500" size={18} />
                      </div>
                    </td>

                    <td className="p-3 text-center">
                      {contact.active ? <CheckCircle className="text-green-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
                    </td>

                    <td className="p-3 text-center">
                      <button onClick={() => removeContact(contact._id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AddContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddContact={handleAddContact} />
      </div>
    </Layout>
  );
};

export default Contatos;
