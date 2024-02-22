from app.models import db, User, Family, user_families, environment, SCHEMA
from sqlalchemy.sql import text
from sqlalchemy import insert


# Adds a demo user, you can add other user_families here if you want
def seed_user_families():
    
    fam1 = Family.query.get(1)
    fam2 = Family.query.get(2)
    fam3 = Family.query.get(3)

    demo1 = User.query.get(1)
    demo2 = User.query.get(2)
    demo3 = User.query.get(3)
    demo4 = User.query.get(4)
    demo5 = User.query.get(5)
    demo6 = User.query.get(6)
    demo7 = User.query.get(7)
    demo8 = User.query.get(8)
    demo9 = User.query.get(9)

    demo1.families.append(fam1)
    demo1.families.append(fam2)
    demo1.families.append(fam3)

    demo2.families.append(fam1)

    demo3.families.append(fam1)
    demo3.families.append(fam3)

    demo4.families.append(fam1)

    demo5.families.append(fam1)

    demo6.families.append(fam2)
    demo7.families.append(fam2)
    demo8.families.append(fam2)

    demo9.families.append(fam3)
    
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
