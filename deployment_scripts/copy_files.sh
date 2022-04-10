#!/bin/sh

mkdir -p deploy-files/datasource_service
mkdir -p deploy-files/api_gateway
#mkdir -p deploy-files/weather_ui
mkdir -p deploy-files/UserManagement
echo "Current directory of the task"
pwd
echo "Begin copying the deployment scripts to current job's container from resource container"

cp -rf git-ds/datasource_service/k8s_deployments/* deploy-files/datasource_service/
cp -rf git-ds/api_gateway/k8s_deployments/* deploy-files/api_gateway/
#cp -rf ../weather_ui/k8s_deployments/* deploy-files/weather_ui/
cp -rf git-ds/UserManagement/k8s_deployments/* deploy-files/UserManagement/

ls deploy-files/*
pwd
