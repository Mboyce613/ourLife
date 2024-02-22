from app.models import db, Family, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other families here if you want
def seed_families():
    demo1 = Family(
        name='Companions of the Hall', motto='Truth, Justice, Glory!.')
    demo2 = Family(
        name="House Do'Urden", motto='All to the Spider Queen!.')
    demo3 = Family(
        name='Loves', motto='Family matters the most.')
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the families table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_families():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.families RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM families"))
        
    db.session.commit()
