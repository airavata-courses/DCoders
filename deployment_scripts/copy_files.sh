#!/bin/sh

mkdir -p deploy-files

cp -rf git-ds/datasource_service/k8s_deployments/* deploy-files/

ls deploy-files/*
pwd
