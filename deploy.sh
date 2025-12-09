#!/bin/bash
set -e

echo "===== Desplegando release MERN Shop ====="

DEPLOY_DIR="/opt/deploy"
APP_DIR="/opt/application"

# Crear carpetas (si no existen)
mkdir -p "$DEPLOY_DIR"
mkdir -p "$APP_DIR"

# Copiar artefacto generado por el pipeline
cp release.zip "$DEPLOY_DIR/"

echo "Descomprimiendo release.zip en $APP_DIR ..."
unzip -o "$DEPLOY_DIR/release.zip" -d "$APP_DIR/"

echo "===== Despliegue completado ====="
