FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./snippets/ssl-params.conf /etc/nginx/snippets/ssl-params.conf
COPY ./snippets/self-signed.conf /etc/nginx/snippets/self-signed.conf

COPY ./certs/nginx-selfsigned.key /etc/ssl/private/nginx-selfsigned.key
COPY ./certs/nginx-selfsigned.crt /etc/ssl/certs/nginx-selfsigned.crt
COPY ./certs/dhparam.pem /etc/ssl/certs/dhparam.pem

COPY ./www /usr/share/nginx/html

