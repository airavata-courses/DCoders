**UserManagementService project to handle user login and registration and saving/fetching details that users have queried related to radar in Mongodb**


**NOTE** : Kindly configure the Mongo server on local and make sure it is up and running before running the Spring application.

Please refer the following link for running the MongoDB on local (application.properties file in Spring application for mongodb is configured with default port: 27017)

MacOS: https://jsforall.com/mongodb/install-mongodb-on-mac-using-brew/

Windows: https://www.guru99.com/installation-configuration-mongodb.html


A) **Follow the below commands to run the application:**
  - Build the project (Make sure you are in the "UserManagement" directory): **mvn clean install**
  - Run the project: **java -jar target/UserManagement-0.0.1-SNAPSHOT.jar** (Default port is 8080)
  - To run on different port: java -jar -Dserver.port=<PORT> target/UserManagement-0.0.1-SNAPSHOT.jar
  
  
B) **Following are the API's**
  
   1. **/user/login** (POST request)

   Request Body:
   {
      "userName":"John",
      "password":"john"
   }

   2. **/user/register** (POST request)

   Request Body:
  
   {
      "userName":"John",
      "password":"john"
   }

  3. **/query/save** (POST request)
  
  Request Body:
  
  {
    "userName": "John",
    "queryDetails": {
        "date": "27031001",
        "month": "December",
        "time": "22432454",
        "radarInfo": "NSFR"
    }
  }
  
  4. **/query/get/{userName}** (GET request)
