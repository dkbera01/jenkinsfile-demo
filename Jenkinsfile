pipeline {
    agent any

    environment {
        FLASK_APP_DIR = 'flask-app'
        EXPRESS_APP_DIR = 'express-app'
        FLASK_VENV_PATH = "${FLASK_APP_DIR}/venv"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Repository') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/dkbera01/jenkinsfile-demo.git']],
                    extensions: [[$class: 'WipeWorkspace']]
                ])
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
                        sudo -u ubuntu pm2 delete flask-app || true
                        sudo -u ubuntu pm2 start app.py --interpreter python3 --name flask-app --update-env
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
                    sh '''
                        sudo -u ubuntu pm2 delete express-app || true
                        sudo -u ubuntu pm2 start app.js --name express-app --update-env
                    '''
                }
            }
        }

        stage('Confirm PM2 Process List') {
            steps {
                sh 'pm2 list'
                sh 'which pm2'
                sh 'whoami'
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
