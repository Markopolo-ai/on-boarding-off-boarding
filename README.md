# Markopolo on-boarding off-boarding web application

## Table of contents

- [General Info](#general-info)
- [Background](#background)
- [Design](#design)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This is a reactjs web application where manager of an organization can invite new employee to internal services like Github Organization, Trello, Google Drive, etc. Manager can also revoke their access once they leave the organization.

## Background

Before starting this project, I have never used/touched figma/reactJS. I tried my best to use them properly within this short time while maintaining my 9-6 job. I know it's not perfect but it's not the best version that I can offer.

![Code](./images/code.gif)

## Design

For design, I thought of a simple interface to manage the whole process. On manager dashboard, manager is welcomed with two options, Add new member and Revoke old members.

On Add New member component/page, there is a form with option to input employee's e-mail address. There is also another option to check which services will they be added to. For simplicity, we will be using github for now.

Similarly, on revoke access page, manager can see the active employee list. From there, he/she can input the employee's username to revoke their access.

![Code](./images/designer.gif)

## Technologies

- ReactJS
- React-Redux
- axios
- semantic-ui
- react-notification
- Docker
- git

## Setup

### Local server

```
 git clone https://github.com/mredulorfiaz/onboarding-off-boarding.git
 cd onboarding-off-boarding/front-end/
 cp .env.example .env
 set value of environment variables
 npm install
 npm start
```

### Dockerize

```
 git clone https://github.com/mredulorfiaz/onboarding-off-boarding.git
 cd onboarding-off-boarding/front-end/
 cp .env.example .env
 set value of environment variables
 docker build .
 docker run <image_name>  OR docker run -p 127.0.0.1:<any_port>:3000/tcp <image_name>
```
