# ENCORE Study Tracker

A full-stack web application for tracking ENCORE study progress with a serverless API, built with Next.js and deployed on Vercel.

## Features

- **Study Session Tracking**: Log study sessions with duration, topics, and notes
- **Progress Analytics**: Visualize study progress with statistics and insights
- **Goal Management**: Set and track study goals with deadlines
- **Topic Organization**: Organize study materials by subjects/topics
- **Serverless Architecture**: Built with Vercel serverless functions
- **Modern UI**: Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (serverless functions)
- **Database**: Neon PostgreSQL (Vercel integration)
- **Deployment**: Vercel Platform
- **Styling**: Tailwind CSS with shadcn/ui components

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- GitHub account
- Vercel account
- Neon database account (for PostgreSQL)

### 1. Clone the Repository

```bash
git clone https://github.com/Sonseerhay/encor-study-analysis.git
cd encor-study-analysis
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Database

1. Create a new Neon database at [neon.tech](https://neon.tech)
2. Get your database connection string
3. Create a `.env.local` file in the project root:

```env
DATABASE_URL=your_neon_connection_string_here
```

### 4. Initialize Database Schema

Start the development server first:

```bash
npm run dev
```

Then run the database setup:

```bash
# In another terminal, run:
curl -X POST http://localhost:3000/api/database/setup
```

Or use the provided script:

```bash
npx tsx src/scripts/setup-database.ts
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## API Endpoints

### Study Sessions
- `GET /api/study-sessions?userId=<id>` - Get user's study sessions
- `POST /api/study-sessions` - Create a new study session

### Study Topics
- `GET /api/study-topics?userId=<id>` - Get user's study topics
- `POST /api/study-topics` - Create a new study topic

### Database Setup
- `POST /api/database/setup` - Initialize database schema

## Database Schema

The application uses the following main tables:

- **users**: User accounts and authentication
- **study_topics**: Subjects/areas of study
- **study_sessions**: Individual study sessions with duration and notes
- **study_goals**: Study goals with targets and deadlines
- **progress_tracking**: Daily progress metrics

## Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add the `DATABASE_URL` environment variable in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables Required

- `DATABASE_URL`: Neon PostgreSQL connection string

## Development

### Project Structure

```
src/
  app/                # Next.js app router
    api/             # API routes
    page.tsx         # Main dashboard
  components/        # React components
    dashboard/       # Dashboard components
  lib/              # Utilities and types
    db.ts           # Database connection
    types.ts        # TypeScript types
    schema.sql      # Database schema
  scripts/          # Utility scripts
```

### Adding New Features

1. Create API routes in `src/app/api/`
2. Add components in `src/components/`
3. Update types in `src/lib/types.ts`
4. Test locally before deploying

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
