package repositories

import (
	"context"
	"docwikify/backend/service/documents/models"

	"github.com/google/uuid"
)

type DocumentRepository interface {
	Create(ctx context.Context, document *models.Document) error
	GetAll(ctx context.Context) ([]models.Document, error)
	GetByID(ctx context.Context, id uuid.UUID) (*models.Document, error)
	Update(ctx context.Context, document *models.Document) error
	Delete(ctx context.Context, id uuid.UUID) error
	List(ctx context.Context, page, pageSize int) ([]*models.Document, error)
}
