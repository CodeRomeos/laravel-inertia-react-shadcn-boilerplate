# CMS Built with Laravel + React + Inertia.js + Shadcn

This project is a modern Content Management System (CMS) built using Laravel for the backend, React for the frontend, Inertia.js for seamless single-page app functionality, and Shadcn for elegant, customizable UI components. Additionally, it integrates **[PUCK](https://github.com/measuredco/puck)**, a visual editor for React, allowing developers to easily create and customize components using WYSIWYG (What You See Is What You Get) functionality and a drag-and-drop interface.




## UI Builder
Create beatiful components with [PUCK - The visual editor for React](git@github.com:measuredco/puck.git). 
This significantly simplifies the process of creating beautiful designs, offering a no-code solution for users.
- WYSIWYG Editing: Ideal for non-technical users to easily manage content without writing code.
- Drag-and-Drop: Intuitive interface for rearranging elements and building UIs quickly.
- Component Reusability: Build modular, reusable components.
- Integrated with React: Directly export and use the components in your app.


## Features

- **Laravel**: Powerful PHP framework for robust backend and API development.
- **React**: Modern, component-based JavaScript library for building user interfaces.
- **Inertia.js**: Bridges Laravel and React for building SPAs without an API layer.
- **Shadcn**: Elegant UI library for creating consistent, customizable components.
- User authentication (login, register, password reset)
- Role-based access control (Admin, Editor, etc.)
- Manage content such as pages, posts, and media
- CRUD functionality for posts, categories, tags, and more
- Seamless SPA navigation with Inertia.js
- Beautiful UI components with Shadcn for a clean user interface

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 14.x
- NPM
- Laravel >= 11.x
- MySQL or any database supported by Laravel
- Inertia.js
- React >= 18.x
- tailwindcss >= 3.2.x
- vite >= 5.x

## Installation

Follow these steps to set up the project locally.

### 1. Create project

```bash
composer create-project coderomeos/laravel-inertia-react-shadcn-boilerplate
cd laravel-inertia-react-shadcn-boilerplate
```

### 2. Install packages
```bash
npm install
```

### 3. Set Up Environment Variables
Configure your **database** and other environment variables in _.env_ file:


### 4. Run Migrations
```bash
php artisan migrate
```

### 5. Run the development server
```bash
php artisan serve
```

In another terminal window, run:
```bash
npm run dev
```
### 7. Build Assets
```bash
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.