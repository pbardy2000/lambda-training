# Docker Integration with a MySQL DB

#### Docker
###### Docker is a platform designed to help developers build, share, and run container applications.

#### MySQL
###### MySQL is an open-source relational database management system.

#### DB (Database)
###### A database is an organised collection of structured information, or data, typically stored electronically in a computer system.

## Pre-requisites
1) Install Docker (https://docs.docker.com/desktop/install/mac-install/) using the appropriate DMG - Run `docker version` to check if docker is installed correctly

## Getting started

Within the `docker` directory you will find `database-scripts`. This contains SQL files that will create tables and seed the DB with appropriate data.

There is a `docker-compose.yml` file, this is used to initialise the DB with a specific configuration. 

1) To start the DB inside docker, run: `docker compose up`
2) Wait for this message to appear `ready for connections. Version: '8.0.35'`
3) Open your preferred DB client, create connection using details inside `docker-compose.yml` file
4) After completing or wanting a fresh session, kill the terminal session and then stop docker using: `docker compose down`
