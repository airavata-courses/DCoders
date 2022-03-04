[![datasource_service](https://github.com/airavata-courses/DCoders/actions/workflows/datasource_service.yaml/badge.svg)](https://github.com/airavata-courses/DCoders/actions/workflows/datasource_service.yaml)

## Data-source api service
- The service is written in python using FastApi
- Fetches the radar objects from nexradaws cloud storage
- Plots the graph for the requested radar station
- Returns the json as response with queried information and encoded image
- [ENHANCEMENT] caching added to speed up the download of nexrad object

### The project is built using poetry packaging manager
- Docs: [poetry](https://python-poetry.org/docs/)
- Testing the Fast api: [pytest-fast-api](https://fastapi.tiangolo.com/tutorial/testing/)
- Build and run the application by running the following commands,

  ```poetry build```

  ``` poetry run start ```

- Run using docker

  - Pre-requisites: *docker*

    ``` docker run -it -p 8000:8000 vinayakasgadag/decoders-datasource:latest ```
  - Access the service using http://127.0.0.1/docs
  - The above URL will redirect to swagger-ui with the api information
  - pass YEAR, MONTH, DAY and RADAR information to fetch the weather information from