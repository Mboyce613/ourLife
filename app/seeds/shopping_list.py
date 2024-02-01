from app.models import db, Shopping_list, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other shopping_lists here if you want
def seed_shopping_lists():
    demo1 = Shopping_list(
        user_id=1, name='Coal Mine', amount=3000)
    demo2 = Shopping_list(
        user_id=2, name='N\A', amount=0)
    demo3 = Shopping_list(
        user_id=3, name='Social Security', amount=1000)
    
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the shopping_lists table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shopping_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_lists"))
        
    db.session.commit()
