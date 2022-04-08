#!/bin/sh

mkdir -p deploy-files
echo "Current directory of the task"
pwd
echo "Begin copying the deployment scripts to current job's container from resource container"

cp -rf git-ds/datasource_service/k8s_deployments/* deploy-files/

ls deploy-files/*
pwd
