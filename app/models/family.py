from .db import db, environment, SCHEMA
from sqlalchemy.orm import relationship
from .user_family import user_families

class Family(db.Model):
    __tablename__ = 'families'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    motto = db.Column(db.String(255), nullable=False)

    # Relationships
    shopping_lists = relationship("Shopping_list", back_populates="family")

    users = relationship("User",
                        secondary=user_families,
                        back_populates="families")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'motto': self.motto,
            'shopping_lists':[list.to_dict() for list in self.shopping_lists]
        }
