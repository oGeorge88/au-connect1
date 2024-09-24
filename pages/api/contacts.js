import nextConnect from 'next-connect';
import dbConnect from '../../utils/dbConnect';
import Contact from '../../models/Contact';

const handler = nextConnect();

// GET: Fetch all contacts
handler.get(async (req, res) => {
  await dbConnect();

  try {
    const contacts = await Contact.find({});
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts', error: error.message });
  }
});

// POST: Create a new contact
handler.post(async (req, res) => {
  await dbConnect();

  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
    });

    await newContact.save();
    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create contact', error: error.message });
  }
});

export default handler;
