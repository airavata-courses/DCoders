### Distributed system configurations and installation

This contains two components

- CI/CD using concourse 
  - Builds and deploy to kubernetes cluster
  - Cluster is running in JS2 instance
  - Cluster is configured using JS2 openstack [documentation](https://docs.jetstream-cloud.org/general/k8scluster/)

- Custos set up
  - Set up rancher
  - Create K8S cluster
  - Follow [custos](custos) guide for more details on installation
