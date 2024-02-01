from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
import datetime as dt

dt.timedelta

class Appointment(db.Model):
    __tablename__ = 'appointments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    name = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.DateTime, nullable=False)
    request = db.Column(db.Boolean, nullable=False)

    # Relationships
    user = relationship("User", back_populates="appointments")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'start_date': self.start_date,
            'duration': self.duration,
            'request': self.request
        }