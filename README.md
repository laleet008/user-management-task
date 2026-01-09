# User Management Dashboard

A production-quality User Management Dashboard built with React, TypeScript, and Vite.

## Tech Stack

- **Vite**: Project setup and build tool.
- **React + TypeScript**: Core UI library and type safety.
- **Redux Toolkit + RTK Query**: State management and API data fetching.
- **Ant Design**: UI component library.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Features

- **User List**: View all users in a sortable table with search functionality.
- **Add User**: Create new users with validation.
- **Edit User**: Update existing user details.
- **Delete User**: Remove users with confirmation.
- **View Details**: Inspect full user profile in a drawer.
- **Optimistic UI**: Immediate UI updates for better user experience.

## Local Setup Guide

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm** (Package manager)

### Installation Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/user-management.git
    cd user-management
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Run the development server**

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:5173`.

4.  **Build for production**
    To create a production-ready build:
    ```bash
    pnpm build
    ```
