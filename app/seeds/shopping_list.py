from app.models import db, Shopping_list, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other shopping_lists here if you want
def seed_shopping_lists():
    demo1 = Shopping_list(
        family_id=1, item_name='Rope', request=False)
    demo2 = Shopping_list(
        family_id=1, item_name='Rations', request=True)
    demo3 = Shopping_list(
        family_id=1, item_name='Potions', request=False)
    demo4 = Shopping_list(
        family_id=2, item_name='Spider Silk', request=False)
    demo5 = Shopping_list(
        family_id=2, item_name='Rubies', request=False)
    demo6 = Shopping_list(
        family_id=2, item_name='Daggers', request=False)
    demo7 = Shopping_list(
        family_id=3, item_name='Eggs', request=False)
    demo8 = Shopping_list(
        family_id=3, item_name='Milk', request=False)
    demo9 = Shopping_list(
        family_id=3, item_name='Candy', request=False)
    
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
