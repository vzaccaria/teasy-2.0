all: build

build:
		./node_modules/.bin/webpack --config ./webpack/webpack-dev-server.config.js

dev:
		npm run dev-server &
		npm run start-dev &

hot:
		npm run hot-dev-server &
		npm run start-hot &
