# Node Rest API + JWT in TypeScript

- This is a **Node Rest Api** written in **Typescript**.  
- Routes can be protected with **JWT tokens**.
- Authentification with Passport. 

# How it works

- The API dispatches requests with well structured **routes**.
- Routes are using **controllers** for API implementations.
- Controllers are using **models** for Mongo persistence.
- Routes can be protected with **JWT authentification middelwares** :

# Installation
- Clone the repository
```
git clone https://github.com/rajeevverma076/apiems.git
```
- Install dependencies
```
cd apiems
npm install
npm run build
"start": "npm run serve",
```
- Launch demo Node and Mongo server in docker containers
```
docker-compose build
docker-compose up
```
( *Alternatively, you can run and configure your local or cloud Mongo server and start Node server with
`npm run build && npm start`*)

Please check package.json for other useful npm scripts  (for example typescript and nodemon watchers in development)


# Getting started
npm install ts-node --save-dev
npm install typescript -g 
npm install typescript --save-dev

## Step1 : Register a user
Send a POST request to `http://localhost:3000/api/user/register` 
with the following payload ** :
```json
{
	"username": "rajeev",
	"password": "pass",
	"role":"superadmin",
	"email":"rajeev@mailinator.com"
}
```
You should get a JWT token in the response :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lMiIsImlhdCI6MTU1MDU4MTA4NH0.WN5D-BFLypnuklvO3VFQ5ucDjBT68R2Yc-gj8AlkRAs"
}
```

> **Note  - Please protect your registration API if you do not use any third-party identity provider !!.
##http://13.235.92.27/img/logo.png
## Step2 : Create a District
Send a POST request to `http://localhost:3000/api/Districts` 
with the following payload :
```json
{
  "DistrictId": "1",
  "name": "gaya"
}
``` 
You should get an authorization **denied** !
```json
{
  "status": "error",
  "code": "unauthorized"
}
```
Add the JWT token to the Authorization header :
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lMiIsImlhdCI6MTU1MDU4MTA4NH0.WN5D-BFLypnuklvO3VFQ5ucDjBT68R2Yc-gj8AlkRAs
```
You should have created the District !!
```json
{
  "data": {
    "_id": "5c6c0845e3eb8302ffd168c0",
    "DistrictId": "1",
     "name": "gaya",
     "__v": 0
  }
}
```
# Save into dependencies 
# npm install lodash --save
# Save into dev dependencies 
# npm install @types/lodash --save-dev

# https://stackoverflow.com/questions/28632338/how-to-design-an-election-poll-database
# db.getCollection('voters').find({});
# db.getCollection('voters').getIndexes();
# db.getCollection('voters').dropIndex('name_text');
# db.getCollection('voters').createIndex({"name":"text", "building_no":"text","apartment":"text","address":"text","street_name": "text"});
