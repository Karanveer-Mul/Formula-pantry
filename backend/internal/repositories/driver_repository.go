package repositories

import (
	"formula-pantry-backend/internal/database"
	"formula-pantry-backend/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// DriverRepository defines the interface for driver data operations
type DriverRepository interface {
	GetAll() ([]models.Driver, error)
	GetByID(id uuid.UUID) (*models.Driver, error)
	GetByDriverID(driverID string) (*models.Driver, error)
	GetBySeason(season int) ([]models.Driver, error)
	GetByTeamID(teamID uuid.UUID) ([]models.Driver, error)
	Create(driver *models.Driver) error
	Update(driver *models.Driver) error
	Delete(id uuid.UUID) error
	GetWithResults(id uuid.UUID) (*models.Driver, error)
}

type driverRepository struct {
	db *gorm.DB
}

// NewDriverRepository creates a new driver repository
func NewDriverRepository() DriverRepository {
	return &driverRepository{
		db: database.DB,
	}
}

func (r *driverRepository) GetAll() ([]models.Driver, error) {
	var drivers []models.Driver
	err := r.db.Order("last_name ASC").Find(&drivers).Error
	return drivers, err
}

func (r *driverRepository) GetByID(id uuid.UUID) (*models.Driver, error) {
	var driver models.Driver
	err := r.db.Preload("Team").First(&driver, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &driver, nil
}

func (r *driverRepository) GetByDriverID(driverID string) (*models.Driver, error) {
	var driver models.Driver
	err := r.db.Preload("Team").First(&driver, "driver_id = ?", driverID).Error
	if err != nil {
		return nil, err
	}
	return &driver, nil
}

func (r *driverRepository) GetBySeason(season int) ([]models.Driver, error) {
	var drivers []models.Driver
	err := r.db.Where("season = ?", season).Preload("Team").Order("season_position ASC").Find(&drivers).Error
	return drivers, err
}

func (r *driverRepository) GetByTeamID(teamID uuid.UUID) ([]models.Driver, error) {
	var drivers []models.Driver
	err := r.db.Where("team_id = ?", teamID).Preload("Team").Find(&drivers).Error
	return drivers, err
}

func (r *driverRepository) Create(driver *models.Driver) error {
	return r.db.Create(driver).Error
}

func (r *driverRepository) Update(driver *models.Driver) error {
	return r.db.Save(driver).Error
}

func (r *driverRepository) Delete(id uuid.UUID) error {
	return r.db.Delete(&models.Driver{}, "id = ?", id).Error
}

func (r *driverRepository) GetWithResults(id uuid.UUID) (*models.Driver, error) {
	var driver models.Driver
	err := r.db.Preload("SessionResults").Preload("SessionResults.Session").Preload("Team").First(&driver, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &driver, nil
}

