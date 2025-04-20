.PHONY: build run clean docker-up docker-down

build:
	go build -o bin/wiki-app ./cmd/. 

docker-up: 
	podman-compose up -d

docker-down:
	podman-compose down 

run: build docker-up
	sleep 10
	./bin/wiki-app

clean:
	rm -rf bin/
	podman-compose down -v
