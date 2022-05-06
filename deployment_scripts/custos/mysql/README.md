### Deploy MySQL
- Create volumes
- ``kubectl apply -f pv.yaml,pv1.yaml``
- Install MySQL using helm
  ``` kubernetes helm
      kubectl create namespace custos
      helm install mysql bitnami/mysql -f values.yaml -n custos --version 8.8.8
  ```
