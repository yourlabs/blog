+++
date = "2020-10-26T13:37:00+00:00"
draft = false
tags = ['django', 'webpack', 'snowpack', 'javascript', 'python', 'html', 'css', 'sass']
title = "Django + Snowpack How To = djsnowpack"
author = "jpic"
+++

Snowpack is the fastest and easiest way ever to benefit from npm and imports in
frontend code without going full SPA.

## What this does

### MUCH faster frontend development !

Elected [Productivity Booster OS Award
2020](https://osawards.com/javascript/2020), Snowpack is a frontend builder
with a startup time of 50ms, which typically can be 30s in a typical Webpack
project.

### Change your CSS or JS and your Django page will reload !

Changing a frontend file will typically not cause a Django view reload because
Django doesn't want to provide JS by default: djsnowpack provides a solution
for that.

## Demo

```python
# go and make a virtualenv in /tmp
cd /tmp
virtualenv /tmp/djsnowpack_demo
source /tmp/djsnowpack_demo/bin/activate

# clone and install the app and example project
git clone https://yourlabs.io/oss/djsnowpack
cd djsnowpack
pip install .

# install example project dependencies and start server
cd djsnowpack_example
pip install django
yarn install
./manage.py runserver
```

### Getting started

1. Install: `pip install djsnowpack`,
2. Add to `settings.MIDDLEWARE`:  `djsnowpack.Middleware`,
3. Add to `settings.STATICFILES_DIRS`:  `os.path.join(BASE_DIR, 'build')`.

This allows you to have a Snowpack frontend project inside your
`settings.BASE_DIR`.

You should see a minimal example in `djsnowpack_example` directory:

- `package.json`: get one from a [template
  project](https://github.com/snowpackjs/snowpack/tree/master/create-snowpack-app/),
  minimal one is good to just get going without any specific framework or library
- `index.html`: snowpack needs it to work so you'll just put it there once and
  then forget about it
- `index.js`: this is the entrypoint that will be served by snowpack
- `index.css`: same but optional and for styles, sass works well with
  snowpack too

DANGER: you MUST have the following in your index.html to make Django view
reload on JS change:

```python
    if (import.meta.hot) {
      import.meta.hot.accept(({ module }) => {
        import.meta.hot.invalidate();
      });
    }
```

index.html content:

```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="/index.css" />
      </head>
      <body>
        <script type="module" src="/index.js"></script>
      </body>
    </html>
```

Remove index.css if you just don't need it.

Have fun hacking frontend faster than ever !
