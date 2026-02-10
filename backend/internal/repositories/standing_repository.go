package repositories

import (
	"formula-pantry-backend/internal/database"
	"formula-pantry-backend/internal/models"

	"gorm.io/gorm"
)

// DriverStandingRepository defines the interface for driver standing operations
type DriverStandingRepository interface {
	GetBySeason(season int) ([]models.DriverStanding, error)
	GetBySeasonAndRound(season int, roundNumber int) ([]models.DriverStanding, error)
	GetCurrentStandings(season int) ([]models.DriverStanding, error)
	Create(standing *models.DriverStanding) error
}

// ConstructorStandingRepository defines the interface for constructor standing operations
type ConstructorStandingRepository interface {
	GetBySeason(season int) ([]models.ConstructorStanding, error)
	GetBySeasonAndRound(season int, roundNumber int) ([]models.ConstructorStanding, error)
	GetCurrentStandings(season int) ([]models.ConstructorStanding, error)
	Create(standing *models.ConstructorStanding) error
}

type driverStandingRepository struct {
	db *gorm.DB
}

type constructorStandingRepository struct {
	db *gorm.DB
}

// NewDriverStandingRepository creates a new driver standing repository
func NewDriverStandingRepository() DriverStandingRepository {
	return &driverStandingRepository{
		db: database.DB,
	}
}

// NewConstructorStandingRepository creates a new constructor standing repository
func NewConstructorStandingRepository() ConstructorStandingRepository {
	return &constructorStandingRepository{
		db: database.DB,
	}
}

// Driver Standing methods
func (r *driverStandingRepository) GetBySeason(season int) ([]models.DriverStanding, error) {
	var standings []models.DriverStanding
	err := r.db.Where("season = ?", season).
		Preload("Driver").
		Order("round_number DESC, position ASC").
		Find(&standings).Error
	return standings, err
}

func (r *driverStandingRepository) GetBySeasonAndRound(season int, roundNumber int) ([]models.DriverStanding, error) {
	var standings []models.DriverStanding
	err := r.db.Where("season = ? AND round_number = ?", season, roundNumber).
		Preload("Driver").
		Order("position ASC").
		Find(&standings).Error
	return standings, err
}

func (r *driverStandingRepository) GetCurrentStandings(season int) ([]models.DriverStanding, error) {
	var standings []models.DriverStanding
	
	// Get the latest round number for the season
	var maxRound struct {
		RoundNumber int
	}
	err := r.db.Model(&models.DriverStanding{}).
		Where("season = ?", season).
		Select("MAX(round_number) as round_number").
		Scan(&maxRound).Error
	
	if err != nil {
		return nil, err
	}

	err = r.db.Where("season = ? AND round_number = ?", season, maxRound.RoundNumber).
		Preload("Driver").
		Order("position ASC").
		Find(&standings).Error
	return standings, err
}

func (r *driverStandingRepository) Create(standing *models.DriverStanding) error {
	return r.db.Create(standing).Error
}

// Constructor Standing methods
func (r *constructorStandingRepository) GetBySeason(season int) ([]models.ConstructorStanding, error) {
	var standings []models.ConstructorStanding
	err := r.db.Where("season = ?", season).
		Preload("Team").
		Order("round_number DESC, position ASC").
		Find(&standings).Error
	return standings, err
}

func (r *constructorStandingRepository) GetBySeasonAndRound(season int, roundNumber int) ([]models.ConstructorStanding, error) {
	var standings []models.ConstructorStanding
	err := r.db.Where("season = ? AND round_number = ?", season, roundNumber).
		Preload("Team").
		Order("position ASC").
		Find(&standings).Error
	return standings, err
}

func (r *constructorStandingRepository) GetCurrentStandings(season int) ([]models.ConstructorStanding, error) {
	var standings []models.ConstructorStanding
	
	// Get the latest round number for the season
	var maxRound struct {
		RoundNumber int
	}
	err := r.db.Model(&models.ConstructorStanding{}).
		Where("season = ?", season).
		Select("MAX(round_number) as round_number").
		Scan(&maxRound).Error
	
	if err != nil {
		return nil, err
	}

	err = r.db.Where("season = ? AND round_number = ?", season, maxRound.RoundNumber).
		Preload("Team").
		Order("position ASC").
		Find(&standings).Error
	return standings, err
}

func (r *constructorStandingRepository) Create(standing *models.ConstructorStanding) error {
	return r.db.Create(standing).Error
}

