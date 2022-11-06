package repositories

import (
	"foodways/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(order models.Order) (models.Order, error)
}

func RepositoryOrder(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateOrder(order models.Order) (models.Order, error) {
	err := r.db.Create(&order).Error

	return order, err
}
