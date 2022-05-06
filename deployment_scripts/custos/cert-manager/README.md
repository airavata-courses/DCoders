### Deploy Cert Manager
- ```kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.8.0/cert-manager.yaml```
  
  [cert-manager](https://cert-manager.io/docs/installation/kubectl/)

- Create Cluster Issuer
  ```kubectl apply -f issuer.yaml```
