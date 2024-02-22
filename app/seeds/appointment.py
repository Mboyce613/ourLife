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
        user_id=1, name='Leave Underdark', start_date="15-02-2024", duration=1, request = False)
    demo2 = Appointment(
        user_id=2, name='Forge Weapon', start_date="12-03-2024", duration=24, request = True)
    demo3 = Appointment(
        user_id=3, name='Re-string Bow', start_date="11-06-2024", duration=1, request = False)
    demo4 = Appointment(
        user_id=4, name='Dinner Party', start_date="01-06-2025", duration=4, request = False)
    demo5 = Appointment(
        user_id=5, name='Fight Giants', start_date="11-07-2024", duration=24, request = False)
    demo6 = Appointment(
        user_id=6, name='Ritual Sacrifice', start_date="12-16-2024", duration=8, request = False)
    demo7 = Appointment(
        user_id=7, name='Train Students', start_date="01-20-2024", duration=16, request = False)
    demo8 = Appointment(
        user_id=8, name='Plot and Scheme', start_date="11-06-2024", duration=24, request = False)
    demo9 = Appointment(
        user_id=9, name='1st Day of School', start_date="09-01-2025", duration=8, request = False)
    
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
