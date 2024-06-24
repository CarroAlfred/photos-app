# React + TypeScript + Vite (PHOTOS APP)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

##

##

### Scripts

yarn add / npm install

> to install the needed dependencies

yarn dev / npm run dev

> to run the local setup

yarn test / npm run test

> to run local test

##

Building the project I already have the idea to use the tanstack query to support the flowless infinite query! and the styling is a pretty basic styling viewing only the cards, I did not add the debounce, since the query fetcher already slices the data, but if the data is slower I will adding that debounce and loading components, I also added a simple Models, having it under core/api will help us distinguish what needed to be add when we handle the api data, and it also declutters the files for faster searching for functions.

other than that the application is pretty straight forward, from creating the api functions and custom hook to handling the infinite scroll and creating the card photos
