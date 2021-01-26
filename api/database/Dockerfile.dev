FROM mysql:8.0
WORKDIR /docker-entrypoint-initdb.d

COPY ./config.cnf /etc/mysql/conf.d

COPY ./schema.sql .
