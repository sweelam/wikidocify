package reqresp

import "github.com/google/uuid"

type DocumentRequest struct {
	ID     uuid.UUID `json:"id"`
	Title  string    `json:"title"`
	Author string    `json:"author"`
}

type DocumentResponse struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Author    string `json:"author"`
	CreatedAt string `json:"created_at"` // ISO8601 formatted
	UpdatedAt string `json:"updated_at"`
}
