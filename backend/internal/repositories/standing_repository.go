package repositories

import (
	"formula-pantry-backend/internal/database"
	"formula-pantry-backend/internal/models"

	"gorm.io/gorm"
)

// DriverStandingRepository defines the interface for driver standing operations
type DriverStandingRepository interface {
	GetBySeason(season int, limit int) ([]models.PopulatedDriverStanding, error)
	GetBySeasonAndRound(season int, roundNumber int, limit int) ([]models.PopulatedDriverStanding, error)
	GetCurrentStandings(season int, limit int) ([]models.PopulatedDriverStanding, error)
	Create(standing *models.DriverStanding) error
}

// ConstructorStandingRepository defines the interface for constructor standing operations
type ConstructorStandingRepository interface {
	GetBySeason(season int, limit int) ([]models.PopulatedConstructorStanding, error)
	GetBySeasonAndRound(season int, roundNumber int, limit int) ([]models.PopulatedConstructorStanding, error)
	GetCurrentStandings(season int, limit int) ([]models.PopulatedConstructorStanding, error)
	GetConstructorStandingWithDrivers(teamId string) ([]models.PopulatedConstructorStandingWithDrivers, error)
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
func (r *driverStandingRepository) GetBySeason(season int, limit int) ([]models.PopulatedDriverStanding, error) {
	var standings []models.PopulatedDriverStanding

	err := r.db.
		Table("driver_standings ds").
		Select(`
			ds.id,
			ds.driver_id,
			d.first_name,
			d.last_name,
			d.team_id,
			t.team_color,
			t.name AS team_name,
			t.constructor_id as constructor_id,
			ds.season,
			ds.round_number,
			ds.position,
			ds.points,
			ds.wins
		`).
		Joins("JOIN drivers d ON d.id = ds.driver_id").
		Joins("LEFT JOIN teams t ON t.id = d.team_id").
		Where("ds.season = ?", season).
		Order("ds.round_number DESC, ds.position ASC").
		Limit(limit).
		Scan(&standings).Error

	return standings, err
}

func (r *driverStandingRepository) GetBySeasonAndRound(season int, roundNumber int, limit int) ([]models.PopulatedDriverStanding, error) {
	var standings []models.PopulatedDriverStanding

	err := r.db.
		Table("driver_standings ds").
		Select(`
			ds.id,
			ds.driver_id,
			d.first_name,
			d.last_name,
			d.team_id,
			t.team_color,
			t.name AS team_name,
			t.constructor_id as constructor_id,
			ds.season,
			ds.round_number,
			ds.position,
			ds.points,
			ds.wins
		`).
		Joins("JOIN drivers d ON d.id = ds.driver_id").
		Joins("LEFT JOIN teams t ds.round_number = ?", season, roundNumber).
		Order("ds.position ASC").
		Limit(limit).
		Scan(&standings).Error

	return standings, err
}

// Only get the latest results
func (r *driverStandingRepository) GetCurrentStandings(season int, limit int) ([]models.PopulatedDriverStanding, error) {
	var standings []models.PopulatedDriverStanding

	err := r.db.
		Table("driver_standings ds").
		Select(`
			ds.id,
			ds.driver_id,
			d.first_name,
			d.last_name,
			d.team_id,
			t.team_color,
			t.name AS team_name,
			t.constructor_id as constructor_id,
			ds.season,
			ds.round_number,
			ds.position,
			ds.points,
			ds.wins
		`).
		Joins("JOIN drivers d ON d.id = ds.driver_id").
		Joins("LEFT JOIN teams t ON t.id = d.team_id").
		Where("ds.season = ?", season).
		Order("ds.round_number DESC, ds.position ASC").
		Limit(limit).
		Scan(&standings).Error

	return standings, err
}

func (r *driverStandingRepository) Create(standing *models.DriverStanding) error {
	return r.db.Create(standing).Error
}

// Constructor Standing methods
func (r *constructorStandingRepository) GetBySeason(season int, limit int) ([]models.PopulatedConstructorStanding, error) {
	var standings []models.PopulatedConstructorStanding

	err := r.db.
		Model(&models.ConstructorStanding{}).
		Select(`
			constructor_standings.id,
			constructor_standings.team_id,
			teams.team_color,
			teams.name AS team_name,
			teams.constructor_id as constructor_id,
			constructor_standings.season,
			constructor_standings.round_number,
			constructor_standings.position,
			constructor_standings.points,
			constructor_standings.wins
		`).
		Joins("LEFT JOIN teams ON teams.id = constructor_standings.team_id"). // uses the Team relation: LEFT JOIN teams ON teams.id = constructor_standings.team_id
		Where("constructor_standings.season = ?", season).
		Order("constructor_standings.round_number DESC, constructor_standings.position ASC").
		Limit(limit).
		Scan(&standings).Error

	return standings, err
}

func (r *constructorStandingRepository) GetBySeasonAndRound(season int, roundNumber int, limit int) ([]models.PopulatedConstructorStanding, error) {
	var standings []models.PopulatedConstructorStanding

	err := r.db.
		Model(&models.ConstructorStanding{}).
		Select(`
			constructor_standings.id,
			constructor_standings.team_id,
			teams.team_color,
			teams.name AS team_name,
			teams.constructor_id as constructor_id,
			constructor_standings.season,
			constructor_standings.round_number,
			constructor_standings.position,
			constructor_standings.points,
			constructor_standings.wins
		`).
		Joins("LEFT JOIN teams ON teams.id = constructor_standings.team_id"). // uses the Team relation: LEFT JOIN teams ON teams.id = constructor_standings.team_id
		Where("constructor_standings.season = ? AND constructor_standings.round_number = ?", season, roundNumber).
		Order("constructor_standings.position ASC").
		Limit(limit).
		Scan(&standings).Error

	return standings, err
}

// Only get the latest results
func (r *constructorStandingRepository) GetCurrentStandings(season int, limit int) ([]models.PopulatedConstructorStanding, error) {
	var standings []models.PopulatedConstructorStanding

	err := r.db.
		Model(&models.ConstructorStanding{}).
		Select(`
			constructor_standings.id,
			constructor_standings.team_id,
			teams.team_color,
			teams.name AS team_name,
			teams.constructor_id as constructor_id,
			constructor_standings.season,
			constructor_standings.round_number,
			constructor_standings.position,
			constructor_standings.points,
			constructor_standings.wins
		`).
		Joins("LEFT JOIN teams ON teams.id = constructor_standings.team_id"). // uses the Team relation: LEFT JOIN teams ON teams.id = constructor_standings.team_id
		Where("constructor_standings.season = ?", season).
		Order("constructor_standings.round_number DESC, constructor_standings.position ASC").
		Limit(limit).
		Scan(&standings).Error

	return standings, err
}

func (r *constructorStandingRepository) GetConstructorStandingWithDrivers(teamId string) ([]models.PopulatedConstructorStandingWithDrivers, error) {
	var standings []models.PopulatedConstructorStandingWithDrivers

	err := r.db.
		Table("driver_standings ds").
		Select(`
			cs.id,
			d.team_id,
			t.name AS team_name,
			t.constructor_id as constructor_id,
			t.team_color,
			cs.season,
			cs.round_number,

			cs.position,
			cs.points,
			cs.wins,

			ds.driver_id,
			d.first_name as driver_first_name,
			d.last_name as driver_last_name,
			d.driver_number,
		    ds.points as driver_points,
			ds.wins as driver_wins			
		`).
		Joins("LEFT JOIN drivers d ON d.id = ds.driver_id").
		Joins("LEFT JOIN teams t ON t.id = d.team_id").
		Joins("LEFT JOIN constructor_standings cs ON cs.team_id = t.id").
		Where("t.id = ?", teamId).
		Order("ds.round_number DESC").
		Limit(2).
		Scan(&standings).Error

	return standings, err
}

func (r *constructorStandingRepository) Create(standing *models.ConstructorStanding) error {
	return r.db.Create(standing).Error
}
