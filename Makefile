.PHONY: dev build clean deps

deps:
	cd site && if [ -f package-lock.json ] && [ ! -d node_modules/@filipecarneiro/hugo-bootstrap-theme ]; then npm ci; fi

dev: deps
	cd site && hugo server -D --disableFastRender

build: deps
	cd site && hugo --minify --baseURL "https://authprobe.com/"

clean:
	rm -rf site/public site/resources
