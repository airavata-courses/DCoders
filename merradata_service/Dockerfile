FROM continuumio/miniconda3

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y erlang
RUN apt-get install -y rabbitmq-server
#RUN systemctl enable rabbitmq-server
#RUN systemctl start rabbitmq-server
#RUN systemctl status rabbitmq-server
RUN conda install -c conda-forge -y cartopy
RUN conda install -c conda-forge -y netcdf4
RUN conda install -c conda-forge -y numpy
RUN conda install -c conda-forge -y matplotlib
RUN conda install -c conda-forge -y pandas
RUN pip install python-dotenv
RUN pip install pika
RUN conda install -c conda-forge -y imageio
RUN conda install -c conda-forge -y uvicorn
RUN conda install -c conda-forge -y fastapi

RUN mkdir /merradata_service

COPY . /merradata_service/

WORKDIR /merradata_service

RUN rabbitmq-server -detached

EXPOSE 8001
CMD ["uvicorn", "main:app","--reload"]