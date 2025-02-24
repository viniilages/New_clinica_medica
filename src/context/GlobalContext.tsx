import React, { createContext, useState, useContext } from 'react';
import contactsList from '../data/contacts.json';

interface Contact {
  _id: number;
  name: string;
  phone: string;
  role: string;
  active: boolean;
}

interface GlobalState {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;

  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;

  search: string;
  setSearch: (value: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;

  contacts: Contact[];
  addContact: (contact: Contact) => void;
  removeContact: (id: number) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  

  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [contacts, setContacts] = useState<Contact[]>(contactsList.contacts);

  const addContact = (contact: Contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const removeContact = (id: number) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        search,
        setSearch,
        isModalOpen,
        setIsModalOpen,
        contacts,
        addContact,
        removeContact,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState deve ser usado dentro de um GlobalProvider');
  }
  return context;
};
