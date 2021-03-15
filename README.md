# NodeJS Express authentication and authorization with middleware

## To run project

   - clone the repo 
   - run "npm install" 

## Endpoints

    Unauthenticated routes
     - For registration
        API: /api/users 
        Method: POST
        Request body : {
                        "email":"emial@122.com", // required
                        "password": "password" // required
                        "name":"name", // non required
                        "bio": "bio"  // non required
                       }
        Response body: {
                        "success": true,
                        "code": 201,
                        "message": "Success",
                        "data": {
                           "name": "name",
                           "email": "emial@122.com",
                           "_id": "604f39db1017f6cddaea4480",
                           "token": "{{token}}"
                           }
                       }

     - For login
        API: /api/users/authenticate
        Method: POST
        Request body : {
                        "email":"emial@122.com", // required
                        "password": "password" // required
                       }
        Response body: {
                        "success": true,
                        "code": 200,
                        "message": "Success",
                        "data": {
                           "name": "name",
                           "email": "emial@122.com",
                           "_id": "604f39db1017f6cddaea4480",
                           "token": "{{token}}"
                           }
                       }

     - For User list
        API: /api/users 
        Method: GET
        Response body: {
                        "success": true,
                        "code": 200,
                        "message": "Success",
                        "data": [
                           {
                            "name": "name",
                            "email": "emial@122.com",
                            "_id": "604f39db1017f6cddaea4480",
                           }
                           ....
                        ]
                       }

    Authenticated routes (authorization token is required in header)
     - For User Update profile
        API: /api/users
        Method: PUT
        Header: { authorization : {{token}} }
        Request body : {
                        "name":"name", // non required
                        "bio": "bio"  // non required
                       }
        Response body: {
                        "success": true,
                        "code": 200,
                        "message": "Success",
                        "data": {}
                       }

     - To fetch profile
        API: /api/users/profile 
        Method: GET
        Header: { authorization : {{token}} }
        Response body: {
                        "success": true,
                        "code": 200,
                        "message": "Success",
                        "data": {
                           "name": "name",
                           "email": "emial@122.com",
                           "_id": "604f39db1017f6cddaea4480",
                           }
                       }
