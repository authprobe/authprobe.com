.PHONY: dev build clean verify

dev:
	cd site && hugo server -D

build:
	cd site && hugo --gc --minify --baseURL "https://authprobe.com/"

verify: build
	@test -f site/public/index.html

clean:
	rm -rf site/public site/resources
