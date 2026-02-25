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
func (s *NewsService) GetAllNews(index int, limit int) ([]models.News, error) {
	return s.newsRepo.GetAll(index, limit)
}

// GetNewsByID retrieves a news article by ID
func (s *NewsService) GetNewsByID(id uuid.UUID) (*models.News, error) {
	if id == uuid.Nil {
		return nil, nil
	}
	return s.newsRepo.GetByID(id)
}

func (s *NewsService) GetLatestNewsTitles(index int, limit int) ([]models.LatestNewsTitle, error) {
	return s.newsRepo.GetLatestNewsTitles(index, limit)
}

// CreateNews creates a new news article
func (s *NewsService) Create(news *models.News) error {
	return s.newsRepo.Create(news)
}
