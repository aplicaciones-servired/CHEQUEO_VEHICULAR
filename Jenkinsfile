pipeline {
  agent any
    
  tools { nodejs 'node-v22' }

  environment { 
    ENV_CHEQUEO_CLIENT = credentials('ENV_CHEQUEO_CLIENT')
    ENV_CHEQUEO_API = credentials('ENV_CHEQUEO_API')
  }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
          def env_client = readFile(ENV_CHEQUEO_CLIENT)
          def env_api = readFile(ENV_CHEQUEO_API)
          writeFile file: './client/.env', text: env_client
          writeFile file: './server/.env', text: env_api
        }
      }
    }
    
    stage('Install dependencies') {
      steps {
        script {
          dir('client') {
            sh 'pnpm install'
          }
        }
      }
    }

    stage('Build client') {
      steps {
        script {
          dir('client') {
            sh 'pnpm build'
          }
        }
      }
    }

    stage('down docker compose'){
      steps {
        script { sh 'docker compose down' }
      }
    }

    stage('delete images if exist') {
      steps{
        script {
          def images = 'api-cheuqeo-v1.0'
          if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
            sh "docker rmi ${images}"
          } else {
            echo "Image ${images} does not exist."
            echo "continuing..."
          }
        }
      }
    }

    stage('run docker compose'){
        steps {
          script { sh 'docker compose up -d' }
          }
      }
    }
}
