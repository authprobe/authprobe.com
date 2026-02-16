.PHONY: dev build clean

dev:
	cd site && hugo server -D

build:
	cd site && hugo --minify --baseURL "https://authprobe.com/"

clean:
	rm -rf site/public site/resources
