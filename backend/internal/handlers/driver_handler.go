package handlers

import (
	"formula-pantry-backend/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// DriverHandler handles HTTP requests for drivers
type DriverHandler struct {
	driverService *services.DriverService
}

// NewDriverHandler creates a new driver handler
func NewDriverHandler(driverService *services.DriverService) *DriverHandler {
	return &DriverHandler{
		driverService: driverService,
	}
}

// GetAllDrivers handles GET /api/v1/drivers
func (h *DriverHandler) GetAllDrivers(c *gin.Context) {
	drivers, err := h.driverService.GetAllDrivers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve drivers"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": drivers,
	})
}

// GetDriverByID handles GET /api/v1/drivers/:id
func (h *DriverHandler) GetDriverByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid driver ID"})
		return
	}

	driver, err := h.driverService.GetDriverByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Driver not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": driver,
	})
}

// GetDriversBySeason handles GET /api/v1/drivers?season=2024
func (h *DriverHandler) GetDriversBySeason(c *gin.Context) {
	seasonStr := c.Query("season")
	if seasonStr == "" {
		h.GetAllDrivers(c)
		return
	}

	season, err := strconv.Atoi(seasonStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid season parameter"})
		return
	}

	drivers, err := h.driverService.GetDriversBySeason(season)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": drivers,
	})
}

// GetDriverResults handles GET /api/v1/drivers/:id/results
func (h *DriverHandler) GetDriverResults(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid driver ID"})
		return
	}

	driver, err := h.driverService.GetDriverWithResults(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Driver not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": driver,
	})
}

