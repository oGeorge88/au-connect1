import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Connect to the database
  await dbConnect();

  const { username, firstName, lastName, email, password } = req.body;

  // Ensure all fields are provided
  if (!username || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if the user already exists (by username or email)
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] // Check both username and email for uniqueness
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username or email already exists.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword, // Save hashed password
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
}
