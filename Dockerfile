FROM jenkins/jenkins:lts

USER root

# Instalar herramientas necesarias dentro de Jenkins:
# - zip / unzip para generar releases
# - curl, ca-certificates, gnupg para agregar repo de Docker
RUN apt-get update && \
    apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        unzip \
        zip && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg \
        | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
        > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce-cli && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Permitir que el usuario jenkins use el socket de Docker del host
RUN groupadd -f docker && \
    usermod -aG docker jenkins

# Apuntar al socket de Docker del host (lo montaremos con -v /var/run/docker.sock)
ENV DOCKER_HOST=unix:///var/run/docker.sock

USER jenkins
