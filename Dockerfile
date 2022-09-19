# Stage 1 - Create yarn install skeleton layer
FROM node:16-bullseye-slim AS packages

WORKDIR /app
COPY package.json yarn.lock ./

COPY packages packages

# Comment this out if you don't have any internal plugins
COPY plugins plugins

RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -exec rm -rf {} \+

# Stage 2 - Install dependencies and build packages
FROM node:16-bullseye-slim AS build

WORKDIR /app


COPY --from=packages /app .

# install sqlite3 dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev python3 build-essential && \
    yarn config set python /usr/bin/python3

RUN yarn install --frozen-lockfile --network-timeout 600000 && rm -rf "$(yarn cache dir)"

COPY . .

RUN yarn tsc
RUN yarn --cwd packages/backend build
# If you have not yet migrated to package roles, use the following command instead:
# RUN yarn --cwd packages/backend backstage-cli backend:bundle --build-dependencies

# Stage 3 - Build the actual backend image and install production dependencies
FROM node:16-bullseye-slim

WORKDIR /app

# install sqlite3 dependencies, you can skip this if you don't use sqlite3 in the image
RUN apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev python3 build-essential && \
    rm -rf /var/lib/apt/lists/* && \
    yarn config set python /usr/bin/python3

# Copy the install dependencies from the build stage and context
COPY --from=build /app/yarn.lock /app/package.json /app/packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

RUN yarn install --frozen-lockfile --production --network-timeout 600000 && rm -rf "$(yarn cache dir)"

# Copy the built packages from the build stage
COPY --from=build /app/packages/backend/dist/bundle.tar.gz .
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

# Copy any other files that we need at runtime
COPY app-config.yaml ./
COPY app-config.local.yaml ./
COPY entrypoint.sh ./

RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install mkdocs-techdocs-core==1.0.1 && \
    chmod -R 775 /app

ENV APP_ROOT=/app
RUN useradd -u 1001 -r -g 0 -d ${HOME} -s /sbin/nologin \
    -c "Default Application User" default && \
    chown -R 1001:0 ${APP_ROOT} && chmod -R ug+rwx ${APP_ROOT}

USER 1001


# ENTRYPOINT [ "bash", "-c", "sleep 600" ]
ENTRYPOINT [ "bash", "-c", "if [[ -f /vault/secrets/env ]]; then source /vault/secrets/env; fi && if [[ -f /opt/env/ensemble-env ]]; then source /opt/env/ensemble-env; fi && ./entrypoint.sh ${DEPLOYMENT_ENV:=production}" ]
