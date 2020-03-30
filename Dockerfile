FROM node:12 as build
RUN mkdir /app
ADD src /app/src/
ADD public /app/public/
COPY package.json yarn.lock tsconfig.json /app/
WORKDIR /app
RUN yarn install
RUN yarn build
FROM nginx:stable
EXPOSE 80
COPY --from=build /app/build /var/www/
COPY nginx-conf/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g","daemon off;"]
