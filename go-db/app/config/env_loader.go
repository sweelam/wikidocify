package envlaoder

import (
	"github.com/joho/godotenv"
	"log"
	"os"
	"path/filepath"
)

func LoadAllEnv() {
	if os.Getenv("ENV") == "production" || os.Getenv("GO_ENV") == "production" {
		return
	}

	err := godotenv.Load()
	if err == nil {
		return
	}

	// If that fails, try looking in the app's directory
	executable, err := os.Executable()
	if err == nil {
		execDir := filepath.Dir(executable)
		err = godotenv.Load(filepath.Join(execDir, ".env"))
		if err == nil {
			return
		}
	}

	// If that also fails, try looking in the parent directory
	// (useful when the .env is in the project root but code is in a subdirectory)
	workDir, err := os.Getwd()
	if err == nil {
		err = godotenv.Load(filepath.Join(workDir, "..", ".env"))
		if err == nil {
			return
		}
	}

	// If all attempts fail, log the error
	log.Fatal("Error loading .env file: .env file not found in any of the search paths")
}

func LoadEnv(envName string) string {
	env := os.Getenv(envName)
	if env == "" {
		log.Fatalf("environment variable %v is not set", envName)
	}
	return env
}
