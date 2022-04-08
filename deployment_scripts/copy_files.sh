#!/bin/sh

mkdir -p deploy-files

cp -rf datasource_service/k8s_deployments/* deploy-files/

ls deploy-files/*
