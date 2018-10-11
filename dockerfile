FROM node:10-alpine
LABEL MAINTAINER="briangonzalez squaredlabs"
LABEL version="1.1"

# Create app directory
RUN mkdir -p /app
COPY . /app


# Expose the app port
ENV HOST 0.0.0.0
EXPOSE 3000

ARG autobuild=yes
ENV autobuild ${autobuild}

# Copy files.

COPY . /app
WORKDIR /app
RUN apk --no-cache add --virtual .build-dependencies python gcc g++ make \
  && npm install --strip . \
  && npm cache clean --force \
  && apk del .build-dependencies
WORKDIR /app


RUN if [ "${autobuild}" = "yes" ]; then ./node_modules/.bin/nuxt build; fi



CMD ["npm", "start"]
