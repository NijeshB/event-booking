event-booking-app/
│── backend/        # Node.js (Express + TypeScript)
│   ├── src/
│   │   ├── config/       # Database, environment configs
│   │   ├── controllers/  # Business logic (events, users, bookings)
│   │   ├── models/       # Database models (TypeORM/Sequelize)
│   │   ├── routes/       # Express routes
│   │   ├── middleware/   # Authentication, error handling
│   │   ├── utils/        # Helper functions
│   │   ├── app.ts        # Express app setup
│   │   ├── server.ts     # Start the server
│   ├── .env
│   ├── tsconfig.json
│   ├── package.json
│── admin/         # Admin Panel (React/Next.js)
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── package.json
│── frontend/      # User-facing Frontend (React/Next.js)
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── package.json
│── database/      # Database scripts (migrations, seeds)
│── docs/          # API documentation
