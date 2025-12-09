pipeline {
    agent any

    environment {
        NODE_ENV = "production"
    }

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
                    npm install --legacy-peer-deps

                    echo "===== Instalando dependencias del frontend ====="
                    cd ../frontend
                    npm install --legacy-peer-deps
                '''
            }
        }

        stage('Build frontend') {
            steps {
                sh '''
                    echo "===== Build frontend ====="
                    cd frontend
                    npm run build
                '''
            }
        }

        stage('Empaquetar release') {
            steps {
                sh '''
                    echo "===== Empaquetando release ====="
                    cd ..
                    zip -r release.zip backend frontend
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
            echo 'El pipeline de release terminó OK.'
        }
        failure {
            echo 'El pipeline de release ha fallado.'
        }
    }
}
