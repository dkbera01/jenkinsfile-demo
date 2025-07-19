pipeline {
    agent any
    environment {
        FLASK_APP_DIR = '/home/ubuntu/jenkinsfile-demo/flask-app'
        VENV_PATH = "${FLASK_APP_DIR}/venv"
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/dkbera01/jenkinsfile-demo.git'
            }
        }

        stage('Install Flask Dependencies') {
            steps {
                sh '''
                    cd $FLASK_APP_DIR
                    python3 -m venv venv
                    source venv/bin/activate
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Deploy Flask App') {
            steps {
                dir('flask-app') {
                    sh 'pm2 restart flask-app || pm2 start app.py --interpreter python3 --name flask-app'
                }
            }
        }

        stage('Install Express Dependencies') {
            steps {
                dir('express-app') {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy Express App') {
            steps {
                dir('express-app') {
                    sh 'pm2 restart express-app || pm2 start app.js --name express-app'
                }
            }
        }
    }
}
post {
        always {
            echo 'Cleaning up...'
            sh 'pm2 save'
        }
        failure {
            echo 'Build failed!'
        }
        success {
            echo 'Build succeeded!'
        }
        unstable {
            echo 'Build is unstable!'
        }
        changed {
            echo 'Build status changed!'
        }
        aborted {
            echo 'Build was aborted!'
        }
}
