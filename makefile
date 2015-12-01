all: build

run:
		./node_modules/.bin/electron .

compile:
		./node_modules/.bin/webpack --config ./webpack/webpack.config.production.js

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

package: compile
	cp ./assets/TeasyIcon.icns ./app/app.icns
	node package.js

install:
	cp -R ./release/darwin-x64/Teasy\ 2.0-darwin-x64/Teasy\ 2.0.app ~/Applications
