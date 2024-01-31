from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime as dt

dt.timedelta


class Appointment(db.Model):
    __tablename__ = 'appointments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    name = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.dt.date, nullable=False)
    duration = db.Column(db.dt.timedelta, nullable=False)
    request = db.Column(db.Boolean, nullable=False)

    # Relationships


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'amount': self.amount
        }

#! Next make model and seed for :
#! Medication
#! Shoping list
#! User families

#! Then:
#! Make Relationships