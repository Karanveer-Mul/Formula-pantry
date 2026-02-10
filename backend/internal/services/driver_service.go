package services

import (
	"errors"
	"formula-pantry-backend/internal/models"
	"formula-pantry-backend/internal/repositories"

	"github.com/google/uuid"
)

// DriverService handles business logic for drivers
type DriverService struct {
	driverRepo repositories.DriverRepository
}

// NewDriverService creates a new driver service
func NewDriverService(driverRepo repositories.DriverRepository) *DriverService {
	return &DriverService{
		driverRepo: driverRepo,
	}
}

// GetAllDrivers retrieves all drivers
func (s *DriverService) GetAllDrivers() ([]models.Driver, error) {
	return s.driverRepo.GetAll()
}

// GetDriverByID retrieves a driver by ID
func (s *DriverService) GetDriverByID(id uuid.UUID) (*models.Driver, error) {
	if id == uuid.Nil {
		return nil, errors.New("invalid driver ID")
	}
	return s.driverRepo.GetByID(id)
}

// GetDriversBySeason retrieves all drivers for a season
func (s *DriverService) GetDriversBySeason(season int) ([]models.Driver, error) {
	if season < 1950 || season > 2100 {
		return nil, errors.New("invalid season")
	}
	return s.driverRepo.GetBySeason(season)
}

// GetDriverWithResults retrieves a driver with their race results
func (s *DriverService) GetDriverWithResults(id uuid.UUID) (*models.Driver, error) {
	if id == uuid.Nil {
		return nil, errors.New("invalid driver ID")
	}
	return s.driverRepo.GetWithResults(id)
}

