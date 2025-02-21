import React, { createContext, useState, useContext, ReactNode } from 'react';
import contactsData from '../data/contacts.json'

interface Contact {
  _id: number;
  name: string;
  phone: string;
  active: boolean;
  role: string;
}

interface ContactContextType {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  removeContact: (id: number) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(contactsData.contacts);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact._id !== id));
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, removeContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};