
# AU Connect - README

## Project Overview

AU Connect is a full-stack web application designed to facilitate communication and collaboration among students at Assumption University. The application includes user authentication, contact management, and email functionalities. Built with Next.js on the front end and Node.js/Express on the back end, it connects to a MongoDB database. Our goal is to create a platform that enhances communication within the university community and supports collaborative efforts among students.

## Objective

The objective of this project is to create a user-friendly platform that allows students to create accounts, manage contacts, and send emails efficiently. The application aims to enhance communication within the university community and provide a reliable tool for academic collaboration.

## Code Repository

You can access the complete code repository for the AU Connect project on GitHub:

[AU Connect Repository](https://github.com/ogeorge88/au-connect)

The repository includes all source code, components, and documentation necessary for understanding and running the application. It follows a structured directory organization to ensure easy navigation.

## Complete UI for All Necessary Operations

The UI is designed to provide an intuitive user experience with the following features:

- **Sign Up**: Users can create a new account with validation checks.
- **Sign In**: Users can log into their accounts securely.
- **Contact Management**: Users can add, view, edit, and delete contacts seamlessly.
- **Email Functionality**: Users can send and manage emails, including a drafts feature.

![UI Screenshot](path/to/your/ui-screenshot.png) <!-- Replace with actual image path -->

### Accessibility Considerations

- All forms include labels for screen readers.
- The application supports keyboard navigation throughout the UI.
- Color contrast is optimized for readability.

## CRUD Data Models (30 Marks)

The application implements three key data models with full CRUD (Create, Read, Update, Delete) operations:

1. **User Model**:
   - **Fields**: `username`, `firstName`, `lastName`, `email`, `password`.
   - **Operations**:
     - **Create**: New users can register via the Sign Up form.
     - **Read**: Users can view their profile and other users (if authorized).
     - **Update**: Users can update their profile information.
     - **Delete**: Users can delete their accounts.

2. **Contact Model**:
   - **Fields**: `userId`, `contactName`, `contactEmail`, `phoneNumber`.
   - **Operations**:
     - **Create**: Users can add new contacts.
     - **Read**: Users can view their contacts list.
     - **Update**: Users can edit existing contacts.
     - **Delete**: Users can remove contacts.

3. **Email Model**:
   - **Fields**: `senderId`, `recipientId`, `subject`, `message`, `timestamp`.
   - **Operations**:
     - **Create**: Users can send new emails.
     - **Read**: Users can view their sent and received emails.
     - **Update**: Users can draft and modify emails before sending.
     - **Delete**: Users can delete emails from their inbox/sent items.

### Additional Features

- **Error Handling**: The application includes robust error handling for form submissions and API requests.
- **Responsive Design**: The UI is fully responsive, ensuring a seamless experience on both desktop and mobile devices.

## Deployment

The application is deployed on Vercel and can be accessed through the following link:

[AU Connect Live Demo](https://au-connect.vercel.app)

### Deployment Steps
1. **Clone the repository**: 
   ```bash
   git clone https://github.com/ogeorge88/au-connect.git
   ```
2. **Install dependencies**: 
   ```bash
   pnpm install
   ```
3. **Set environment variables**: Create a `.env.local` file in the root directory and add your MongoDB connection string and any other necessary environment variables.
4. **Run the development server**: 
   ```bash
   pnpm run dev
   ```
5. **Build and deploy**:
   - For Vercel, you can connect your GitHub repository, and it will automatically deploy on every push.

## Testing

To ensure the reliability of the application, unit tests and integration tests are implemented for critical functionalities. This ensures that the application behaves as expected and helps catch any regressions during development.

## Conclusion

The AU Connect project demonstrates the ability to create a full-stack application with essential features and a focus on user experience. It successfully implements CRUD operations for three data models and is deployed for public access. For further inquiries or discussions, feel free to reach out to us at **u6520283@au.edu** or **u6520051@au.edu**.

```

Let me know if there's anything else you'd like to add or modify!