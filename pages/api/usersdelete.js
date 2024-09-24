// pages/api/usersdelete.js
import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect(); // Connect to the database

  if (method === 'DELETE') {
    const { email } = req.body; // Get the email from the request body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      // Find and delete the user by email
      const deletedUser = await User.findOneAndDelete({ email });

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
