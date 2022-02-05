## Data-source api service
- The service is written in python using FastApi
- Fetches the radar objects from nexradaws cloud storage
- Plots the graph for the requested radar station
- Returns the json as response with queried information and encoded image

### The project is built using poetry packaging manager
- Docs: [poetry](https://python-poetry.org/docs/)
- Testing the Fast api: [pytest-fast-api](https://fastapi.tiangolo.com/tutorial/testing/)
- Build and run the application by running the following commands,

  ```poetry build```

  ``` poetry run start ```

- Run using docker

  - Pre-requisites: *docker*

    ``` docker run {docker-image} ```