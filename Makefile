# this is our publishing contract

install:
	npm ci

update:
	node data.js

build:
	mkdir -p public/uw
	npm run build
	npm run uw

deploy:
	./deploy.sh

preprod:
	./deploy.sh --preprod

publish:
	./deploy.sh --production

dev:
	GIT_BRANCH="dev" TARGET="dev" NODE_ENV="production" make update build && ./deploy.sh