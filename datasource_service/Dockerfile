FROM python:3.9.10-slim-buster

LABEL maintainer="vsgadag.me@gmail.com"

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.1.12

RUN mkdir /datasource_service

COPY . /datasource_service/

WORKDIR /datasource_service

RUN apt-get update && \
    apt-get install -y gcc && \
    apt-get clean && \
    pip install poetry==$POETRY_VERSION && \
    poetry install --no-dev && \
    poetry config virtualenvs.create false

EXPOSE 8000
CMD ["poetry", "run", "start"]