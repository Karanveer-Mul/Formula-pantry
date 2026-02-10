package handlers

import (
	"formula-pantry-backend/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// TeamHandler handles HTTP requests for teams
type TeamHandler struct {
	teamService *services.TeamService
}

// NewTeamHandler creates a new team handler
func NewTeamHandler(teamService *services.TeamService) *TeamHandler {
	return &TeamHandler{
		teamService: teamService,
	}
}

// GetAllTeams handles GET /api/v1/teams
func (h *TeamHandler) GetAllTeams(c *gin.Context) {
	teams, err := h.teamService.GetAllTeams()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve teams"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": teams,
	})
}

// GetTeamByID handles GET /api/v1/teams/:id
func (h *TeamHandler) GetTeamByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid team ID"})
		return
	}

	team, err := h.teamService.GetTeamByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Team not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": team,
	})
}

// GetTeamsBySeason handles GET /api/v1/teams?season=2024
func (h *TeamHandler) GetTeamsBySeason(c *gin.Context) {
	seasonStr := c.Query("season")
	if seasonStr == "" {
		h.GetAllTeams(c)
		return
	}

	season, err := strconv.Atoi(seasonStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid season parameter"})
		return
	}

	teams, err := h.teamService.GetTeamsBySeason(season)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": teams,
	})
}

// GetTeamWithDrivers handles GET /api/v1/teams/:id/drivers
func (h *TeamHandler) GetTeamWithDrivers(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid team ID"})
		return
	}

	team, err := h.teamService.GetTeamWithDrivers(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Team not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": team,
	})
}

