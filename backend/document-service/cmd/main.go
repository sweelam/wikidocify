package main

func main() {
	server := Server{}
	server.StartDb()
	server.Start()
}
