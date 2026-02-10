package handlers

import (
	"formula-pantry-backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// NewsHandler handles HTTP requests for news articles
type NewsHandler struct {
	newsService *services.NewsService
}

// NewNewsHandler creates a new news handler
func NewNewsHandler(newsService *services.NewsService) *NewsHandler {
	return &NewsHandler{
		newsService: newsService,
	}
}

// GetAllNews handles GET /api/v1/news
func (h *NewsHandler) GetAllNews(c *gin.Context) {
	news, err := h.newsService.GetAllNews()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve news articles"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": news,
	})
}

// GetNewsByID handles GET /api/v1/news/:id
func (h *NewsHandler) GetNewsByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid news ID"})
		return
	}

	news, err := h.newsService.GetNewsByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve news article"})
		return
	}

	if news == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "News article not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": news,
	})
}

