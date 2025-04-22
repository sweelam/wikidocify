package service

import (
	"context"
	apiModels "docwikify/backend/app/rest/documents-api/models"
	"docwikify/backend/service/documents/models"
	"docwikify/backend/service/documents/repositories"
	"time"
)

type DocumentService struct {
	repo repositories.DocumentRepository
}

func NewDocumentService(repo repositories.DocumentRepository) *DocumentService {
	return &DocumentService{repo: repo}
}

func (s *DocumentService) CreateDocument(ctx context.Context, req *apiModels.DocumentRequest) (*apiModels.DocumentResponse, error) {

	// Convert API model to DB model
	doc := &models.Document{
		Title:  req.Title,
		Author: req.Author,
	}

	if err := s.repo.Create(ctx, doc); err != nil {
		return nil, err
	}

	// Convert DB model back to API response
	return &apiModels.DocumentResponse{
		ID:        doc.ID.String(),
		Title:     doc.Title,
		Author:    doc.Author,
		CreatedAt: doc.CreatedAt.Format(time.RFC3339),
		UpdatedAt: doc.UpdatedAt.Format(time.RFC3339),
	}, nil
}
