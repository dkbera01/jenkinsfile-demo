pipeline {
    agent any

    environment {
        BASE_DIR = '/home/ubuntu/jenkinsfile-demo'
        FLASK_APP_DIR = "${BASE_DIR}/flask-app"
        EXPRESS_APP_DIR = "${BASE_DIR}/express-app"
        FLASK_VENV_PATH = "${FLASK_APP_DIR}/venv"
    }

    triggers {
        githubPush()
    }

    stages {
        // stage('Clean Custom Workspace') {
        //     steps {
        //         // sh 'sudo rm -rf /home/ubuntu/*'
        //     }
        // }

        stage('Clone Repository to Custom Path') {
            steps {
                dir('/home/ubuntu') {
                    git branch: 'main', url: 'https://github.com/dkbera01/jenkinsfile-demo.git'
                }
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
                    sh '''
                        pm2 delete express-app || true
                        pm2 start app.js --name express-app
                    '''
                }
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
