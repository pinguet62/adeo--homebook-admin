# Usage:
# > docker build -t homebook-admin .
# > docker run -p 8080:80 homebook-admin
# > http://localhost:8080

FROM nginx:1.15.5-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist/homebook-admin /usr/share/nginx/html
