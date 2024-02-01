from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Shopping_list(db.Model):
    __tablename__ = 'shopping_lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    family_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('families.id')), nullable = False)
    item_name = db.Column(db.String(255), nullable=False)
    request = db.Column(db.Boolean, nullable=False)

    # Relationships

    def to_dict(self):
        return {
            'id': self.id,
            'family_id': self.family_id,
            'item_name': self.item_name,
            'request': self.request
        }
