# Manaloop Node.JS API server

## Config files
You will need to include the following environment variables:

- ```API_SECURITY_SALT``` a long ass random string to be used for security things...
- ```WAAT_DATABASE``` The Mongo DB URI

## Server setup

- OS: Ubuntu 14.04
- Webserver/Proxy: Nginx
- Version Control: Git
- Configure Git "post-receive" hook
- Modify .bashrc

## Ubuntu setup

### Update packages list
````:bash
sudo apt-get update
````

### Install basic build tool libraries
````:bash
sudo apt-get install build-essential libssl-dev libcurl4-gnutls-dev libexpat1-dev gettext unzip
````

### Create manaloop user account
````:bash
sudo adduser manaloop
# assign default password
````

### Install git

- Login as an admin
- Install package
````:bash
sudo apt-get install git-core
````

### Install nginx

- login as admin
- Install package
````:bash
sudo apt-get install nginx
````

### Install node

- Login as the manaloop user.
- Install [NVM](https://github.com/creationix/nvm)
````:bash 
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```` 
- Once NVM is installed, you may have to close and reopen your shell (logout and back into server).  Once NVM is loaded into bash (automatically loads via ~/.bashrc file), you can run and install a specific version of node:
````:bash
nvm install 4.2 # installs lastest Node 4.2.x version
````

- Setup the default version of node to use:
````:bash
nvm alias default 4.2
````

- Set default as the primary version of node to use:
````:bash
nvm use default
````

### Install pm2 (node package)
````:bash
npm install -g pm2
````

### Use Git to deploy

[git-hooks-deploy](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks)

1. Append your ssh key (```id_rsa.pub```) to manaloop user's .ssh/authorized_keys file
2. Setup the server as a git source: ````git remote add production ssh://manaloop@v1.api.manaloop.com/home/manaloop/repo.git````
3. You can now push to the production server: ````git push production master````

Server will auto install npm packages and auto restart node.  There should be outpout in the console.

You must change the post-receive hook to load .bash_profile since .bashrc on the server does not run if it interactive shell is off (git-bash does not run in interactive mode).

MANALOOP_DATABASE