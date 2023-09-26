normal := \e[0m
bold := \e[1m
grey := \e[2m

node_version := 18
image_name := waxpacker

all: list

list:
	@printf "$(bold)npm_install$(grey) - Install npm packages\n$(normal)"
	@printf "$(bold)npm_update$(grey) - Update npm packages\n$(normal)"
	@printf "$(bold)npm_upgrade$(grey) - Upgrade npm packages\n$(normal)"
	@printf "$(bold)build$(grey) - Build production files\n$(normal)"
	@printf "$(bold)build_docker_image$(grey) - Build docker image\n$(normal)"
	@printf "$(bold)build_docker_image_alpine$(grey) - Build docker image alpine\n$(normal)"

npm_install:
	docker run -it --rm -v ${PWD}/client:/app -w /app node:$(node_version) npm install

npm_update:
	docker run -it --rm -v ${PWD}/client:/app -w /app node:$(node_version) npm update
	docker run -it --rm -v ${PWD}/client:/app -w /app node:$(node_version) npm update -D

npm_upgrade:
	docker run -it --rm -v ${PWD}/client:/app -w /app node:$(node_version) npx ncu -u
	docker run -it --rm -v ${PWD}/client:/app -w /app node:$(node_version) npm install

build: npm_install
	docker run -it --rm -v ${PWD}/client:/app -w /app node:$(node_version) npm run build

build_docker_image:
	docker build -t ${image_name}:latest . --target=image

build_docker_image-alpine:
	docker build -t ${image_name}:alpine . --target=image-alpine