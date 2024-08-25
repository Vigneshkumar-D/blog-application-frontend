Here's the updated README file with the added features for user login and registration:

markdown
Copy code
# Blog Application Frontend

## Overview

The Blog Application Frontend is built using React.js for the user interface and interacts with a Node.js backend. This application allows users to view, create, and manage blog posts. The frontend integrates with backend APIs for fetching and submitting data, and is styled to provide a clean and user-friendly experience.

## Features

- **Post List**: Displays a list of blog posts with the ability to view details.
- **Post Detail**: Shows the full content of a selected post along with comments.
- **Create Post**: Form for creating new blog posts.
- **Commenting**: Users can add comments to posts.
- **User Login**: Allows users to log in to their accounts.
- **User Registration**: Enables new users to register for an account.

## Technologies Used

- **React.js**: For building the user interface with class components.
- **Ant Design**: UI component library for styled components like cards.
- **React Router**: For handling routing and navigation within the app.
- **CSS**: For styling the components.

## Project Structure

The project structure is as follows:

- `src/`
  - `components/`: Contains React components for different parts of the application.
    - `PostList/`: Component for listing all posts.
    - `PostDetail/`: Component for viewing a single post and its comments.
    - `CreatePost/`: Component for creating a new post.
    - `Header/`: Component for the application header.
    - `Footer/`: Component for the application footer.
    - `Login/`: Component for user login.
    - `Register/`: Component for user registration.
  - `services/`: Contains API service functions for interacting with the backend.
  - `utils/`: Utility functions and custom hooks.
  - `App.js`: Main component that handles routing.
  - `index.js`: Entry point of the application.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Vigneshkumar-D/blog-application-frontend.git
Navigate to the Project Directory

bash
Copy code
cd your-repository
Install Dependencies

bash
Copy code
npm install
Environment Variables

Create a .env file in the root directory with the following variables:

env
Copy code
REACT_APP_API_BASE_URL=https://api.your-backend.com
REACT_APP_API_BASE_URL: Base URL for the backend API.
Start the Development Server

bash
Copy code
npm start
The application will be available at http://localhost:3000.

## API Integration

The frontend interacts with the following API endpoints:

- **Get All Posts**
  - **Endpoint**: `GET /posts`
  - **Description**: Retrieves a list of all blog posts.

- **Get Post By ID**
  - **Endpoint**: `GET /posts/:id`
  - **Description**: Retrieves a single post by its ID.

- **Create Post**
  - **Endpoint**: `POST /posts`
  - **Description**: Creates a new blog post.

- **Create Comment**
  - **Endpoint**: `POST /posts/:id/comments`
  - **Description**: Adds a new comment to a post.

- **User Login**
  - **Endpoint**: `POST /auth/login`
  - **Description**: Authenticates a user and returns a JWT token.

- **User Registration**
  - **Endpoint**: `POST /auth/register`
  - **Description**: Registers a new user account.

## Styling

The application uses inline styles and CSS classes for styling. Custom styles are defined in the `index.css` file and applied throughout the application.

## Deployment

For deployment, you can use platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Follow their documentation for deploying React applications.
