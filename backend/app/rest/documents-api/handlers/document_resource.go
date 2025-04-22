package documentResource

import (
	reqresp "docwikify/backend/app/rest/documents-api/models"
	"docwikify/backend/service"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type DocumentResource struct {
	service *service.DocumentService
}

func NewDocumentResource(service *service.DocumentService) *DocumentResource {
	return &DocumentResource{service: service}
}

// example:
// curl -X POST localhost:8080/api/v1/documents -H 'content-type: application/json' -d '{"title": "doki", "author": "Mohamed Sweelam"}'
func (d *DocumentResource) AddDocument(c echo.Context) error {
	var doc reqresp.DocumentRequest

	if err := c.Bind(&doc); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	createdDoc, err := d.service.CreateDocument(c.Request().Context(), &doc)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	fmt.Println("Doc created!")

	return c.JSON(http.StatusCreated, createdDoc)
}
