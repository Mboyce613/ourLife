from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Family(db.Model):
    __tablename__ = 'families'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    motto = db.Column(db.String(255), nullable=False)

    # Relationships


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'motto': self.motto
        }
