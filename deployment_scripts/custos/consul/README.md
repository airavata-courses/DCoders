### Deploy and configure consul

#### Add hashicorp help repo
``` kubernetes helm
   helm repo add hashicorp https://helm.releases.hashicorp.com
   helm repo update
```

#### Create directory ``/hashicorp/consul/data`` in all the nodes
     - sudo mkdir -p /hashicorp/consul/data
     - change the permissions sudo chmod 777 -R /hashicorp

#### Run the below commands
``` kubernetes helm
   kubectl apply -f pv.yaml,pv1.yaml
   kubectl apply -f storage.yaml
   kubectl create namespace vault
   helm install consul hashicorp/consul --version 0.31.1 -n vault --values config.yaml
```
