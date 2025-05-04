.PHONY: build run clean docker-up docker-down


build:
	go build -o ../bin/wiki-app ../cmd/. 

docker-up: 
	podman-compose -f docker-compose.yaml up -d

docker-down:
	podman-compose -f docker-compose.yaml down 

run: build docker-up
	sleep 10
	../bin/wiki-app

clean:
	rm -rf ../bin/
	podman-compose -f docker-compose.yaml down -v
