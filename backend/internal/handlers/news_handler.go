package handlers

import (
	"formula-pantry-backend/internal/models"
	"formula-pantry-backend/internal/services"
	"net/http"
	"strconv"

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
	pageIndexStr := c.DefaultQuery("page", "0")
	pageIndex := 0
	if val, err := strconv.Atoi(pageIndexStr); err == nil {
		pageIndex = val * 10
	}

	limitStr := c.DefaultQuery("limit", "10")
	limit := 10
	if val, err := strconv.Atoi(limitStr); err == nil {
		limit = val
	}

	news, err := h.newsService.GetAllNews(pageIndex, limit)
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

func (h *NewsHandler) GetLatestNewsTitles(c *gin.Context) {
	pageIndexStr := c.DefaultQuery("page", "0")
	pageIndex := 0
	if val, err := strconv.Atoi(pageIndexStr); err == nil {
		pageIndex = val * 10
	}

	limitStr := c.DefaultQuery("limit", "10")
	limit := 10
	if val, err := strconv.Atoi(limitStr); err == nil {
		limit = val
	}

	news, err := h.newsService.GetLatestNewsTitles(pageIndex, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve news articles"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": news,
	})
}

// Create handles POST /api/v1/news
func (h *NewsHandler) Create(c *gin.Context) {
	// Implementation for creating news article
	var news models.News
	if err := c.ShouldBindJSON(&news); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.newsService.Create(&news)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create news article"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"data": news,
	})
}
