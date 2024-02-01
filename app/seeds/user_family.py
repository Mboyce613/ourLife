from app.models import db, user_families, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other user_families here if you want
def seed_user_families():
    demo1 = user_families(
        user_id=1, family_id=1)
    demo2 = user_families(
        user_id=2, family_id=1)
    demo3 = user_families(
        user_id=3, family_id=1)
    
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the user_families table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_families():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_families RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_families"))
        
    db.session.commit()
