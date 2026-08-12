# Container image for deploying to fly.io.
#
# Netlify and Cloudflare Pages understand "this is a static site" on their own.
# fly.io runs containers, so the whole job — build the site, then serve it —
# has to be spelled out here. Two stages: Node builds, nginx serves, and the
# Node toolchain is left behind so the shipped image is a few megabytes of
# nginx plus the built files rather than a 400 MB build environment.
#
# The build context is the REPOSITORY ROOT, not crimsonacademy-site/, because
# fly.toml sits at the root. That is why every source path below is prefixed
# with crimsonacademy-site/.

# ── stage 1: build ─────────────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Copy the manifests alone first. Docker caches this layer, so `npm ci` only
# re-runs when dependencies actually change — not on every content edit.
COPY crimsonacademy-site/package.json crimsonacademy-site/package-lock.json ./

# `ci` rather than `install`: it installs exactly what package-lock.json pins,
# so a deploy six months from now builds the same tree as today.
RUN npm ci

COPY crimsonacademy-site/ ./

# Runs `tsc && vite build` — a type error fails the deploy rather than shipping
# a broken site, which is the behaviour you want from a build server.
RUN npm run build

# ── stage 2: serve ─────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# The SPA fallback and cache headers. See deploy/nginx.conf — without the
# fallback, refreshing on /academics returns 404.
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# nginx:alpine's own entrypoint handles config templating and starts nginx in
# the foreground, which is what a Fly Machine needs (a process that does not
# daemonise and detach).
