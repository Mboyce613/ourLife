from app.models import db, Medication, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other medications here if you want
def seed_medications():
    demo1 = Medication(
        user_id=1, name='Red Wine', dosage='1 glass', time='9pm')
    demo2 = Medication(
        user_id=2, name='Multivitamin', dosage='2 tablets', time='7am')
    demo3 = Medication(
        user_id=3, name='Losartan', dosage='1/2 capsule', time='1pm')
    
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the medications table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_medications():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.medications RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medications"))
        
    db.session.commit()
