install:
	npm install

publish:
	npm publish

lint:
	npx eslint .

start:
	npx babel-node -- src/bin/gendiff.js