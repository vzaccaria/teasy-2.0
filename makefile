all: build

build:
		./node_modules/.bin/webpack --config ./webpack/webpack-dev-server.config.js

dev: build
		npm run dev-server &
		npm run start-dev &

hot:
		npm run hot-dev-server &
		npm run start-hot &

stop:
		killall node && killall Electron

restart:
		make stop
		make hot
