# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.18.1

FROM node:${NODE_VERSION}-alpine AS base

FROM base AS develop

# Use production node environment by default.
ENV NODE_ENV=development

WORKDIR /usr/src/app


# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
# if you need a deterministic and repeatable build create a
# package-lock.json file and use npm ci:
# RUN npm ci --omit=dev
# if you need to include development dependencies during development
# of your application, use:
# RUN npm install --dev

RUN npm install --omit=dev

# Copy local code to the container image.
COPY . ./

# Expose the port that the app runs on
# Run the web service on container startup.
CMD [ "node", "server.js" ]