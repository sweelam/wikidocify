package repositories

import (
	"context"
	"docwikify/backend/service/documents/models"
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type GormDocumentRepository struct {
	db *gorm.DB
}

func NewGormDocumentRepository(db *gorm.DB) DocumentRepository {
	return &GormDocumentRepository{db: db}
}

func (r *GormDocumentRepository) Create(ctx context.Context, document *models.Document) error {
	return r.db.WithContext(ctx).Create(document).Error
}

func (r *GormDocumentRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Document, error) {
	var document models.Document
	err := r.db.WithContext(ctx).First(&document, "id = ?", id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	return &document, err
}

func (r *GormDocumentRepository) Update(ctx context.Context, document *models.Document) error {
	return r.db.WithContext(ctx).Save(document).Error
}

func (r *GormDocumentRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.db.WithContext(ctx).Delete(&models.Document{}, "id = ?", id).Error
}

func (r *GormDocumentRepository) List(ctx context.Context, page, pageSize int) ([]*models.Document, error) {
	var documents []*models.Document
	offset := (page - 1) * pageSize
	err := r.db.WithContext(ctx).Offset(offset).Limit(pageSize).Find(&documents).Error
	return documents, err
}
