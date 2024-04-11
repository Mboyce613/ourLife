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
   <img src="https://private-user-images.githubusercontent.com/122645968/321491205-d403c095-682f-4087-98ac-865f0c1fd232.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTI4MDc0MTEsIm5iZiI6MTcxMjgwNzExMSwicGF0aCI6Ii8xMjI2NDU5NjgvMzIxNDkxMjA1LWQ0MDNjMDk1LTY4MmYtNDA4Ny05OGFjLTg2NWYwYzFmZDIzMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxMVQwMzQ1MTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04N2ZhOGQ2NGE5MTZlYWFiMTY2NTNmNjU3ZjFkZTk5YmQ5NmUyNmRiZjk4MDFiMTRiZDRlZTllZWE1MDNhMTQ4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.4kTlIr7ioOAeLo-YhUdYCW1ZGPIk-gDkblIKuk-iimA"
</div>

<div>
   <img src="https://private-user-images.githubusercontent.com/122645968/321491202-bc52b8b2-aae9-481b-9774-1ea2d14e819f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTI4MDc0MTEsIm5iZiI6MTcxMjgwNzExMSwicGF0aCI6Ii8xMjI2NDU5NjgvMzIxNDkxMjAyLWJjNTJiOGIyLWFhZTktNDgxYi05Nzc0LTFlYTJkMTRlODE5Zi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxMVQwMzQ1MTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wZjJlZGU5ODU5Yzg0ZDBlZGRiZmEzMzQ4ZGY5MzhiNDJlZTFjNGM0ZmE2ZWNkNDUwOWViNjFjNTUwZWI1MzI5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.KzravyXWHiUf6UGvujE9g40-fjlzPgmekBIfKzQ8SWU"
</div>

<div>
   <img src="https://private-user-images.githubusercontent.com/122645968/321491199-00b3c73b-28c1-4903-b3aa-816b2ddcba4b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTI4MDc0MTEsIm5iZiI6MTcxMjgwNzExMSwicGF0aCI6Ii8xMjI2NDU5NjgvMzIxNDkxMTk5LTAwYjNjNzNiLTI4YzEtNDkwMy1iM2FhLTgxNmIyZGRjYmE0Yi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxMVQwMzQ1MTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05YzgyOTZhYzg4Y2FmM2YzM2NmZjM2ZjJmNGI5ZDhhYTEzNjA4YmY1OGJhZDBhMzBhMmJkMWFjNjk1OGY3NTBhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.1V5JCltOCW2Y9Fr6Fga76N5SQRqalqK3_bVfAoXfl5Y"
</div>

<div>
   <img src="https://private-user-images.githubusercontent.com/122645968/321491196-f202fa79-d73f-4427-834a-8868df28e0bf.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTI4MDc0MTEsIm5iZiI6MTcxMjgwNzExMSwicGF0aCI6Ii8xMjI2NDU5NjgvMzIxNDkxMTk2LWYyMDJmYTc5LWQ3M2YtNDQyNy04MzRhLTg4NjhkZjI4ZTBiZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxMVQwMzQ1MTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01ZjAwYTQyYzAxZTViZjg2NTA3ZDRhNWY1N2M5M2Q1N2NhYzA1MjNmNzlhYjg4NWM1NjQxMjczZTQ1NzA0YjNmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.Ylr-kwNRU0UyZk9v1efMXHzh4Q6sLHJYMMgT_xti0J8"
</div>

<div>
   <img src="https://private-user-images.githubusercontent.com/122645968/321491193-20ff0658-bc70-462f-a100-bc4fd2818551.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTI4MDc0MTEsIm5iZiI6MTcxMjgwNzExMSwicGF0aCI6Ii8xMjI2NDU5NjgvMzIxNDkxMTkzLTIwZmYwNjU4LWJjNzAtNDYyZi1hMTAwLWJjNGZkMjgxODU1MS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxMVQwMzQ1MTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iMTk3YzBjNTE4NGQxMTAxNDIyYzExZjU0OGNhM2ZjMTE5NGZjNWVlYjk3MTYzNjMzZmExOTExN2RlNWIzOWMxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.s3XntgLeh8TxNB-z4elMwcTzlSR9K5OMS8UyG3GSCoA"
</div>

<div>
   <img src="https://private-user-images.githubusercontent.com/122645968/321491190-f5f905b8-8dcf-4791-9e7f-e7d2bbbba48f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTI4MDc0MTEsIm5iZiI6MTcxMjgwNzExMSwicGF0aCI6Ii8xMjI2NDU5NjgvMzIxNDkxMTkwLWY1ZjkwNWI4LThkY2YtNDc5MS05ZTdmLWU3ZDJiYmJiYTQ4Zi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxMVQwMzQ1MTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zNmI1NjFjZTczZDhiYTIzMTNiYWZlY2Q3OGZhMmFjYzQyMWJjNGEwNDg2NjgwZTQwMzQxZmNmNWNkODBlYTE3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.Atikk8wYjdsrkigd5jEILYxoDEzvxLW0PdN-d147WG0"
</div>

<div>
   <img src="https://private-user-images.githubusercontent.com/122645968/321491182-f97df6f7-39ea-47a2-a52e-a8332b5a13d3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTI4MDc0MTEsIm5iZiI6MTcxMjgwNzExMSwicGF0aCI6Ii8xMjI2NDU5NjgvMzIxNDkxMTgyLWY5N2RmNmY3LTM5ZWEtNDdhMi1hNTJlLWE4MzMyYjVhMTNkMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxMVQwMzQ1MTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xODc2M2ZlMjZlM2Q4ZDEwMDJjYTFiZjI4NTIyZTQ0YjNmMTAxN2I4ZDY3ZTJhYmZjNWRkZjQ3YTE5NTNiYjM1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.497-h1tSLYxSzP5XIlY1pPNR3757SxjXhHozmwln4rQ"
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
