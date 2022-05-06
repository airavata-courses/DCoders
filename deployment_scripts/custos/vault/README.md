### Deploy Vault

``` kubernetes helm
    helm install vault hashicorp/vault --namespace vault -f values.yaml --version 0.10.0
```
 - Update hostname in ingress.yaml to the master node hostname

   ``kubectl apply -f ingress.yaml -n vault``

#### Generate root token and key to initiate the vault instance
