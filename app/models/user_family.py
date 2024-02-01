from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from .db import db

Base = declarative_base()

user_families = Table(
    "user_families",
    db.Model.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("family_id", ForeignKey("families.id"), primary_key=True))