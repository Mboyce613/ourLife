from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Shopping_list(db.Model):
    __tablename__ = 'shopping_lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    family_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('families.id')), nullable = False)
    item_name = db.Column(db.String(255), nullable=False)
    request = db.Column(db.Boolean, nullable=False)

    # Relationships
    family = relationship("Family", back_populates="shopping_lists")

    def to_dict(self):
        return {
            'id': self.id,
            'family_id': self.family_id,
            'item_name': self.item_name,
            'request': self.request
        }
