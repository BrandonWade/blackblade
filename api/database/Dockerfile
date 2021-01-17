FROM mysql:5.7
WORKDIR /docker-entrypoint-initdb.d

COPY ./config.cnf /etc/mysql/conf.d

COPY ./schema.sql .
