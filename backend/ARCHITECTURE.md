# Architecture Documentation

## Overview

This document explains the architectural decisions and design patterns used in the Formula Pantry backend.

## Architecture Pattern

The backend follows **Clean Architecture** principles with clear separation of concerns:

```
Handlers (HTTP Layer)
    ↓
Services (Business Logic)
    ↓
Repositories (Data Access)
    ↓
Models (Database Entities)
```

### Why This Structure?

1. **Testability**: Each layer can be tested independently with mocks
2. **Maintainability**: Changes in one layer don't cascade to others
3. **Scalability**: Easy to add new features without affecting existing code
4. **Separation of Concerns**: Each layer has a single responsibility

## Framework Choice: Gin

**Decision**: Use Gin web framework

**Rationale**:
- Most popular Go web framework with excellent documentation
- High performance (comparable to standard library)
- Excellent middleware support
- Large ecosystem and community
- Easy to learn and use

## Database ORM: GORM

**Decision**: Use GORM for database operations

**Rationale**:
- Similar to SQLAlchemy (easier transition from Python)
- Handles relationships well
- Built-in migration support
- Reduces boilerplate code
- Good for learning Go patterns while being productive

**Alternative Considered**: `sqlc` (SQL-first approach)
- Better for fine-tuned queries
- More control over SQL
- Chosen GORM for faster development and learning curve

## Database Type Decisions

### UUIDs for Primary Keys

**Decision**: Use UUIDs instead of auto-incrementing integers

**Rationale**:
- Better for distributed systems
- No sequential ID exposure (security)
- Can generate IDs before database insert
- Works well with microservices

**Trade-off**: Slightly larger storage and index size, but negligible for this use case

### Numeric Types for Points

**Decision**: Use `NUMERIC(10,2)` instead of `FLOAT` or `DOUBLE PRECISION`

**Rationale**:
- Avoids floating-point precision issues
- Critical for financial/points calculations
- Exact decimal representation
- Standard practice for currency-like values

### Small Integer for Temperature

**Decision**: Use `SMALLINT` (int8 in Go) for track temperature

**Rationale**:
- Temperature values are 2-digit integers
- Saves storage space
- More semantic than regular integer
- PostgreSQL `SMALLINT` range (-32,768 to 32,767) is more than sufficient

### Timezone-Aware Timestamps

**Decision**: Use `TIMESTAMP WITH TIME ZONE` for all datetime fields

**Rationale**:
- Prevents timezone-related bugs
- Standard practice for production systems
- Go's `time.Time` handles timezones well
- Important for international data

### Weather Condition Enum

**Decision**: Custom Go type with validation + PostgreSQL CHECK constraint

**Rationale**:
- Type safety in Go code
- Database-level validation
- Easy to extend in the future
- Clear domain model

**Implementation**:
- Go: `type WeatherCondition string` with constants
- PostgreSQL: `CHECK (weather_conditions IN ('dry', 'wet'))`

## Project Structure

### `cmd/server/`
**Purpose**: Application entry point

**Why**: Standard Go convention - `cmd/` contains main applications. If we add CLI tools or other apps later, they go here.

### `internal/`
**Purpose**: Private application code

**Why**: Go compiler enforces that `internal/` packages cannot be imported by external packages. This prevents accidental external dependencies and keeps the API surface clean.

### Layer Breakdown

#### Models (`internal/models/`)
- GORM model definitions
- Database schema representation
- Relationships between entities

#### Repositories (`internal/repositories/`)
- Data access layer
- Abstracts database operations
- Returns domain models, not database rows
- Interface-based for testability

#### Services (`internal/services/`)
- Business logic layer
- Input validation
- Data transformation
- Orchestrates repository calls

#### Handlers (`internal/handlers/`)
- HTTP request/response handling
- JSON serialization
- Error response formatting
- Route registration

#### Middleware (`internal/middleware/`)
- Cross-cutting concerns
- CORS configuration
- Request logging
- Error recovery
- Request ID generation

## Security Considerations

### 1. SQL Injection Prevention
- **Implementation**: GORM uses parameterized queries automatically
- **Why**: Never use string concatenation for SQL queries
- **Result**: All queries are safe from SQL injection

### 2. Input Validation
- **Implementation**: Service layer validates all inputs
- **Why**: Prevent invalid data from reaching database
- **Examples**: Season range (1950-2100), UUID format validation

### 3. Error Handling
- **Implementation**: Generic error messages to clients, detailed logging server-side
- **Why**: Don't expose internal errors (database structure, etc.) to clients
- **Result**: Better security and user experience

### 4. CORS Configuration
- **Implementation**: Middleware restricts allowed origins
- **Why**: Prevent unauthorized frontends from accessing API
- **Configuration**: Environment-based for dev/prod

### 5. Environment Variables
- **Implementation**: All sensitive data in `.env` file
- **Why**: Never commit credentials to version control
- **Tool**: `godotenv` for loading environment variables

## API Design

### RESTful Conventions
- Resource-based URLs (`/api/v1/sessions`, `/api/v1/drivers`)
- HTTP methods for actions (GET for retrieval)
- Consistent response format (`{"data": ...}` or `{"error": ...}`)
- Proper HTTP status codes (200, 400, 404, 500)

### Versioning
- URL-based versioning (`/api/v1/`)
- **Why**: Allows breaking changes in future versions without affecting existing clients
- Easy to deprecate old versions

### Query Parameters
- Filtering: `?season=2024`
- Optional parameters with defaults
- Clear parameter names

## Database Connection Pooling

**Configuration**:
- Max Idle Connections: 10
- Max Open Connections: 100
- Connection Max Lifetime: 1 hour

**Rationale**:
- Balances resource usage and performance
- Prevents connection exhaustion
- Standard PostgreSQL recommendations

## Migration Strategy

**Current**: GORM AutoMigrate

**Why**:
- Fast development
- Automatic schema updates
- Good for learning and prototyping

**Future Consideration**: Manual migrations with `golang-migrate`
- Better for production
- Version control for schema changes
- Rollback capability
- Team collaboration

## Error Handling Strategy

1. **Repository Layer**: Returns database errors as-is
2. **Service Layer**: Converts to domain errors, validates inputs
3. **Handler Layer**: Converts to HTTP responses, never exposes internal errors

**Result**: Clean error propagation with appropriate abstraction at each layer

## Future Enhancements

1. **Authentication/Authorization**: JWT-based auth for protected endpoints
2. **Rate Limiting**: Prevent abuse, especially for public APIs
3. **Caching**: Redis for frequently accessed data (standings, driver stats)
4. **Pagination**: For large result sets (all sessions, all drivers)
5. **Filtering/Sorting**: More advanced query capabilities
6. **GraphQL**: Alternative API layer for flexible queries
7. **Monitoring**: Health checks, metrics, logging aggregation

## Testing Strategy (Future)

- **Unit Tests**: Services and repositories with mocks
- **Integration Tests**: Database operations with test database
- **API Tests**: End-to-end HTTP request/response testing

## Performance Considerations

1. **Database Indexes**: GORM automatically creates indexes for foreign keys and unique fields
2. **Connection Pooling**: Configured for optimal performance
3. **Eager Loading**: Use `Preload()` for relationships to avoid N+1 queries
4. **Query Optimization**: Monitor slow queries, add indexes as needed

## Deployment Considerations

1. **Environment Variables**: All configuration externalized
2. **Graceful Shutdown**: Server handles SIGTERM/SIGINT properly
3. **Health Checks**: `/health` endpoint for load balancer checks
4. **Logging**: Structured logging for production monitoring
5. **Database Migrations**: Run migrations on startup (or separate step in production)

