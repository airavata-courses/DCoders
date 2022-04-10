## Continuous deployment using Concourse CI/CD tool

### Pipelines

```api-gateway``` | ```data-source``` | ```user-management``` | ```merra-data-source```

- Pipeline for each service resides under directory ``deployment_scripts/concourse_cd``

#### Concourse Installation

- We are using concourse as a service
- Concourse is deployed in K8S using helm chart
- ``$ helm repo add concourse https://concourse-charts.storage.googleapis.com/``
- ``$ helm install my-release concourse/concourse``
- Create K8S cluster secrets for concourse to connect to cluster for deployment
- Resource used: ``{git, kudohn/concourse-k8s-resource}``


##### For more details on [concourse](https://concourse-ci.org/docs.html)