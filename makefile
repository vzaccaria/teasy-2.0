PROCREGEXP="node.*webpack|Electron"

include ~/.make/index.make

all: start

run: compile
		./node_modules/.bin/electron .

compile:
		./node_modules/.bin/webpack --config ./webpack/webpack.config.production.js

start:
		npm run hot-dev-server &
		npm run start-hot &


show: show-procs

stop: kill-procs

restart:
		make stop
		make start

build-native:
		HOME=~/.electron-gyp node-gyp rebuild --target=0.33.1 --arch=x64 --dist-url=https://atom.io/download/atom-shell

package: compile
	cp ./assets/TeasyIcon.icns ./app/app.icns
	node package.js

install:
	cp -R ./release/darwin-x64/Teasy\ 2.0-darwin-x64/Teasy\ 2.0.app ~/Applications
