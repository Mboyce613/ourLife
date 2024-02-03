from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from .db import db, add_prefix_for_prod

Base = declarative_base()

user_families = Table(
    "user_families",
    db.Model.metadata,
    Column("user_id", ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    Column("family_id", ForeignKey(add_prefix_for_prod("families.id")), primary_key=True))