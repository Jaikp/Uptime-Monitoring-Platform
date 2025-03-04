# Code Citations

## License: unknown
https://github.com/henninb/express-api/tree/d06f5620ebd8744c36596d4e2d4ac110003d84de/Dockerfile

```
Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm
```

