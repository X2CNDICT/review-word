FROM nginx
COPY dist/ /usr/share/nginx/dist/
COPY nginx.conf /etc/nginx/conf.d/default.conf