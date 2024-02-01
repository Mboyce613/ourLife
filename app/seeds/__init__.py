from flask.cli import AppGroup
from .users import seed_users, undo_users
from .appointment import seed_appointments, undo_appointments
from .expense import seed_expenses, undo_expenses
from .family import seed_families, undo_families
from .income import seed_incomes, undo_incomes
from .medication import seed_medications, undo_medications
from .shopping_list import seed_shopping_lists, undo_shopping_lists
from .user_family import seed_user_families, undo_user_families

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        # Before seeding in production, you want to run the seed undo 
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # command, which will  truncate all tables prefixed with 
        db.session.commit()
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
    seed_user_families()
    seed_users()
    seed_families()
    seed_incomes()
    seed_expenses()
    seed_medications()
    seed_appointments()
    seed_shopping_lists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_user_families()
    undo_families()
    undo_shopping_lists()
    undo_medications()
    undo_appointments()
    undo_incomes()
    undo_expenses()
    # Add other undo functions here
