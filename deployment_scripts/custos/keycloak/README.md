### Deploy Postgresql
 - First step in the keycloak deployment process is to install Postgresql

#### Create PersistentVolumes
 - ``` kubernetes helm
   kubectl apply -f pv.yaml
   kubectl apply -f pv1.yaml
   kubectl apply -f pv2.yaml
   ```
 - Deploy Postgresql
   ``` kubernetes helm
   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm repo update
   kubectl create namespace keycloak
   helm install keycloak-db-postgresql bitnami/postgresql -f postgresql-values.yaml -n keycloak --version 10.12.3   
   ```
