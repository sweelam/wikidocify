package entity

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Document struct {
	gorm.Model
	Title   string
	Content datatypes.JSON
}
