package main

import (
	documentResource "docwikify/backend/app/resource/documents-api/handlers"
	"docwikify/backend/service"
	"docwikify/backend/service/documents/repositories"
)

func Init(server *Server) {
	DOC_RESOURCE_PATH := "api/v1/documents"

	router := server.Echo.Router()

	docRepo := repositories.NewGormDocumentRepository(server.DBConn)
	docService := service.NewDocumentService(docRepo)
	docResource := documentResource.NewDocumentResource(docService)

	router.Add("POST", DOC_RESOURCE_PATH, docResource.AddDocument)
}
