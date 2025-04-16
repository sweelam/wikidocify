package storage

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DbDialect interface {
	Dial(dsn string) gorm.Dialector
}

type PostgreDialect struct{}

func NewPostgreDialect() *PostgreDialect {
	return &PostgreDialect{}
}

func (p *PostgreDialect) Dial(dsn string) gorm.Dialector {
	return postgres.Open(dsn)
}
