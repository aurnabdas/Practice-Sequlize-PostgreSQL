# Run Docker and Node

## install docker 
https://docs.docker.com/desktop/install/mac-install/
## run postgresql

ensure docker is installed and run the following code:

```bash  

docker run --name postgres -e POSTGRES_PASSWORD=mypass -e POSTGRES_USER=dev -p 5432:5432 -d postgres

```

## install node dependencies 
ensure node.js is installed and write the following command to install all the dependencies:

```
npm install

```

## run
to run the server write the following:
```
npm run dev
```