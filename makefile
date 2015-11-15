all: build

run:
		./node_modules/.bin/electron .

compile:
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

build-native:
		HOME=~/.electron-gyp node-gyp rebuild --target=0.33.1 --arch=x64 --dist-url=https://atom.io/download/atom-shell
