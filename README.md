# Sports Teams Manager

A web application for managing sports teams and their players, built with React and TypeScript.

## Author

Paula Negro Asegurado

## Features

The application handles basic team management tasks. You can create teams, assign them to cities, and build rosters by adding players with their positions and jersey numbers. Each player card shows their initials in an avatar, along with their position badge that changes color depending on whether they're a goalkeeper, defender, midfielder, or forward.

Team validation is built in - the app tracks whether you've reached the minimum of 11 players and displays warnings or confirmation messages accordingly. There's also a visual breakdown of your squad composition through a circular chart that updates as you add or remove players.

Deleting works for both teams and players, with confirmation dialogs to prevent accidental removals.

## Technologies

The frontend runs on React with TypeScript for type safety. Routing between pages is handled by React Router, and API calls go through Axios. For development, JSON Server provides a mock REST API that simulates a real backend.

The styling is all custom CSS - no component libraries.

## Installation and Usage

You'll need Node.js version 16 or higher installed on your machine.

```bash
cd futella
npm install
```

The application requires two processes running simultaneously. In one terminal, start the JSON Server:

```bash
npm run server
```

This starts the mock API on port 3001. In a second terminal, launch the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173.

To create a team, use the form on the right side of the main page. Click on any team to view its details and add players. Hover over player cards or team items to reveal delete buttons.

## Database

The included database comes populated with real teams and players from several clubs. There are three Slovenian teams: NK Maribor, NK Olimpija Ljubljana, and NK Celje. Spanish football is represented by Real Valladolid, plus both the men's and women's teams from FC Barcelona and Real Madrid.

Player data includes actual squad members with their real jersey numbers and positions. This gives you a working dataset to explore the interface immediately, though you can add your own teams and players as well.

The database file is db.json in the root directory. JSON Server watches this file and updates it automatically as you make changes through the interface.

## API Endpoints

The application communicates with these REST endpoints:

**Teams:**

- `GET /teams` - Returns all teams
- `GET /teams/:id` - Returns a specific team
- `POST /teams` - Creates a new team (requires name and city)
- `DELETE /teams/:id` - Removes a team

**Players:**

- `GET /players?teamId=:id` - Returns all players for a specific team
- `POST /players` - Creates a new player (requires teamId, name, position, and number)
- `DELETE /players/:id` - Removes a player

Valid positions are GK (goalkeeper), DF (defender), MF (midfielder), and FW (forward). Jersey numbers must be positive integers.

The base URL for all requests is http://localhost:3001, configured in src/api/http.ts. If you need to change the port or point to a different backend, modify that configuration file.
