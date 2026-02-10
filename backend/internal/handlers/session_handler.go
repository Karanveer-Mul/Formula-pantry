package handlers

import (
	"formula-pantry-backend/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// SessionHandler handles HTTP requests for sessions
type SessionHandler struct {
	sessionService *services.SessionService
}

// NewSessionHandler creates a new session handler
func NewSessionHandler(sessionService *services.SessionService) *SessionHandler {
	return &SessionHandler{
		sessionService: sessionService,
	}
}

// GetAllSessions handles GET /api/v1/sessions
func (h *SessionHandler) GetAllSessions(c *gin.Context) {
	sessions, err := h.sessionService.GetAllSessions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve sessions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": sessions,
	})
}

// GetSessionByID handles GET /api/v1/sessions/:id
func (h *SessionHandler) GetSessionByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session ID"})
		return
	}

	session, err := h.sessionService.GetSessionByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": session,
	})
}

// GetSessionsBySeason handles GET /api/v1/sessions?season=2024
func (h *SessionHandler) GetSessionsBySeason(c *gin.Context) {
	seasonStr := c.Query("season")
	if seasonStr == "" {
		h.GetAllSessions(c)
		return
	}

	season, err := strconv.Atoi(seasonStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid season parameter"})
		return
	}

	sessions, err := h.sessionService.GetSessionBySeason(season)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": sessions,
	})
}

// GetSessionResults handles GET /api/v1/sessions/:id/results
func (h *SessionHandler) GetSessionResults(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session ID"})
		return
	}

	session, err := h.sessionService.GetSessionWithResults(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": session,
	})
}

