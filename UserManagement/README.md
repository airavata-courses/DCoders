**UserManagementService project to handle user login and registration and saving details that users have queried related to radar in Mongodb**



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
