# Assessment Project Documentation

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Authentication](#authentication)
- [User Management](#user-management)
- [Search Functionality](#search-functionality)
- [Navigation and Pagination](#navigation-and-pagination)
- [Local Storage Usage](#local-storage-usage)
- [External Services](#external-services)
- [How to Run the Project](#how-to-run-the-project)

## Overview

This project was built with Next.js and SCSS. The main features include user login, logout, viewing user details, searching and filtering users, and navigating through paginated user data. The project uses mock data of 500 records for demonstration purposes.

## Features

- **Authentication**: Login and logout functionality using dummy email and password.
- **User Management**: View all users, search users, filter users, and navigate through user pages.
- **Local Storage**: Persist user data and login state.
- **External Services**: `https://www.jsongenerator.io/` to create mock data, `https://apimocha.com/` to create endpoints to fetch mock data.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **SCSS**: CSS preprocessor for enhanced styling capabilities.

## Authentication

- **Login**: Users can log in using a dummy email and password. The username is stored in local storage to keep track of the login state.
- **Logout**: Clicking the logout button clears the user data and username from local storage, effectively logging the user out.

## User Management

- **User List**: Fetches all users from a mock external service and displays them in a table format.
- **View Details**: Clicking "View Details" in a user row stores the user info in local storage and navigates to `/users/${username}` page.
- **User Actions**: On the user details page, clicking the "Activate" and "Blacklist" buttons changes them to "Deactivate" and "Whitelist" respectively, simulating an updated user state.

## Search Functionality

- **Search**: Users can search through all the users in the table using the search bar in the header.
- **Filter**: The table can be filtered using the form when a table header column is clicked.

## Navigation and Pagination

- **Pagination**: Users can navigate through each page in the table.
- **Page Size Selection**: Users can select the number of entries to be displayed per page.
- **Docs**: Clicking on the Docs link in the header navigates the user to `https://blog.lendsqr.com/how-to-use-lendsqr-apis-to-power-your-loan-app/`.

## Local Storage Usage

- **Persisting Data**: User data is persisted in local storage when navigating to the `/users/${username}` page to ensure data is retained on page refresh.
- **Login State**: The username is stored in local storage to manage the login state.

## How to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/pdev6373/lendsqr-fe-test.git .
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Project**:

   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`

## Conclusion

This project showcases basic user authentication and management functionalities built with Next.js and SCSS. It includes the ability to log in and out, view and search users, and navigate through paginated user data while maintaining the state using local storage. For more information, refer to the code within the repository.
