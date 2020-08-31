FROM mysql:5.7
WORKDIR /docker-entrypoint-initdb.d

COPY ./schema.sql .

CMD ["mysqld", "--sql_mode="]
