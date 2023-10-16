start:
	@docker-compose stop && docker-compose up --build -d --remove-orphans && docker-compose logs clean-archi-nestjs -f

stop:
	@docker-compose stop

logs-nestjs:
	@docker-compose logs clean-archi-nestjs -f


generate-migrations:
	@docker-compose exec clean-archi-nestjs yarn typeorm:generate-migration ./src/modules/database/migration/$(filter-out $@,$(MAKECMDGOALS))

run-migrations:
	@docker-compose exec clean-archi-nestjs yarn typeorm:run-migrations

revert-migration:
	@docker-compose exec clean-archi-nestjs yarn typeorm:revert-migration

docker-prune:
	@docker system prune --all --force --volumes

u-test:
	@docker-compose exec clean-archi-nestjs yarn test $(filter-out $@,$(MAKECMDGOALS))

u-test-watch:
	@docker-compose exec clean-archi-nestjs yarn test:watch $(filter-out $@,$(MAKECMDGOALS))

# créé la bdd de test et run les tests e2e
i-test:
	@docker exec -u postgres clean-archi-postgres-db psql clean_archi_postgres clean_archi_postgres -f /docker-entrypoint-initdb.d/init-test-db.sql && docker-compose exec clean-archi-nestjs yarn test:e2e $(filter-out $@,$(MAKECMDGOALS))
	
commit:
	@git add . && yarn run cz