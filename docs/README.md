# Running the application locally : 

## Step 1: Getting the code base
Fork and clone the repository using the following command : 
```git clone https://github.com/<your-user-name>/tekton-hub.git```


## Step 2 : Running database
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

