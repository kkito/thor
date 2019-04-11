pipeline {
    agent none
    stages {
        stage('Test') {
            agent {
                docker {
                    image 'node:8-alpine'
                    args '-v $HOME/.yarn:/usr/local/share/.cache/yarn/v2'
                }
            }
            steps {
                sh 'yarn'
                sh 'npm run test'
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:8-alpine'
                    args '-v $HOME/.yarn:/usr/local/share/.cache/yarn/v2'
                }
            }
            steps {
                sh 'yarn'
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
            post {
                failure {
                    // recipientProviders: [[$class: 'CulpritsRecipientProvider']]
                    // recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                    // to: "kk@littlelights.ai"
                    emailext (
                        subject: "Build Fail:'${env.JOB_NAME}[${env.BUILD_NUMBER}]'",
                        body: "<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p> <p>Check console output at <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>",
                        recipientProviders: [[$class: 'CulpritsRecipientProvider']]
                    )
                    sh 'exit 1'
                }
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'node:8-alpine'
                    args '-v $HOME/.yarn:/usr/local/share/.cache/yarn/v2'
                }
            }
            when {
                anyOf {
                    branch 'master'
                }
            }
            steps {
                echo "no test skip"
            }
        }
    }
}
