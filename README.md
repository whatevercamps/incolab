# INcolab ⚛️

A web application that consists on an innovation network for you to create a Team and start working on innovation projects. The idea is to connect many teams and related projects in the world in order to accomplish better results for the sake of everyone, especially in this hard times...

As you navigate, you can create a user, a team and a project, and also view the teams and projects around.

# You need this ✅

1. Install node and npm/yarn (you can see more detail in this link https://nodejs.org/en/)

2. Install Mongodb module (if you want, you can use npm install -g mongodb in your terminal command tool)

3. Set in your Enviroment Variables the data base credentials (https://nodejs.org/dist/latest-v8.x/docs/api/process.html)

# Server 🖥

You can see the server running by following this link 👉🏻 https://secure-hamlet-38600.herokuapp.com/players

# Technologies 🤓 

The application runs several Express Servers, an APIGateway on port 3031 that routes 3 microservices on ports 3028, 3029 and 3030 and also the front-end running a React aplication on port 3000. The data is on a mongodb database.

- HTML, CSS, Javascript, MongoDB, Express Js, React, Passport, Microservices architecture.

# Install 💽

```
cd incolab
cd back-end
cd APIGateway
npm install
npm start
```

This same process has to be repeated for the folder TeamsMS, UsersMS and ProjectsMS in the back-end folder. And for running the front-end you just need this:

```
cd incolab
cd front-end
npm start
npm run build
```

The npm run build, generates a folder called build in the front-end which represents a static version of the front running in port 8080, the npm start means running the front for development purposes.

# Overview 🌄

![Incolab Overview](https://i.imgur.com/VelpwkA.png)

Made by [Juan Felipe Torres](https://github.com/jftorresp) and [David Bautista](https://github.com/whatevercamps), licenced under MIT 👌
