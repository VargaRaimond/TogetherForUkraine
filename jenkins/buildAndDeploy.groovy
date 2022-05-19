pipeline {
    agent {
        label 'windows-agent'
    }

    parameters {
        gitParameter branchFilter: 'origin/(.*)',
                defaultValue: 'master',
                name: 'BRANCH',
                type: 'PT_BRANCH',
                sortMode: 'ASCENDING_SMART',
                selectedValue: 'DEFAULT',
                quickFilterEnabled: true
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${BRANCH}",
                        credentialsId: 'credentials-proiect',
                        url: 'https://github.com/VargaRaimond/TogetherForUkraine.git'
            }
        }

        stage('Build') {
            steps {
                sh "cd server && docker build . -t server"
                sh "cd client && docker build . -t client"
                sh "cd email-queue-consumer && docker build . -t rabbitmq-worker"
            }
        }
        stage('Deploy') {
            steps {
                sh "curl -XPOST http://localhost:9000/api/webhooks/e3a5b634-a065-49cf-bb38-a994deaa15f5"
                sh "curl -XPOST http://localhost:9000/api/webhooks/9ef1252e-c2a2-4398-b47f-70db2d90c287"
                sh "curl -XPOST http://localhost:9000/api/webhooks/56044040-ba54-41e4-86a2-05873cd63630"
            }
        }
    }
}