package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"formula-pantry-backend/internal/config"
	"formula-pantry-backend/internal/database"
	"formula-pantry-backend/internal/handlers"
	"formula-pantry-backend/internal/models"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Set Gin mode based on environment
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Connect to database
	if err := database.Connect(cfg); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer database.Close()

	// Run database migrations
	/*if err := runMigrations(); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}*/

	// Initialize Gin router
	router := gin.New()

	// Setup routes with middleware
	handlers.SetupRoutesWithConfig(router, cfg)

	// Create HTTP server
	srv := &http.Server{
		Addr:    fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port),
		Handler: router,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Server starting on %s:%d", cfg.Server.Host, cfg.Server.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// Graceful shutdown with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
}

// runMigrations runs database migrations for all models
// Order matters: parent tables must be created before child tables with foreign keys
func runMigrations() error {
	if database.DB == nil {
		return fmt.Errorf("database connection not initialized")
	}

	log.Println("Running database migrations...")

	// Create tables in dependency order
	if err := database.DB.AutoMigrate(&models.DriverStanding{}); err != nil {
		return fmt.Errorf("failed to migrate driver_standings: %w", err)
	}
	log.Println("✓ DriverStandings table migrated")

	if err := database.DB.AutoMigrate(&models.News{}); err != nil {
		return fmt.Errorf("failed to migrate news: %w", err)
	}
	log.Println("✓ News table migrated")

	log.Println("Database migrations completed successfully")
	return nil
}
