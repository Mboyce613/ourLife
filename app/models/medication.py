from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Medication(db.Model):
    __tablename__ = 'medications'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    name = db.Column(db.String(255), nullable=False)
    dosage = db.Column(db.String(255), nullable=False)
    time = db.Column(db.String(255), nullable=False)

    # Relationships
    user = relationship("User", back_populates="medications")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'dosage': self.dosage,
            'time': self.time
        }
