# OurLife

This is my original family managment software! It allows you to manage medications, appointments, and budgets for individuals across multiple families.

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Making it run

1) Open a terminal and cd to the root folder
2) Run the command 'flask run'
3) Open another terminal and cd to the react-vite folder
4) Run the command 'npm run dev'

Thats it, you now have both the back end and front end servers running.
If it didn't automatically pop up in your web browser, navigate to http://localhost:5173/

### Check out the demo accounts

There are two demo accounts, Demo Adult and Demo child. 
Demo Adult has full functionality and visibility to all users in their families. 
Demo Child only has partial functionality, and only visibility of their info.

<div>
   <img src
</div>

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
