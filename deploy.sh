#!/bin/bash
set -e

echo "===== Desplegando release MERN Shop ====="

# Si Jenkins no define WORKSPACE por alguna razón, usamos el directorio actual
WORKSPACE_DIR="${WORKSPACE:-$(pwd)}"

# Carpetas de despliegue DENTRO del workspace (usuario jenkins tiene permisos aquí)
DEPLOY_DIR="$WORKSPACE_DIR/deploy"
APP_DIR="$WORKSPACE_DIR/application"

echo "WORKSPACE_DIR: $WORKSPACE_DIR"
echo "DEPLOY_DIR:    $DEPLOY_DIR"
echo "APP_DIR:       $APP_DIR"

mkdir -p "$DEPLOY_DIR"
mkdir -p "$APP_DIR"

echo "Buscando archivo .zip de la release en el workspace..."

# Detectamos automáticamente el ZIP (release.zip, proyecto-ecommerce.zip, etc.)
ZIP_FILE=$(ls "$WORKSPACE_DIR"/*.zip 2>/dev/null | head -n 1 || true)

if [ -z "$ZIP_FILE" ]; then
  echo "ERROR: No se encontró ningún archivo .zip en $WORKSPACE_DIR"
  echo "Verifica que en el Jenkinsfile se esté creando el ZIP en la raíz del workspace."
  exit 1
fi

echo "ZIP encontrado: $ZIP_FILE"

echo "Copiando ZIP a $DEPLOY_DIR..."
cp "$ZIP_FILE" "$DEPLOY_DIR/"

BASENAME_ZIP=$(basename "$ZIP_FILE")

echo "Descomprimiendo $BASENAME_ZIP en $APP_DIR ..."
unzip -o "$DEPLOY_DIR/$BASENAME_ZIP" -d "$APP_DIR/"

echo "===== Despliegue completado con éxito ====="
