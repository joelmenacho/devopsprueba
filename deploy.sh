#!/bin/bash
set -e

echo "===== Desplegando release MERN Shop ====="

DEPLOY_DIR="/opt/deploy"
APP_DIR="/opt/application"

mkdir -p "$DEPLOY_DIR"
mkdir -p "$APP_DIR"

cp release.zip "$DEPLOY_DIR/"

echo "Descomprimiendo release.zip en $APP_DIR ..."
unzip -o "$DEPLOY_DIR/release.zip" -d "$APP_DIR/"

echo "===== Despliegue completado ====="
