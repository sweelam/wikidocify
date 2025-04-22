.PHONY: build run clean docker-up docker-down

build:
	go build -o bin/wiki-app ./cmd/. 

docker-up: 
	docker compose up -d

docker-down:
	docker compose down 

run: build docker-up
	sleep 10
	./bin/wiki-app

clean:
	rm -rf bin/
	docker compose down -v
