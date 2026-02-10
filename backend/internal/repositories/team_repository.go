package repositories

import (
	"formula-pantry-backend/internal/database"
	"formula-pantry-backend/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// TeamRepository defines the interface for team data operations
type TeamRepository interface {
	GetAll() ([]models.Team, error)
	GetByID(id uuid.UUID) (*models.Team, error)
	GetByConstructorID(constructorID string) (*models.Team, error)
	GetBySeason(season int) ([]models.Team, error)
	Create(team *models.Team) error
	Update(team *models.Team) error
	Delete(id uuid.UUID) error
	GetWithDrivers(id uuid.UUID) (*models.Team, error)
}

type teamRepository struct {
	db *gorm.DB
}

// NewTeamRepository creates a new team repository
func NewTeamRepository() TeamRepository {
	return &teamRepository{
		db: database.DB,
	}
}

func (r *teamRepository) GetAll() ([]models.Team, error) {
	var teams []models.Team
	err := r.db.Order("name ASC").Find(&teams).Error
	return teams, err
}

func (r *teamRepository) GetByID(id uuid.UUID) (*models.Team, error) {
	var team models.Team
	err := r.db.First(&team, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &team, nil
}

func (r *teamRepository) GetByConstructorID(constructorID string) (*models.Team, error) {
	var team models.Team
	err := r.db.First(&team, "constructor_id = ?", constructorID).Error
	if err != nil {
		return nil, err
	}
	return &team, nil
}

func (r *teamRepository) GetBySeason(season int) ([]models.Team, error) {
	var teams []models.Team
	err := r.db.Where("season = ?", season).Order("name ASC").Find(&teams).Error
	return teams, err
}

func (r *teamRepository) Create(team *models.Team) error {
	return r.db.Create(team).Error
}

func (r *teamRepository) Update(team *models.Team) error {
	return r.db.Save(team).Error
}

func (r *teamRepository) Delete(id uuid.UUID) error {
	return r.db.Delete(&models.Team{}, "id = ?", id).Error
}

func (r *teamRepository) GetWithDrivers(id uuid.UUID) (*models.Team, error) {
	var team models.Team
	err := r.db.Preload("Drivers").First(&team, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &team, nil
}

