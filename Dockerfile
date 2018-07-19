# Usage:
# > docker build -t homebook-admin .
# > docker run -p 8080:80 homebook-admin
# > http://localhost:8080

FROM nginx:1.15.5-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist/homebook-admin /usr/share/nginx/html

CMD \
  echo "{" > /usr/share/nginx/html/assets/config.json && \
  env | grep "^HOMEBOOK_" | cut -c 5- | sed -e 's/^/    "/' | sed -e 's/=/": "/' | sed -e 's/$/"/' | sed -e '$! s/$/,/' >> /usr/share/nginx/html/assets/config.json && \
  echo "}" >> /usr/share/nginx/html/assets/config.json && \
  # Default nginx CMD
  /usr/sbin/nginx -g "daemon off;"
