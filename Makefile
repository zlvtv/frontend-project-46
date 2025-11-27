install:
	npm ci
	
run:
	bin/genDiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage

test-watch:
	npm test -- --watch

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npm publish --access public