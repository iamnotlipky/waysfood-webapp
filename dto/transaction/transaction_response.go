package transactiondto

import "foodways/models"

type TransactionResponse struct {
	ID     int                         `json:"id"`
	Users  models.UsersProfileResponse `json:"userOrder"`
	Status string                      `json:"status"`
	Product []models.ProductResponse `json:"order"`
}

type GetTransactionResponse struct {
	ID        int                         `json:"id" gorm:"primary_key:auto_increment"`
	Qty       int                         `json:"qty"`
	Buyer     models.UsersProfileResponse `json:"buyer"`
	Seller    models.UsersProfileResponse `json:"seller" gorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	Status    string                      `json:"status"`
	OrderList []models.Order              `json:"orderList"`
}
