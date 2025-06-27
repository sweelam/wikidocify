package middleware

import (
	"log"
	"time"

	"github.com/labstack/echo/v4"
)

func Logger(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		start := time.Now()

		// Set a request ID for tracking
		requestID := c.Request().Header.Get("X-Request-ID")
		if requestID == "" {
			requestID = generateRequestID() // Implement this function
		}

		c.Set("RequestID", requestID)

		// Process request
		err := next(c)

		// After request is handled
		duration := time.Since(start)
		status := c.Response().Status

		log.Printf("[%s] %s %s %d %v",
			requestID,
			c.Request().Method,
			c.Request().URL.Path,
			status,
			duration,
		)

		// For collaborative system, you might want to log the user
		if user, ok := c.Get("user").(string); ok {
			log.Printf("[%s] User: %v", requestID, user)
		}

		return err
	}
}

func generateRequestID() string {
	// Implementation to generate a unique request ID
	return time.Now().Format("20060102150405") + "-" + randomString(6)
}

func randomString(n int) string {
	// Implementation to generate random string
	// For simplicity, returning a placeholder
	return "abc123"
}
