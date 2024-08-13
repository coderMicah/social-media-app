
---

# Social Media App

A [Next.js](https://nextjs.org/) project with [Lucia](https://lucia-auth.com/) for authentication, [TanStack Query](https://tanstack.com/query/latest) for data fetching, [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) for styling, and [Prisma](https://www.prisma.io/) as the ORM.

## Features

- **Authentication**: Secure user authentication using Lucia.
- **Data Fetching**: Efficient data fetching with TanStack Query.
- **Type Safety**: Fully typed with TypeScript.
- **Styling**: Responsive and modern UI using Tailwind CSS.
- **Database**: Robust database management with Prisma.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- A PostgreSQL or other Prisma-supported database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory 

4. Generate Prisma Client:

    ```bash
    npx prisma generate
    ```

5. Run database migrations:

    ```bash
    npx prisma migrate dev
    ```

### Running the Project

Start the development server:

```bash
yarn dev
```

or

```bash
npm run dev
```

The application should now be running on `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
yarn build
```

or

```bash
npm run build
```

Then start the server:

```bash
yarn start
```

or

```bash
npm start
```


## Usage

- **Authentication**: Lucia is used for handling user authentication. Refer to [Lucia documentation](https://lucia-auth.com/) for customization options.
- **Data Fetching**: TanStack Query is utilized for efficient data management. You can extend or customize query logic as needed.
- **Styling**: Tailwind CSS is used for styling components. Modify the `tailwind.config.js` file for custom themes or configurations.
- **Database**: Prisma is used as the ORM. You can define your models in the `prisma/schema.prisma` file and run migrations to update the database.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This `README.md` provides a solid foundation, and you can customize it further based on your project's specific needs.
