###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# FROM node:18 As development
# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# # Create app directory
# WORKDIR /usr/src/app


# COPY --chown=node:node package*.json ./
# # COPY --chown=node:node package.json pnpm-lock.yaml ./
# # COPY --chown=node:node pnpm-lock.yaml ./
# COPY --chown=node:node .env.development ./.env

# # Копирование скрипта
# COPY bash_aliases.sh /bash_aliases.sh

# # Делаем скрипт исполняемым
# RUN chmod +x /bash_aliases.sh
# RUN echo "source /bash_aliases.sh" >> /root/.bashrc

# RUN npm install
# RUN npx prisma generate

# COPY --chown=node:node . .
# RUN chmod +x /usr/src/app/start-dev.sh
# RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app/dist

# USER root
# CMD ["/usr/src/app/start-dev.sh"]

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]