pipeline {
    agent any

    environment {
        FLASK_APP_DIR = 'flask-app'
        EXPRESS_APP_DIR = 'express-app'
        FLASK_VENV_PATH = "${FLASK_APP_DIR}/venv"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/dkbera01/jenkinsfile-demo.git'
            }
        }

        stage('Install Flask Dependencies') {
            steps {
                dir("${FLASK_APP_DIR}") {
                    sh '''
                        python3 -m venv venv
                        . venv/bin/activate
                        pip install --upgrade pip
                        pip install -r requirements.txt
                    '''
                }
            }
        }

        stage('Deploy Flask App') {
            steps {
                dir("${FLASK_APP_DIR}") {
                    sh '''
                        pm2 delete flask-app || true
                        pm2 start app.py --interpreter python3 --name flask-app
                    '''
                }
            }
        }

        stage('Install Express Dependencies') {
            steps {
                dir("${EXPRESS_APP_DIR}") {
                    sh 'npm install --no-optional --silent'
                }
            }
        }

        stage('Deploy Express App') {
            steps {
                dir("${EXPRESS_APP_DIR}") {
                    timeout(time: 1, unit: 'MINUTES') {
                        sh 'npm install --no-optional'
                    }
                }
                sh '''
                    pm2 delete express-app || true
                    pm2 start app.js --name express-app
                '''
            }
        }

        stage('Confirm PM2 Process List') {
            steps {
                sh 'pm2 list'
            }
        }
    }

    post {
        always {
            echo 'Saving PM2 Process List'
            sh 'pm2 save'
        }
        success {
            echo '✅ Build and deployment succeeded!'
        }
        failure {
            echo '❌ Build failed. Check logs!'
        }
        unstable {
            echo '⚠️ Build is unstable!'
        }
        aborted {
            echo '⚠️ Build was aborted!'
        }
    }
}
