all:
	@echo 'Usage: make [build]'

check:
	npm audit
	CI=true npm test -- --coverage


build:
	# Deployment
	docker build -t portal:latest .

run:
	# Deployment
	docker run -d --rm -p 3000:80 portal:latest
