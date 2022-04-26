## Goal: Continuous deployment using Concourse CI/CD tool

### Pipelines

```api-gateway``` | ```data-source``` | ```user-management``` | ```merra-data-source```

- Pipeline for each service resides under directory ``deployment_scripts/concourse_cd``

#### Concourse Installation

- We are using concourse as a service
- Concourse is deployed in K8S using helm chart
- ``$ helm repo add concourse https://concourse-charts.storage.googleapis.com/``
- ``$ helm install my-release concourse/concourse``
- Create K8S cluster secrets for concourse to connect to K8S cluster for deployment


#### Concourse definitions

- Define resource types and resources

  : Resource Type -
    - Kubernetes docker resource to deploy the applications to k8s cluster
    - We used resource type {kudohn/concourse-k8s-resource}
    ```yaml
    resource_types:
    - name: k8s
      type: docker-image
      source:
        repository: kudohn/concourse-k8s-resource
    ```


  : Resources -
    - We need explicitly define the resource types, which are declared before we can use them. so we are going to tell concourse that we want to use kubernetes external resource ``{kudohn/concourse-k8s-resource}``
    - we are using ```{git}``` resource supported by concourse which will pull the code from code repositories and we are using gitHub in our case
    - We are using ```{registry-image}``` resource to build and publish our docker image to docker-hub
    - We are using ``` {k8s} ``` reource, as defined above in the resource type section to connect to k8s cluster and deploy applications
    ```yaml
    resources:
    - name: git-ds
      type: git
      icon: git
      source:
        uri: https://github.com/airavata-courses/DCoders.git
        branch: feature/30-implement-cd

    # Where we will push the image
    - name: publish-image
      type: registry-image
      icon: docker
      source:
        repository: vinayakasgadag/decoders-datasource
        tag: milestone-3
        username: vinayakasgadag
        password: ((k8s-secret.docker-hub-pwd))

    - name: k8s
      type: k8s
      icon: kubernetes
      source:
        api_server_url: ((k8s-secret.k8s-cluster-url))
        api_server_cert: ((k8s-secret.api_server_cert))
        client_cert: ((k8s-secret.client_cert))
        client_key: ((k8s-secret.client_key))
        skip_tls_verify: false
     ```
     
  : Jobs -
    - Jobs are resposible for creating the required tasks (defined in job definition) to run the pipeline
    - Jobs have stages(plan) and tasks
    - Stage or plan: it can be defined to be dependent on previous stage and run only if it is successful
    - Task: Useful when we want to run some scripts to achieve somehting before the job can be run
    ```yaml
    jobs:
    - name: "build-publish"
      public: true
      serial: true
      plan:
        - get: git-ds
          trigger: true
        - task: build-image-task
          privileged: true
          config:
            platform: linux
            image_resource:
              type: registry-image
              source:
                repository: vito/oci-build-task
            inputs:
              - name: git-ds
            outputs:
              - name: image
            params:
              CONTEXT: git-ds/datasource_service
              UNPACK_ROOTFS: true
            run:
              path: build
        - put: publish-image
          params:
            image: image/image.tar

    - name: "deploy-application"
      plan:
        - get: git-ds
          passed: ["build-publish"]
        - task: create-deploy-scripts
          config:
            platform: linux
            image_resource:
              type: docker-image
              source: {repository: busybox}
            inputs:
              - name: git-ds
            outputs:
              - name: deploy-files
            run:
              path: git-ds/deployment_scripts/copy_files.sh

        - put: k8s
          params:
            status_check_timeout: 60
            command_timeout: 30
            paths:
              - deploy-files/datasource_service/deployment.yaml
              - deploy-files/datasource_service/service.yaml
              - deploy-files/datasource_service/autoscaler.yaml
            watch_resources:
              - name: datasource-deployment
                kind: Deployment
    ```


##### Example view of concurse dashboard
<img width="1117" alt="Screen Shot 2022-04-21 at 3 24 38 PM" src="https://user-images.githubusercontent.com/52463165/164537737-15ed588b-54ac-4287-b495-29dbce79c9ed.png">

    
##### Why Concourse?
  - The beauty of the concourse is the declarative appraoch and the flexibility to automate the builds the way we want to using the resources, jobs and task concpets
  - We don't need ansible or any other tool to automate the deployments since concourse supports it through the resources
  - Concourse can be run as individual standalone cluster or as a distributed system as service inside the kubernetes cluster, which will scale horizontally as the number of pipeline or the job increses, and this is a very big advantage comparing to Jenkins or any other tools


##### For more details on [concourse](https://concourse-ci.org/docs.html)
