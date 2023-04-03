---
title: "Jenkins-CI/CD-part-1"
description: "https&#x3A;//www.jenkins.io/doc/pipeline/tour/getting-started/code-deployment and review-automated-continuous-tool-pluginpipeline-build-processSuite o"
date: 2022-09-28T23:56:48.300Z
tags: []
---
### 기본 설치
https://www.jenkins.io/doc/pipeline/tour/getting-started/

### Jenkins Pipeline
code-deployment and review-automated-continuous-tool-plugin
pipeline-build-process

- Suite of plugins that support implementing and integrating continuous delivery pipelines to jenkins
- CD(continuous delivery) pipeline (entire build process) = automated process of getting software from Version Control right to users and customers. 
- Every commit -> allows easy test(review) to deployment through pipeline DSL syntax (Jenkinsfile) 

### Benefits of pipeline
- allows source control, edit review of delivery pipeline file - code
- is durable during restarts of Jenkins controller - durable
- can stop and wait for human input/approval before continuing pipeline - pausable
- can fork/join, loop, work in parallel - versatile
- supports extensions to DSL, other plugins - extensible

Sample
![](/images/3ebca051-47b0-4f42-b0e6-a5f914d8cb61-image.png)

### Syntax
Declarative
```js
pipeline {
    agent any // Execute pipleine or any of its stages
    stages {
        stage('Build') { // Define Build stage
            steps {
                // Performs steps IN 'Build' stage
            }
        }
        stage('Test') { 
            steps {
                // Performs steps IN 'Test' stage
            }
        }
        stage('Deploy') { 
            steps {
                // Performs steps IN 'Deploy' stage
            }
        }
    }
}
```
Scripted
```js 
node {  // Execute pipleine or any of its stages
    stage('Build') { 
        // Performs steps IN 'Build' stage
    }
    stage('Test') { 
        // Performs steps IN 'Test' stage
    }
    stage('Deploy') { 
        // Performs steps IN 'Deploy' stage
    }
}
```
Declartive Sample
```js
Jenkinsfile (Declarative Pipeline)
pipeline { // pipeline - Contain all content and instructions for executing pipeline
    agent any // agent - Instructs Jenkins to allocate executor and workspace for pipeline
    options {
        skipStagesAfterUnstable()
    }
    stages { // stages - describes stages of this Pipeline.
        stage('Build') { 
            steps { // Steps to be run in the stage
                sh 'make' // Executes shell command
            }
        }
        stage('Test'){
            steps {
                sh 'make check'
                junit 'reports/**/*.xml' // Make test reports
            }
        }
        stage('Deploy') {
            steps {
                sh 'make publish'
            }
        }
    }
}
```

DockerBuild
```js
agent {
    // Equivalent to "docker build -f Dockerfile.build --build-arg version=1.0.2 ./build/
    dockerfile {
        filename 'Dockerfile.build'
        dir 'build'
        label 'my-defined-label'
        additionalBuildArgs  '--build-arg version=1.0.2'
        args '-v /tmp:/tmp'
    }
}
```

Kubernetes Build
https://github.com/jenkinsci/kubernetes-plugin/blob/master/examples/kaniko.groovy


### TEST RUN
```js
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'echo "Fail!"; exit 1'
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
```
![](/images/ef160163-0f47-47f4-95c5-22b7a054a926-image.png)


![](/images/a31e5afd-cbec-43ac-a7bf-d2e9bf1ac9df-image.png)


### 출처 
https://www.jenkins.io/doc/pipeline/tour/getting-started/

https://www.jenkins.io/doc/book/pipeline/