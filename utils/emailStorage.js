// utils/emailStorage.js

const EMAIL_STORAGE_KEY = 'sent_emails';

// Retrieve emails from local storage
export function getEmails() {
  if (typeof window !== 'undefined') {
    const storedEmails = localStorage.getItem(EMAIL_STORAGE_KEY);
    return storedEmails ? JSON.parse(storedEmails) : [];
  }
  return [];
}

// Save emails to local storage
export function saveEmails(emails) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(emails));
  }
}

// Add a new email to local storage
export function addEmail(email) {
  const emails = getEmails();
  emails.unshift(email);
  saveEmails(emails);
}

// Update an existing email in local storage
export function updateEmail(updatedEmail) {
  const emails = getEmails();
  const emailIndex = emails.findIndex((email) => email.id === updatedEmail.id);
  if (emailIndex !== -1) {
    emails[emailIndex] = updatedEmail;
    saveEmails(emails);
  }
}

// Delete an email from local storage
export function deleteEmail(emailId) {
  const emails = getEmails();
  const filteredEmails = emails.filter((email) => email.id !== emailId);
  saveEmails(filteredEmails);
}
