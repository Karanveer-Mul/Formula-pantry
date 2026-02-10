package services

import (
	"formula-pantry-backend/internal/models"
	"formula-pantry-backend/internal/repositories"

	"github.com/google/uuid"
)

// NewsService handles business logic for news articles
type NewsService struct {
	newsRepo repositories.NewsRepository
}

// NewNewsService creates a new news service
func NewNewsService(newsRepo repositories.NewsRepository) *NewsService {
	return &NewsService{
		newsRepo: newsRepo,
	}
}

// GetAllNews retrieves all news articles
func (s *NewsService) GetAllNews() ([]models.News, error) {
	return s.newsRepo.GetAll()
}

// GetNewsByID retrieves a news article by ID
func (s *NewsService) GetNewsByID(id uuid.UUID) (*models.News, error) {
	if id == uuid.Nil {
		return nil, nil
	}
	return s.newsRepo.GetByID(id)
}

