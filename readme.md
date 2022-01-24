# Cellular Network GIS Application
### Visualize the three sector antenna base station coverage models on map

In the application, hexagonal coverage maps around the base station symbols added by the user are visualized on the map using "Express.js", "React.js", "CesiumJS" and "Resium".

# Installation
Create a file named <strong>“.env”</strong> under the <strong>frontend</strong> folder and fill it like “.env example” file for environment variables.

## Run with Docker

Run the application with docker compose

> docker-compose -f docker-compose.dev.yml up

## Run without Docker
Firstly install all dependencies 
>npm install

Then run the application for development environments

>npm run dev

After that you can access the front-end server at <strong>localhost:3000</strong> 
and the back-end server at <strong>localhost:5000.</strong> 
