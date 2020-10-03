## Starting yourlabs site locally

```
git clone git@yourlabs.io:oss/blog
cd blog
hugo serve    # start hugo server on localhost:1313
```

## Text content

Text content is in the content directory, other elements are in `layout/_index.(fr|en).html`

## CSS/JS code

Use the following for development:

    npm run watch

Then, prior to commiting changes:

```
rm -rf static/main.*; git rm -rf static/main.* ; npm run build; git add -f static/main.* layouts/_default/baseof.html
```
