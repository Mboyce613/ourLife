from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other incomes here if you want
def seed_expenses():
    demo1 = Expense(
        user_id=1, name='Mortgage', amount=2000)
    demo2 = Expense(
        user_id=2, name='Martial Arts', amount=150)
    demo3 = Expense(
        user_id=3, name='Meds', amount=500)
    
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the incomes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.incomes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM incomes"))
        
    db.session.commit()
