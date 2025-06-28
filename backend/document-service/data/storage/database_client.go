package storage

import (
	"log"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DbClient struct {
	DB *gorm.DB
}

func NewDbClient(dbDialect DbDialect, dsn string) (*DbClient, error) {
	db, err := gorm.Open(dbDialect.Dial(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal(err)
		panic(err)
	}

	log.Print("Connected to the database")

	sqlDb, _ := db.DB()
	sqlDb.SetMaxIdleConns(10)
	sqlDb.SetMaxOpenConns(100)
	sqlDb.SetConnMaxLifetime(time.Hour)

	return &DbClient{db}, nil
}

func (dbc *DbClient) Migrate(tables ...any) {
	for _, table := range tables {
		dbc.DB.AutoMigrate(table)
	}
}
