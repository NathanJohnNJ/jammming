# <ins>SPOTIFY PLAYLIST APP</ins>
#### Part of the Full-Stack Engineer course ran by [Codecademy](https://codecademy.com)
<br />

## Contents
  - [Requirements](#project-requirements)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Purpose](#purpose)
  - [Technologies used](#technologies)
  - [Features](#features) 
  - [Installation](#installation)
  - [Future work](#future-plans)

### Project Requirements:
- [x] Build a web app using React
- [x] Version control your application with Git and host the repository on GitHub
- [x] Integrate with Spotify or another API
- [x] Deploy your application
- [ ] Write a README (using Markdown) that documents your project, including:
   - [x] [The purpose of your project](#purpose)
   - [x] [Technologies used](#technologies)
   - [x] [Features](#features) 
   - [ ] [Future work](#future-plans)

## Features:
 - [x] Users can search for songs by song title.
    - [x] You can also include functionality to search by other attributes like artist’s name, genre, etc.
 - [x] Users can see information about each song like title, artist, and album for songs they queried
    - [x] You can also include other information – the design is up to you
 - [ ] Users can export their custom playlist to their personal Spotify account
 - [ ] Implement playlist renaming
 - [ ] Implement removing songs from current playlist
 - [ ] Implement adding songs to a custom playlist
 - [ ] Implement track listing in the component tree
 - [ ] Implement playlists in the component tree

### Prerequisites:
 - HTML
 - CSS
 - JavaScript
 - React
 - HTTP Requests and Responses
 - Authentication

### Purpose
This project is part of the Codecademy 'Full-Stack Engineer' course.
As shown above, the requirements for the project are to provide a web app that can utilise Spotify's web API to gain authorisation to a users account details, and Spotify's library of music. Then to use this authroisation and access to display profile information to the user, enable playlist creation and saving, and implement a versatile search function to allow music to be found, details shown, and then added to the new playlist. 

### Technologies
- Vite
  - SSL plugin to provide HTTPS access to development server
  - React plugin
  - TailwindCSS plugin
- ReactJS
- Spotify Web API
  - Authentication
  - Retrieving user profile
  - Enabling search functionlity
  - Enabling playlist viewing, creating, editing, and saving
- Hosted on Vercel to provide external access with SSL enabling the Spotify API to work
- Personalised custom domain to implement my branding and link back to my portfolio site
- Libraries/Frameworks used:
  - TailwindCSS for styling
  - React Icons
  - SVG with SMIL animations for the background:
    - Paths
    - Filters
    - Gaussean blur 
    - Turbulence

### Features
- Search bar
- Nav bar
- Overview main page:
  - Profile snippet
  - Playlist snippet
  - Mini player
- Full player
- Full search page
- Full profile page
- Full playlist page showing all users playlists

### Installation
##### Run your own local version of this app
1. Open your preferred terminal application at the location in which you wish to save this project and clone this repository with the following command:
  ```
  git clone https://github.com/nathanjohnnj/jammming.git
  ```
  alternatively you can fork this repo first so you have your own repository stored on your account, and then clone that to your local machine.
2. `cd` into the project and run `npm install`:
  ```
  cd jammming/
  npm install
  ```
3. You now need to configure the project before it can run. You can either open your favorite coding IDE and work in there:
  ```
  code .
  ```
  or you can continue working in the terminal.
4. Head over to the [Spotify Developer website](https://developer.spotify.com/) and log in or create an account.
5. Create a new app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and ensure you provide a 'Redirect URI' in the following format: 'https://<your local IP address>:5173' (5173 is the default port for vite to run the development server for your app, if you manually change this, then you should also change it here). If you have a custom domain which you will be using for the project, you can also add this here. Mine for example is 'https://jammming.njtd.xyz' (Note that you don't need a port number to host the production environment on a custom domain.) **Both of these URIs _MUST_ use https to comply with Spotifys new requirements.**
6. Also ensure you tick the box for WebAPI towards the bottom.
7. Agree to the developer terms, click 'Save', then make a note of your Client ID and Client Secret.
8. Open the dotenv template file and add your Client ID and Secret, and your redirect URI. Save a new copy of this file as just '.env' (**I'll use nano in the terminal for my example, this will vary depending on which editor you choose**):
  ```
  nano .env.template
  ```
  ```
  VITE_SPOTIFY_CLIENT_ID=<Your Client ID here>
  VITE_SPOTIFY_CLIENT_SECRET=<Your Client ID here>
  VITE_SPOTFIY_REDIRECT_URI=<Your Redirect URI here>
  ```
  (**Note that there are no quotation marks used in this file**)
  ```
  ctrl+x 
  y
  .env
  y
  ```
  (**The above sequence of keystrokes will close (ctrl+x) and save (y) the file as the given name (.env)(you  actually just need to delete .template), and finally confirm that you want to save it as a new file (y)**)
9. If you plan to run this in a production environment with a custom domain, you can now just add the project to your chosen provider and follow their instructions to get it live.
However if you want to run this locally in a development environment you need to uncomment the 6 commented out lines in vite.config.js (**1 line at the too with the imports, and 5 in the plugins config section**).
This step enables the [basicSsl plugin](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl) for vite which means the [Spotify API](https://developer.spotify.com/documentation/web-api) will allow your connection and redirects.
10. Finally to run the local version of this app, type:
  ```
  npm run dev -- --host
  ```
  (**Adding the --host flag here allows connections via your local ip address. The exta '--' passes the flag through to the command that the npm script is going to run.**)

### Future plans



<image alt="NJTD Logo" src="./public/rainbowLogo.png" width="200px" height="200px" />