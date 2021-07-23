# FROM bitnami/mongodb:4.4.4 AS mdb
# WORKDIR /usr/local/bin

FROM node:14
USER root
WORKDIR /app
# COPY --from=mdb /opt/bitnami/mongodb/bin/* /usr/local/bin/
COPY . /app
RUN npm install concurrently
RUN npm run parallel-install
RUN npm run parallel-build
