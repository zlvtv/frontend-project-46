install:
	npm ci
	
gendiff:
	node bin/gendiff.js

publish:
	npm publish --access public