package main

import (
	"fmt"
	"foodways/database"
	"foodways/pkg/mysql"
	"foodways/routes"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {

	mysql.DatabaseInit()

	database.RunMigration()

	r := mux.NewRouter()

	routes.RoutesInit(r.PathPrefix("/api/v1").Subrouter())

	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	r.PathPrefix("/uploads").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	var allowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var allowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"})
	var allowedOrigins = handlers.AllowedOrigins([]string{"*"})

	port := os.Getenv("PORT")
	fmt.Println("server running on port 8000")
	http.ListenAndServe(":" + port, handlers.CORS(allowedHeaders, allowedMethods, allowedOrigins)(r))
}
