import React from 'react';


interface Contact {
  _id: number;
  name: string;
  phone: string;
  active: boolean;
  role: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Função</th>
            <th>Telefone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.role === 'doctor' ? 'Médico' : 'Paciente'}</td>
              <td>{contact.phone}</td>
              <td>{contact.active ? 'Ativo' : 'Inativo'}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(contact._id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;