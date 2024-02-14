from flask import Blueprint, request
from flask_login import login_required
from app.models import User, db, Family

user_routes = Blueprint('users', __name__)

@user_routes.route('/family/<int:id>', methods=["PUT"])
@login_required
def remove_user(id):
    """
    Query for a user and family by id and removes that family from the user then returns that user in a dictionary
    """
    req = request.json
    user = User.query.get(id)
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", user)
    family = Family.query.get(req['familyId'])
    user.families.remove(family)
    db.session.add(user)
    db.session.commit()
    return user.to_dict()

@user_routes.route('/family/<int:id>', methods=["POST"])
@login_required
def create_user(id):
    """
    Create a user and associate them with a family, then returns that user in a dictionary
    """
    req = request.json
    family = Family.query.get(req['id'])
    first_name = req['first_name']
    last_name = req['last_name']
    email = req['email']
    password = req['password']
    if(req['is_dependent'] == 'False'):
        is_dependent = False
    if(req['is_dependent'] == 'True'):
        is_dependent = True
    user = User(first_name=first_name, last_name=last_name, email=email, is_dependent=is_dependent, password=password)
    db.session.add(user)
    user.families.append(family)
    db.session.commit()
    return user.to_dict()

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_user(id):
    """
    Query for a user by id and updates that user then returns that user in a dictionary
    """
    user = User.query.get(id)
    req = request.json
    user.first_name = req['first_name']
    user.last_name = req['last_name']
    user.email = req['email']
    if(req['is_dependent'] == 'False'):
        user.is_dependent = False
    if(req['is_dependent'] == 'True'):
        user.is_dependent = True
    db.session.add(user)
    db.session.commit()
    return user.to_dict()