from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text
import datetime as dt
new_date = dt.date.today()
minutes = dt.timedelta(minutes=30)
hours = dt.timedelta(hours=2)
days = dt.timedelta(days=1)
# Adds a demo user, you can add other appointments here if you want
def seed_appointments():
    demo1 = Appointment(
        user_id=1, name='Hair Cut', start_date=new_date, duration=minutes, request = False)
    demo2 = Appointment(
        user_id=2, name='Play Date with Jhon', start_date=new_date, duration=hours, request = True)
    demo3 = Appointment(
        user_id=3, name='Visit Nursing Home', start_date=new_date, duration=days, request = False)
    
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the appointments table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_appointments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.appointments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM appointments"))
        
    db.session.commit()
