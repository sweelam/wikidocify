package main

import (
	documentResource "docwikify/backend/app/resource/documents"
	"docwikify/backend/service"
	"docwikify/backend/service/documents/repositories"
)

func Init(server *Server) {
	var DOC_RESOURCE_PATH string = "api/v1/documents"

	router := server.Echo.Router()

	docRepo := repositories.NewGormDocumentRepository(server.DBConn)
	docService := service.NewDocumentService(docRepo)
	docResource := documentResource.NewDocumentResource(docService)

	router.Add("POST", DOC_RESOURCE_PATH, docResource.AddDocument)
}
