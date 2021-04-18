(https://badges.pufler.dev) [![Created Badge](https://badges.pufler.dev/created/Navneet-Singh-123/Team-Connect)](https://badges.pufler.dev) [![Updated Badge](https://badges.pufler.dev/updated/Navneet-Singh-123/Team-Connect)](https://badges.pufler.dev)

# [Team Connector](https://blooming-spire-16914.herokuapp.com/)

	
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)  [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com) 



## Table of Contents
* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
* [Frontend](#frontend)
    * [ReactJS](#reactjs)
* [Backend](#backend)
    * [NodeJS](#nodejs)

## About the Project
Team Connector is a platform where users can collaborate on a project by creating a team<br> on the website. This will then allow them to create a post and have an in-depth discussion related to<br> that particular post in the discussion section of that post. Members of a team also have the ability to <br>like, unlike any post or comment.
### Built With
*   MERN 

[Back to Table of Contents](#table-of-contents)
## Getting Started
### Prerequisites
* ReactJS
* NodeJS
### Installation
* Install server dependencies

	
```bash
npm install
```

* Install client dependencies

	
```bash
cd client
npm install
```


### Usage
* Add a default.json file in config folder with the following
	
```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

* Run both Express & React from root

	
```bash
npm run dev
```
[Back to Table of Contents](#table-of-contents)
## Frontend
* #### ReactJS
React is a JavaScript library for building user interfaces or UI components. It encourages the creation of reusable UI components, which present data that changes over time. React is all about components. We need to think of everything as a component. This will help us to maintain the code when working on larger scale projects.
    * ###### Why React ?
        *  Fast render with Virtual DOM
        *  Flexibility
        *  Helps to build rich user interfaces
        *  Offers fast rendering
        *  Strong community support
        
## Backend
* #### NodeJS
NodeJS is an open source server environment which is free and runs on various platforms (Windows, Linux, Unix, Mac OS X, etc). It uses JavaScript on the server. NodeJS files contain tasks that will be executed on certain events.
    * ###### Why Node ?
        *  It’s a light and scalable
        *  Uses the approach of non-blocking I/O
        *  Robust technology stack
        *  Fast-processing and event-based model
        *  Strong corporate support
 