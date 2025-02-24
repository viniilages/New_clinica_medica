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

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className=" bg-gray-50 min-h-screen">
        
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
            <Users size={24} className="text-[#A672FF]" />
            <span>Contatos</span>
          </h2>
        </div>

        <div className="pl-4 p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-[#A672FF] text-white px-3 sm:px-4 py-2 rounded-lg shadow hover:bg-[#9250e8] transition"
          >
            <Plus size={18} />
            <span className="text-sm sm:text-base">Adicionar novo contato</span>
          </button>

          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A672FF] focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className=" pl-2 bg-white shadow-md rounded-lg">
          <div className="  overflow-x-auto pl-3">
            <table className="w-full border-collapse pl-2">
              <thead>
                <tr className="text-gray-600 text-left bg-gray-100">
                  <th className="py-2 sm:py-3 font-medium">Nome</th>
                  <th className="py-2 sm:py-3 font-medium flex justify-center">Telefone</th>
                  <th className="py-2 sm:py-3 font-medium pr-3 ">Ativo</th>
                  <th className="py-2 sm:py-3 font-medium flex justify-center ">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="border-b border-gray-200">
                    <td className="py-2 sm:py-3 text-gray-800">
                      <div>
                        <span className="font-medium">{contact.name}</span>
                        <p className="text-xs sm:text-sm text-gray-500">{contact.role}</p>
                      </div>
                    </td>

                    <td className="py-10 text-gray-800 whitespace-nowrap flex justify-center">
                      <div className="flex justify-around items-center">
                        <span className="">{contact.phone}</span>
                        <FaWhatsapp className="text-green-500 pl-1 " size={18} />
                      </div>
                    </td>

                    <td className="py-2 sm:py-3 text-center pl-3">
                      {contact.active ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <XCircle className="text-red-500" size={20} />
                      )}
                    </td>

                    <td className="py-2 sm:py-3 text-center">
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

        <AddContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddContact={handleAddContact}
        />
      </div>
    </Layout>
  );
};

export default Contatos;
