all:
	@echo 'Usage: make [build]'

build:
	# Deployment
	docker build -t portal:latest .

run:
	# Deployment
	docker run -d --rm -p 3000:80 portal:latest
