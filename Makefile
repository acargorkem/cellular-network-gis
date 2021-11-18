run:
	docker pull acargorkem/cellular-app:frontend
	docker pull acargorkem/cellular-app:backend
	docker-compose -f docker-compose.prod.yml up
stop:
	docker-compose -f docker-compose.prod.yml down
log:
	docker-compose -f docker-compose.prod.yml logs -t -f

run-dev:
	docker-compose -f docker-compose.dev.yml up
stop-dev:
	docker-compose -f docker-compose.dev.yml down
log-dev:
	docker-compose -f docker-compose.dev.yml logs -t -f

build-dev:
	docker-compose -f docker-compose.dev.yml up --build