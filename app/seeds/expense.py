from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other incomes here if you want
def seed_expenses():
    demo1 = Expense(
        user_id=1, name='Panther Food', amount=500)
    demo2 = Expense(
        user_id=2, name='Mythril Ingots', amount=1500)
    demo3 = Expense(
        user_id=3, name='Arrows', amount=100)
    demo4 = Expense(
        user_id=4, name='Food', amount=5000)
    demo5 = Expense(
        user_id=5, name='Ale', amount=500)
    demo6 = Expense(
        user_id=6, name='Assassins', amount=50000)
    demo7 = Expense(
        user_id=7, name='Practice Dummies', amount=250)
    demo8 = Expense(
        user_id=8, name='Robes', amount=1000)
    demo9 = Expense(
        user_id=9, name='School Supplies', amount=100)
    
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
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
