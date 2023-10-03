# WaxPacker

Tracabilty app for your wax, from input to ouput.

## Development

### Init project
With make `make init` or :
1. Copy env sample file `cp ./client/.env.local.example ./client/.env.local`
2. Install npm packages `cd client && npm install`

### Using Docker Compose

docker-compose file is [here](./docker-compose.yml)

```
docker compose up
```

Client available at [http://localhost](http://localhost)

PocketBase dashboard available at [http://localhost:8080/_](http://localhost:8080/_)

### Using Docker Compose + Traefik

docker-compose file is [here](./docker-compose-traefik.yml)


```
docker compose -f docker-compose-traefik.yml up
```

Client available at [http://localhost](http://localhost)

PocketBase dashboard available at [http://localhost:8080/_](http://localhost:8080/_)