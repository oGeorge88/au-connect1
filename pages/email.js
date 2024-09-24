// pages/email.js
"use client"; // Use client component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContacts } from '../utils/contacts'; // Import contacts utility to fetch stored contacts
import {
    getEmails,
    addEmail,
    updateEmail,
    deleteEmail,
} from '../utils/emailStorage'; // Import email storage utilities
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Email() {
    const [contacts, setContacts] = useState([]); // State to store contacts for suggestions
    const [emails, setEmails] = useState([]); // State to store emails
    const [recipient, setRecipient] = useState(''); // Recipient email input
    const [subject, setSubject] = useState(''); // Subject input
    const [body, setBody] = useState(''); // Email body input
    const [isSending, setIsSending] = useState(false); // Loading state for sending email
    const [showCompose, setShowCompose] = useState(false); // Control compose form visibility
    const [selectedEmail, setSelectedEmail] = useState(null); // State for selected email to view or edit
    const [isEditing, setIsEditing] = useState(false); // State for editing mode

    // Fetch contacts and emails on component mount
    useEffect(() => {
        async function fetchContacts() {
            const fetchedContacts = await getContacts(); // Fetch stored contacts
            setContacts(fetchedContacts);
        }

        // Load emails from local storage
        const storedEmails = getEmails();
        setEmails(storedEmails);

        fetchContacts();
    }, []);

    // Handle composing a new email
    const handleCompose = () => {
        setShowCompose(true); // Show the compose form
        setRecipient(''); // Reset recipient field
        setSubject(''); // Reset subject field
        setBody(''); // Reset body field
        setIsEditing(false); // Reset editing mode
        setSelectedEmail(null); // Reset selected email
    };

    // Handle sending a new email
    const handleSendEmail = () => {
        if (!recipient || !subject || !body) {
            alert('Please fill in all fields before sending.');
            return;
        }

        setIsSending(true);

        // Simulate sending email
        setTimeout(() => {
            if (isEditing) {
                // If editing, update the existing email
                const updatedEmail = { ...selectedEmail, recipient, subject, body };
                updateEmail(updatedEmail);
                setEmails((prevEmails) =>
                    prevEmails.map((email) =>
                        email.id === selectedEmail.id ? updatedEmail : email
                    )
                );
                alert(`Email updated successfully.`);
            } else {
                // Otherwise, add a new email
                const newEmail = { id: Date.now(), recipient, subject, body, date: new Date().toISOString().split('T')[0] };
                addEmail(newEmail); // Save email to local storage
                setEmails([newEmail, ...emails]);
                alert(`Email sent successfully to ${recipient}`);
            }
            setIsSending(false);
            setShowCompose(false); // Hide compose form after sending
        }, 1000);
    };

    // Handle selecting an email to view details
    const handleSelectEmail = (email) => {
        setSelectedEmail(email);
    };

    // Handle editing an email
    const handleEditEmail = (email) => {
        setRecipient(email.recipient);
        setSubject(email.subject);
        setBody(email.body);
        setIsEditing(true);
        setShowCompose(true);
        setSelectedEmail(email);
    };

    // Handle deleting an email
    const handleDeleteEmail = (id) => {
        if (confirm("Are you sure you want to delete this email?")) {
            deleteEmail(id); // Delete email from local storage
            setEmails(emails.filter((email) => email.id !== id));
            setSelectedEmail(null);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
            <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold text-center text-gray-900">Email Communication</h1>

                {/* Compose or Edit Email Form */}
                {showCompose && (
                    <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                        <h2 className="text-lg font-bold text-indigo-600">{isEditing ? "Edit Email" : "Compose New Email"}</h2>
                        
                        {/* Recipient Input with Suggestions */}
                        <input
                            type="text"
                            placeholder="Recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full mt-2 p-2 border rounded"
                            list="contactSuggestions" // Data list for suggestions
                        />
                        <datalist id="contactSuggestions">
                            {contacts.map((contact) => (
                                <option key={contact.id} value={contact.email}>
                                    {contact.first} {contact.last}
                                </option>
                            ))}
                        </datalist>
                        
                        {/* Subject Input */}
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full mt-2 p-2 border rounded"
                        />
                        
                        {/* Email Body Input */}
                        <textarea
                            placeholder="Body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full mt-2 p-2 border rounded"
                        ></textarea>

                        {/* Send and Cancel Buttons */}
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={handleSendEmail}
                                disabled={isSending}
                                className="btn btn-primary"
                            >
                                {isSending ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : isEditing ? 'Save Changes' : 'Send Email'}
                            </button>
                            <button
                                onClick={() => setShowCompose(false)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* List of Sent Emails */}
                <div className="space-y-6">
                    {emails.map((email) => (
                        <div key={email.id} className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                            <h2 className="text-lg font-bold text-indigo-600">{email.subject}</h2>
                            <p className="text-sm text-gray-500">To: {email.recipient}</p>
                            <p className="text-sm text-gray-500">Date: {email.date}</p>
                            <button
                                onClick={() => handleSelectEmail(email)}
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>

                {/* Selected Email Details */}
                {selectedEmail && (
                    <div className="p-4 border rounded-lg shadow-sm bg-gray-50 mt-6">
                        <h2 className="text-lg font-bold text-indigo-600">{selectedEmail.subject}</h2>
                        <p className="text-sm text-gray-500">To: {selectedEmail.recipient}</p>
                        <p className="text-sm text-gray-500">Date: {selectedEmail.date}</p>
                        <p className="mt-4 text-gray-700">{selectedEmail.body}</p>
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={() => handleEditEmail(selectedEmail)}
                                className="btn btn-primary"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteEmail(selectedEmail.id)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setSelectedEmail(null)}
                                className="btn btn-secondary"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Compose New Email Button */}
                {!showCompose && (
                    <button onClick={handleCompose} className="mt-6 btn btn-primary">
                        Compose New Email
                    </button>
                )}

                {/* Go Back to Homepage */}
                <div className="flex justify-center mt-6">
                    <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                        Go back to homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}
