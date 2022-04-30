## NASA MERRADATA API SERVICE:

 - This is a service used to fetch NASA MERRADATA, and return an image and plot it on our UI.
 - We are basically downloading NASA's nc4 files, converting into a format which can be displayed in the GUI, and also converting the same in a cloud-friendly form.
 - We are using .csv(Comma Separated Values) for the cloud based implementation.
 - Using cartopy library, we are converting the data into a base64 image file, and returning it via json.
 - This will then be converted by the API gateway into an image.
 - Since certain libraries aren't compatible with the normal Python environment(due to some inconsistencies), we are using Python's Anaconda environment, especially for the libraries: cartopy and netCDF4.
 - To allow further load enhancement, we have also implemented messaging queue service using RabbitMQ.
 - For this particular service, we have used Python's Pika library. This library begins with a connection and a channel established, and then it starts consuming requests in the form of from the API gateway.
 - Then, the internal authentication calls are made, and the URL is converted into the base64 image, and returned to a new messaging queue channel in the form of json and it acts as a producer.
 - Then the gateway consumes the returned object and sends it back to UI.
 
 - Run using docker

   - Pre-requisites: docker, running a messaging queue via docker as well.

   - To run messaging queue via docker, use: ``` docker run -d --name rabbit -p 5672:5672 -p 5673:5673 -p 15672:15672 rabbitmq:3 ```

   - ``` docker run -it -p 8001:8001 chaitanyad20/merradatav0 ```
   - ``` docker run --env-file=env_file_name -p 8001:8001 merradata:01 ```

   - Example request:

      ``` json 
      {
        "year":"2013",
        "month":"05"
      } 
      ```

   - YEAR, MONTH is the information required to fetch the Merradata information from NASA's Merradata website
   
   - Returns an encoded base64 image via the messaging queue.
   
  
