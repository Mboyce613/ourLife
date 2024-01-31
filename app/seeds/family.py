from app.models import db, Family, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other families here if you want
def seed_families():
    demo = Family(
        name='Shalakar', motto='We are the best family to ever live.')
    
    db.session.add(demo)
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
