from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        first_name='Drizzt', last_name="Do'Urden", email='demoadult@aa.io', password='password', is_dependent = False)
    demo2 = User(
        first_name='Bruenor', last_name='Battlehammer', email='demo2@aa.io', password='password', is_dependent = False)
    demo3 = User(
        first_name='Catti-brie', last_name='Battlehammer', email='demo3@aa.io', password='password', is_dependent = False)
    demo4 = User(
        first_name='Regis', last_name="Rumblebelly", email='demo4@aa.io', password='password', is_dependent = False)
    demo5 = User(
        first_name='Wulfgar', last_name="Elk", email='demo5@aa.io', password='password', is_dependent = False)
    demo6 = User(
        first_name='Malice', last_name="Do'Urden", email='demo6@aa.io', password='password', is_dependent = True)
    demo7 = User(
        first_name='Zaknafein', last_name="Do'Urden", email='demo7@aa.io', password='password', is_dependent = True)
    demo8 = User(
        first_name='Briza', last_name="Do'Urden", email='demo8@aa.io', password='password', is_dependent = False)
    demo9 = User(
        first_name='Briennelle', last_name="Zaharina", email='demo9@aa.io', password='password', is_dependent = True)
    
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


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
