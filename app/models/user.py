from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from .user_family import user_families


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_dependent = db.Column(db.Boolean, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)

    # Relationships
    expenses = relationship("Expense", back_populates="user")
    incomes = relationship("Income", back_populates="user")
    medications = relationship("Medication", back_populates="user")
    appointments = relationship("Appointment", back_populates="user")

    families = relationship("Family",
                            secondary=user_families,
                            back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'is_dependent': self.is_dependent,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'families':[family.to_dict() for family in self.families]
        }
    
    def families(self):
        return {
            'families':self.family.to_dict()
        }
