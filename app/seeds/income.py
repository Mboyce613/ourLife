from app.models import db, Income, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other incomes here if you want
def seed_incomes():
    demo1 = Income(
        user_id=1, name='Coal Mine', amount=3000)
    demo2 = Income(
        user_id=2, name='N\A', amount=0)
    demo3 = Income(
        user_id=3, name='Social Security', amount=1000)
    
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
def undo_incomes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.incomes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM incomes"))
        
    db.session.commit()
