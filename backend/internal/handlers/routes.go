package handlers

import (
	"formula-pantry-backend/internal/config"
	"formula-pantry-backend/internal/middleware"
	"formula-pantry-backend/internal/repositories"
	"formula-pantry-backend/internal/services"

	"github.com/gin-gonic/gin"
)

// SetupRoutes configures all API routes
func SetupRoutes(router *gin.Engine, cfg *config.Config) {
	// Initialize repositories
	sessionRepo := repositories.NewSessionRepository()
	driverRepo := repositories.NewDriverRepository()
	teamRepo := repositories.NewTeamRepository()
	driverStandingRepo := repositories.NewDriverStandingRepository()
	constructorStandingRepo := repositories.NewConstructorStandingRepository()
	newsRepo := repositories.NewNewsRepository()

	// Initialize services
	sessionService := services.NewSessionService(sessionRepo)
	driverService := services.NewDriverService(driverRepo)
	teamService := services.NewTeamService(teamRepo)
	standingService := services.NewStandingService(driverStandingRepo, constructorStandingRepo)
	newsService := services.NewNewsService(newsRepo)

	// Initialize handlers
	sessionHandler := NewSessionHandler(sessionService)
	driverHandler := NewDriverHandler(driverService)
	teamHandler := NewTeamHandler(teamService)
	standingHandler := NewStandingHandler(standingService)
	newsHandler := NewNewsHandler(newsService)

	// API v1 routes
	v1 := router.Group("/api/v1")
	{
		// Sessions routes
		sessions := v1.Group("/sessions")
		{
			sessions.GET("", sessionHandler.GetSessionsBySeason)
			sessions.GET("/:id", sessionHandler.GetSessionByID)
			sessions.GET("/:id/results", sessionHandler.GetSessionResults)
		}

		// Drivers routes
		drivers := v1.Group("/drivers")
		{
			drivers.GET("", driverHandler.GetDriversBySeason)
			drivers.GET("/:id", driverHandler.GetDriverByID)
			drivers.GET("/:id/results", driverHandler.GetDriverResults)
		}

		// Teams routes
		teams := v1.Group("/teams")
		{
			teams.GET("", teamHandler.GetTeamsBySeason)
			teams.GET("/:id", teamHandler.GetTeamByID)
			teams.GET("/:id/drivers", teamHandler.GetTeamWithDrivers)
		}

		// Standings routes
		standings := v1.Group("/standings")
		{
			standings.GET("/drivers", standingHandler.GetDriverStandings)
			standings.GET("/constructors", standingHandler.GetConstructorStandings)
		}

		// News routes
		news := v1.Group("/news")
		{
			news.GET("", newsHandler.GetAllNews)
			news.GET("/:id", newsHandler.GetNewsByID)
		}
	}

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})
}

// SetupRoutesWithConfig configures routes with config for middleware
func SetupRoutesWithConfig(router *gin.Engine, cfg *config.Config) {
	// Apply global middleware
	router.Use(middleware.Recovery())
	router.Use(middleware.RequestID())
	router.Use(middleware.RequestLogger())
	router.Use(middleware.SetupCORS(cfg))

	// Setup routes
	SetupRoutes(router, cfg)
}

