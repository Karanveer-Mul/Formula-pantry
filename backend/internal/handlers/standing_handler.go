package handlers

import (
	"formula-pantry-backend/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// StandingHandler handles HTTP requests for standings
type StandingHandler struct {
	standingService *services.StandingService
}

// NewStandingHandler creates a new standing handler
func NewStandingHandler(standingService *services.StandingService) *StandingHandler {
	return &StandingHandler{
		standingService: standingService,
	}
}

// GetDriverStandings handles GET /api/v1/standings/drivers
func (h *StandingHandler) GetDriverStandings(c *gin.Context) {
	seasonStr := c.Query("season")
	if seasonStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Season parameter is required"})
		return
	}

	season, err := strconv.Atoi(seasonStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid season parameter"})
		return
	}

	limitStr := c.Query("limit")
	limitValue := 22
	if limitStr != "" {
		limitValue, err = strconv.Atoi(limitStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit parameter"})
			return
		}
	}

	limit := &limitValue

	var roundNumber *int
	roundStr := c.Query("round")
	if roundStr != "" {
		round, err := strconv.Atoi(roundStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid round parameter"})
			return
		}
		roundNumber = &round
	}

	standings, err := h.standingService.GetDriverStandings(season, roundNumber, limit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": standings,
	})
}

// GetConstructorStandings handles GET /api/v1/standings/constructors
func (h *StandingHandler) GetConstructorStandings(c *gin.Context) {
	seasonStr := c.Query("season")
	if seasonStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Season parameter is required"})
		return
	}

	season, err := strconv.Atoi(seasonStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid season parameter"})
		return
	}

	limitStr := c.Query("limit")
	limitValue := 11
	if limitStr != "" {
		limitValue, err = strconv.Atoi(limitStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit parameter"})
			return
		}
	}

	limit := &limitValue

	var roundNumber *int
	roundStr := c.Query("round")
	if roundStr != "" {
		round, err := strconv.Atoi(roundStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid round parameter"})
			return
		}
		roundNumber = &round
	}

	standings, err := h.standingService.GetConstructorStandings(season, roundNumber, limit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": standings,
	})
}
