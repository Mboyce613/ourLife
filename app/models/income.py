from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Income(db.Model):
    __tablename__ = 'incomes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    name = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Integer(), nullable=False)

    # Relationships


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'amount': self.amount
        }
