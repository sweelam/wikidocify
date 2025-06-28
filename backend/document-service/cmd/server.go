package main

import (
	"context"
	envLoader "docwikify/backend/app/config"
	"docwikify/backend/app/middleware"
	st "docwikify/backend/data/storage"
	"docwikify/backend/service/documents/models"
	"fmt"
	"os"
	"syscall"
	"time"

	"net/http"

	"gorm.io/gorm"

	"os/signal"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type Server struct {
	DBConn *gorm.DB
	Echo   *echo.Echo
}

func (s *Server) StartDb() {
	envLoader.LoadAllEnv()
	postgresDialect := st.NewPostgreDialect()

	dsn := envLoader.LoadEnv("DB_DSN")
	dbc, err := st.NewDbClient(postgresDialect, dsn)

	if err != nil {
		panic(err)
	}

	s.DBConn = dbc.DB
	dbc.Migrate(&models.Document{})
}

func (server *Server) Start() {
	e := echo.New()
	server.Echo = e

	s := http.Server{
		Addr:    ":8080",
		Handler: e,
	}

	e.Use(middleware.Logger)

	Init(server)

	// Channel to listen for interrupt or terminate signals
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	// Start server in a goroutine
	go func() {
		fmt.Println("server started on port 8080")
		if err := s.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()

	// Wait for interrupt signal
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := s.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}
	fmt.Println("Server exiting")
}
