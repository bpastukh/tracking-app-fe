FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.19
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY ./provision/nginx.conf /etc/nginx/conf.d/default.conf
