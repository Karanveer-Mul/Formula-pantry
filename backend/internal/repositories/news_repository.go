package repositories

import (
	"formula-pantry-backend/internal/database"
	"formula-pantry-backend/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// NewsRepository defines the interface for news data operations
type NewsRepository interface {
	GetAll() ([]models.News, error)
	GetByID(id uuid.UUID) (*models.News, error)
	Create(news *models.News) error
	Update(news *models.News) error
	Delete(id uuid.UUID) error
}

type newsRepository struct {
	db *gorm.DB
}

// NewNewsRepository creates a new news repository
func NewNewsRepository() NewsRepository {
	return &newsRepository{
		db: database.DB,
	}
}

func (r *newsRepository) GetAll() ([]models.News, error) {
	var news []models.News
	err := r.db.Order("created_on DESC").Find(&news).Error
	return news, err
}

func (r *newsRepository) GetByID(id uuid.UUID) (*models.News, error) {
	var news models.News
	err := r.db.First(&news, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &news, nil
}

func (r *newsRepository) Create(news *models.News) error {
	return r.db.Create(news).Error
}

func (r *newsRepository) Update(news *models.News) error {
	return r.db.Save(news).Error
}

func (r *newsRepository) Delete(id uuid.UUID) error {
	return r.db.Delete(&models.News{}, "id = ?", id).Error
}

