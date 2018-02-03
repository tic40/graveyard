# Package Manager

All packages are installed via npm.

Installed packages are written in package.json.

What we installed is written in the package.json.


### Add new package

Install and add the {package} for use in production code to the package.json
```
npm install {package} --save
```

Install and add the {package} for use in only development code to the package.json
```
npm install {package} --save-dev
```

### Update

*Please be careful to run npm update/npm {package} update. You must check whether the application works properly after update.

Update packages
```
# update all packages in package.json
npm update
# update specific package
npm {package} update
```

This command will check the registry to see if any (or, specific) installed packages are currently outdated.
```
npm outdated
```
