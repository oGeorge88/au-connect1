// pages/contacts.js
"use client"; // Use client component

import { useState, useEffect } from "react";
import Link from 'next/link';
import { getContacts, createContact, updateContact, deleteContact, getContact } from "../utils/contacts"; // Import all utility functions

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Fetch contacts on component mount
  useEffect(() => {
    async function fetchContacts() {
      const contacts = await getContacts(query);
      setContacts(contacts);
      setLoading(false);
    }
    fetchContacts();
  }, [query]);

  // Handle contact creation with picture URL
  const handleCreate = async () => {
    const firstName = prompt("Enter first name:");
    const lastName = prompt("Enter last name:");
    const email = prompt("Enter email:");
    const phone = prompt("Enter phone number:");
    const picture = prompt("Enter picture URL:");  // New field for picture URL
    if (firstName && lastName) {
      const newContact = await createContact({ first: firstName, last: lastName, email, phone, picture });
      setContacts([newContact, ...contacts]);
    }
  };

  // Handle contact update
  const handleUpdate = async (id) => {
    try {
      const contact = await getContact(id); // Fetch existing contact details
      const firstName = prompt("Enter first name:", contact.first);
      const lastName = prompt("Enter last name:", contact.last);
      const email = prompt("Enter email:", contact.email);
      const phone = prompt("Enter phone number:", contact.phone);
      const picture = prompt("Enter picture URL:", contact.picture);  // Update picture URL
      if (firstName && lastName) {
        const updatedContact = await updateContact(id, { first: firstName, last: lastName, email, phone, picture });
        setContacts((prevContacts) =>
          prevContacts.map((c) => (c.id === id ? updatedContact : c))
        );
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact. Please try again.");
    }
  };

  // Handle contact deletion
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(id);
      setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id));
    }
  };

  // Handle search query change
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">Contact Management</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="border rounded p-2"
            placeholder="Search contacts..."
            value={query}
            onChange={handleSearch}
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" onClick={handleCreate}>
            Add Contact
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-6 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex items-center">
                  <img 
                    src={contact.picture || "https://via.placeholder.com/150"} // Default picture if none provided
                    alt={`${contact.first} ${contact.last}`}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-indigo-600">{contact.first} {contact.last}</h2>
                    <p className="text-gray-700">Email: {contact.email || "Not provided"}</p>
                    <p className="text-gray-700">Phone: {contact.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button 
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    onClick={() => handleUpdate(contact.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                  <a
                    href={`mailto:${contact.email}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Send Email
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6">
          <Link href="/" className="text-indigo-600 hover:text-indigo-500">
            Go back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
