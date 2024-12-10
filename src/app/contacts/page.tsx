"use client";

import ContactCard from "@/components/ContactCard";
import ContactModal from "@/components/ContactModal";
import FloatingButton from "@/components/FloatingButton";
import { Contact } from "@/lib/models/contact";
import { useState, useEffect } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch contacts from the API when the component mounts
  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = () => {
    setSelectedContact(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteContact = async (id: string) => {
    console.log('id', id);
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  const handleSaveContact = async (contact: Contact) => {
    if (isEditing && selectedContact?.id) {
      // Update existing contact
      try {
        const response = await fetch(`/api/contacts/${selectedContact.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
        const updatedContact = await response.json();
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === updatedContact.id ? updatedContact : contact
          )
        );
      } catch (error) {
        console.error("Error updating contact", error);
      }
    } else {
      // Create new contact
      try {
        await fetch("/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
        // const newContact = await response.json();
        await fetchContacts();
        // setContacts((prev) => [...prev, newContact]);
      } catch (error) {
        console.error("Error adding contact", error);
      }
    }
    setIsModalOpen(false);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mis Contactos</h1>
      <input
        type="text"
        placeholder="Buscar contactos..."
        className="w-full p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={() => handleEditContact(contact)}
            onDelete={() => handleDeleteContact(contact.id)}
          />
        ))}
      </div>
      <FloatingButton onClick={handleAddContact} />
      {isModalOpen && (
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contact={selectedContact}
          isEditing={isEditing}
          onSave={handleSaveContact}
        />
      )}
    </div>
  );
}
