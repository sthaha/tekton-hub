
## Deploy Application on CRC


### Setup CRC

TODO: links to CRC setup
Follow CRC setup guidelines to setup your development environment


### Fork And Clone

Fork and clone the repository

```
  git clone https://github.com/<your-user-name>/tekton-hub.git
```


### Run API Service

Export `KO_DOCKER_REPO` for ko to publish image to. E.g.

```
export KO_DOCKER_REPO=quay.io/<username>
```

`ko` resolve and apply the api

```
cd backend/api
ko resolve -f backend/api/config > api.yaml
oc apply -f api.yaml
```

Watch the pods until `db` is running. `api` pod will fail at this stage as
`db` is not created yet.

```
oc get pods -o wide -w
```



At this stage the `deployement` `db` should be up and running.

#### Create Database

Ensure `db` pod is running
```
$ oc get pods

NAME                   READY   STATUS    RESTARTS   AGE
api-6675fbf9f5-fft4h   0/1     Error     3          72s
db-748f56cb8c-rwqjc    1/1     Running   1          72s

```

Create database by port-forwarding db service

```
oc port-forward svc/db 5432:5432
```

On a different terminal, use `psql` to create and load the database

```
psql -h localhost -U postgres -p postgres -c 'create database tekon_hub;'
psql -h localhost -U postgres -p postgres tekton_hub < backups/02-01-2020.dump
```

At this stage, `api` should be in Running state

```
$ oc get pods

NAME                   READY   STATUS    RESTARTS   AGE
api-6675fbf9f5-fft4h   0/1     Running   3          72s
db-748f56cb8c-rwqjc    1/1     Running   1          72s

```
NOTE: you may want to end the port-forward session

#### Verify if api route is accessible


```
curl -kL https://api-tekton-hub.apps-crc.testing/resources
```

## Run Validation Service


Create an empty database using command :

* create database <database_name>

Restore the latest database backup by executing the following command:
* psql -h HOST -p PORT -U USER_NAME DATABASE_NAME < latest_database_backup.dump path
* E.g : psql -h localhost -p 5432 -U postgres test < backups/02-01-2020.dump

## Step 3 : Running validation
Navigate to the validation folder, install the dependency and run the validation service :
* 	cd backend/validation
* 	go mod download
* go run main.go


## Step 4 : Running backend
Navigate to the backend service
* 	cd backend/api

Create a .env file with following details in /backend folder
* GITHUB_TOKEN=""
* POSTGRESQL_USERNAME=""
* POSTGRESQL_PASSWORD=""
* POSTGRESQL_DATABASE=""
* HOST="localhost"
* PORT=5432
* CLIENT_ID=""
* CLIENT_SECRET=""
* VALIDATION_API=""

Run the backend service :
* 	go mod download
* 	go run cmd/main.go

## Step 5 : Running frontend
Navigate to the frontend folder
* 	cd frontend

Create a .env file in the frontend folder and give the backend route as REACT_APP_BACKEND_API

* E.g REACT_APP_BACKEND_API = <backend route>

* npm start

