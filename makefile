PROCREGEXP="node.*webpack|Electron"

include index.make

all: start

run: compile
		./node_modules/.bin/electron .

compile:
	npm run build

.phony: build-native
build-native:
		rm -rf build
		HOME=~/.electron-gyp ./node_modules/.bin/node-gyp rebuild --target=0.37.2 --arch=x64 --dist-url=https://atom.io/download/atom-shell

package: compile
		cp ./assets/TeasyIcon.icns ./app/app.icns
		node package.js

######################
# Development targets
######################

start:
	npm run dev-server &
	npm run start-dev &

show: show-procs

stop: kill-procs

restart:
		make stop
		make start
