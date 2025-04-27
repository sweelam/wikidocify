package service

import (
	"context"
	apiModels "docwikify/backend/app/resource/documents-api/models"
	reqresp "docwikify/backend/app/resource/documents-api/models"
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

func (s *DocumentService) CreateDocument(
	ctx context.Context,
	req *apiModels.DocumentRequest,
) (*apiModels.DocumentResponse, error) {

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

func (s *DocumentService) GetAll(
	ctx context.Context,
) ([]reqresp.DocumentResponse, error) {

	documents, err := s.repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	var documentResponses []reqresp.DocumentResponse
	for _, doc := range documents {
		documentResponses = append(documentResponses, reqresp.DocumentResponse{
			ID:     doc.ID.String(),
			Author: doc.Author,
			Title:  doc.Title,
		})
	}

	return documentResponses, nil
}
