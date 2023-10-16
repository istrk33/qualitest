ALTER DATABASE template1 REFRESH COLLATION VERSION;
SELECT 'CREATE DATABASE clean_archi_postgres_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'clean_archi_postgres_test')\gexec

GRANT ALL PRIVILEGES ON DATABASE "clean_archi_postgres_test" to clean_archi_postgres;