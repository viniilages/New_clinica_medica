import React, { useState } from 'react';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (contact: { name: string; phone: string; role: string; active: boolean }) => void;
}

const AddContactModal: React.FC<AddContactModalProps> = ({ isOpen, onClose, onAddContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [active, setActive] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name || !phone) return;
    onAddContact({ name, phone, role, active });
    setName('');
    setPhone('');
    setRole('');
    setActive(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 transform transition-transform scale-95 animate-[fadeIn_0.2s_ease-in-out_forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Adicionar Novo Contato</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Nome</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A672FF] focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Telefone</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A672FF] focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Função</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A672FF] focus:outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="mb-6 flex items-center space-x-3">
          <label className="text-gray-700 font-medium">Ativo</label>
          <input
            type="checkbox"
            checked={active}
            onChange={() => setActive(!active)}
            className="w-6 h-6 rounded-full border-gray-300 focus:ring-[#A672FF] checked:bg-[#A672FF] transition"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-[#A672FF] text-white rounded-lg shadow hover:bg-[#9250e8] transition"
            onClick={handleSubmit}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
