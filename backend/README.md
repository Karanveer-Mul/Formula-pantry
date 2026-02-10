# Formula Pantry Backend

A Go REST API backend for Formula 1 data, built with Gin, GORM, and PostgreSQL.

## Architecture

This backend follows clean architecture principles with clear separation of concerns:

- **Models**: Database entities (GORM models)
- **Repositories**: Data access layer
- **Services**: Business logic layer
- **Handlers**: HTTP request/response handling
- **Middleware**: Cross-cutting concerns (CORS, logging, recovery)

## Prerequisites

- Go 1.21 or higher
- PostgreSQL 12 or higher
- Environment variables configured (see `.env.example`)

## Setup

1. **Clone and navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   go mod download
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials and configuration.

4. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE formula_pantry;
   ```

5. **Enable UUID extension in PostgreSQL:**
   ```sql
   \c formula_pantry
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

6. **Add weather condition constraint (after first run):**
   ```sql
   ALTER TABLE sessions 
   ADD CONSTRAINT check_weather_conditions 
   CHECK (weather_conditions IS NULL OR weather_conditions IN ('dry', 'wet'));
   ```

6. **Run the application:**
   ```bash
   go run cmd/server/main.go
   ```

   The server will start on `http://localhost:8080` (or the port specified in your `.env`).

## Database Migrations

The application uses GORM's AutoMigrate feature. On startup, it will automatically create or update the database schema based on the models defined in `internal/models/`.

### Manual Migration (Optional)

If you prefer manual migrations, you can use tools like `golang-migrate` or `gormigrate`.

## API Endpoints

### Sessions (Races)

- `GET /api/v1/sessions` - List all sessions (supports `?season=2024` query parameter)
- `GET /api/v1/sessions/:id` - Get session by ID
- `GET /api/v1/sessions/:id/results` - Get session with results

### Drivers

- `GET /api/v1/drivers` - List all drivers (supports `?season=2024` query parameter)
- `GET /api/v1/drivers/:id` - Get driver by ID
- `GET /api/v1/drivers/:id/results` - Get driver with race results

### Teams

- `GET /api/v1/teams` - List all teams (supports `?season=2024` query parameter)
- `GET /api/v1/teams/:id` - Get team by ID
- `GET /api/v1/teams/:id/drivers` - Get team with drivers

### Standings

- `GET /api/v1/standings/drivers?season=2024&round=5` - Get driver championship standings
  - `season` (required): The F1 season year
  - `round` (optional): Specific round number. If omitted, returns current standings
- `GET /api/v1/standings/constructors?season=2024&round=5` - Get constructor championship standings
  - `season` (required): The F1 season year
  - `round` (optional): Specific round number. If omitted, returns current standings

### Health Check

- `GET /health` - Health check endpoint

## Response Format

All successful responses follow this format:

```json
{
  "data": [...]
}
```

Error responses:

```json
{
  "error": "Error message"
}
```

## Database Schema

### Models

1. **Session** - Represents a Formula 1 race session
2. **SessionResult** - Driver results for a specific session
3. **Driver** - Formula 1 driver information and statistics
4. **Team** - Formula 1 constructor/team information
5. **DriverStanding** - Driver championship standings after each race
6. **ConstructorStanding** - Constructor championship standings after each race

### Key Design Decisions

- **UUIDs for Primary Keys**: All models use UUIDs instead of auto-incrementing integers for better scalability and security
- **Timezone-aware Timestamps**: All datetime fields use `TIMESTAMP WITH TIME ZONE` in PostgreSQL
- **Numeric Types for Points**: Points and monetary values use `NUMERIC` type to avoid floating-point precision issues
- **Small Integer for Temperature**: Track temperature uses `SMALLINT` (int8 in Go) as it's a 2-digit value
- **Weather Condition Enum**: Custom type with validation (dry/wet)

## Security Considerations

1. **Input Validation**: All inputs are validated before processing
2. **SQL Injection Prevention**: GORM uses parameterized queries automatically
3. **Error Handling**: Database errors are never exposed to clients
4. **CORS Configuration**: Configured for Next.js frontend
5. **Environment Variables**: Sensitive data stored in `.env` (never committed)

## Development

### Project Structure

```
backend/
├── cmd/
│   └── server/
│       └── main.go          # Application entry point
├── internal/
│   ├── config/              # Configuration management
│   ├── database/            # DB connection & setup
│   ├── models/              # GORM models (entities)
│   ├── handlers/            # HTTP handlers (controllers)
│   ├── services/            # Business logic layer
│   ├── repositories/        # Data access layer
│   ├── middleware/          # HTTP middleware
│   └── utils/               # Helper functions
├── migrations/              # Database migration files (if using manual migrations)
├── go.mod                   # Go module file
└── README.md               # This file
```

### Adding New Endpoints

1. Add repository methods in `internal/repositories/`
2. Add service methods in `internal/services/`
3. Add handler methods in `internal/handlers/`
4. Register routes in `internal/handlers/routes.go`

## Testing

```bash
go test ./...
```

## Building

```bash
go build -o bin/server cmd/server/main.go
```

## Environment Variables

See `.env.example` for all available configuration options:

- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_USER` - Database user (default: postgres)
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name (default: formula_pantry)
- `DB_SSLMODE` - SSL mode (default: disable)
- `SERVER_PORT` - Server port (default: 8080)
- `SERVER_HOST` - Server host (default: localhost)
- `ENV` - Environment (development/production)
- `CORS_ALLOWED_ORIGINS` - Comma-separated list of allowed origins

## License

[Your License Here]

