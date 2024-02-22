from app.models import db, Medication, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other medications here if you want
def seed_medications():
    demo1 = Medication(
        user_id=1, name='Minor Healing Potion', dosage='1 bottle', time='9pm')
    demo2 = Medication(
        user_id=2, name='Ale', dosage='2 Flagons', time='7am')
    demo3 = Medication(
        user_id=3, name='Multivitamin', dosage='1/2 capsule', time='1pm')
    demo4 = Medication(
        user_id=4, name='Anti-acid', dosage='1/4 Tablet', time='8pm')
    demo5 = Medication(
        user_id=5, name='Multivitamin', dosage='1/2 capsule', time='1pm')
    demo6 = Medication(
        user_id=6, name='Innocent Blood', dosage='1/2 Glass', time='4pm')
    demo7 = Medication(
        user_id=7, name='Old Man Pills', dosage='3 Pills', time='9pm')
    demo8 = Medication(
        user_id=8, name='Multivitamin', dosage='1/2 capsule', time='1pm')
    demo9 = Medication(
        user_id=9, name='Multivitamin', dosage='1/2 capsule', time='1pm')
    
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
