# QuickScribe - Modern Note-Taking App

QuickScribe is a modern, minimalist, and user-friendly note-taking application designed for speed and simplicity. Capture your thoughts, organize your ideas with tags, and enjoy a seamless writing experience with a rich text editor.

## Features

- **Rich Text Editor**: A powerful editor based on Tiptap that supports various text formattings, lists, blockquotes, and tables.
- **Tagging System**: Easily add and remove tags to organize and filter your notes.
- **Automatic Saving**: Your notes are automatically saved as you type, so you never lose your work.
- **Client-Side State**: Uses Zustand for efficient and fast state management, providing a responsive experience.
- **Responsive Design**: A clean and modern UI that works great on both desktop and mobile devices.
- **Dark Mode**: Switch between light and dark themes for your comfort.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Editor**: [Tiptap](https://tiptap.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) (version 18.x or later recommended) and a package manager like `npm` or `yarn` installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    Open your terminal in the project directory and run the following command to install all the necessary packages:
    ```bash
    npm install
    ```

### Running the Application

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) to view it in your browser. The page will auto-update as you make changes to the code.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter to check for code quality issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
