pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar dependencias') {
            steps {
                sh '''
                  echo "===== Instalando dependencias del backend ====="
                  cd backend
                  npm install

                  echo "===== Instalando dependencias del frontend ====="
                  cd ../frontend
                  npm install
                '''
            }
        }

        stage('Build frontend') {
            steps {
                sh '''
                  echo "===== Construyendo frontend (React) ====="
                  cd frontend
                  npm run build
                '''
            }
        }

        stage('Empaquetar release') {
            steps {
                sh '''
                  echo "===== Empaquetando release ====="

                  rm -rf release
                  mkdir -p release/backend release/frontend

                  echo "Copiando backend..."
                  cp -r backend/* release/backend/

                  echo "Copiando build del frontend..."
                  cp -r frontend/build release/frontend/build

                  echo "Generando release.zip..."
                  rm -f release.zip
                  zip -r release.zip release

                  echo "===== release.zip generado ====="
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  echo "===== Ejecutando deploy.sh ====="
                  chmod +x deploy.sh
                  ./deploy.sh
                '''
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'release.zip', fingerprint: true
            echo "Release generado y desplegado correctamente."
        }
        failure {
            echo "El pipeline de release ha fallado."
        }
    }
}
