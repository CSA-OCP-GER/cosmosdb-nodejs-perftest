# Stress-testing CosmosDB (SQL) with NodeJS / K8s #

This app uses a sample JSON document and adds it to a CosmosDB instance n times, depending on some environment variables the app expects (.env template included):

- ```HOST```: ComsosDB URL
- ```DATABASE```: CosmosDB database name
- ```AUTHKEY```: CosmosDB authentication key
- ```COLLECTION```: CosmosDB collection name
- ```COUNT```: number of documents the application tries to insert in a loop

The repository also contains a Kubernetes job template, where the application can be scaled to a number of parallel running jobs/pods (please see _jobtemplate.yaml_ --> property ```parallelism```)