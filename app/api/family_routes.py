from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Family, user_families, User
from app.models import db

family_routes = Blueprint('families', __name__)

@family_routes.route('/<int:family_id>')
@login_required
# @login_required
def families(family_id):
    """
    Query for all families and returns them in a list of families dictionaries
    """
    family = Family.query.filter(Family.id == family_id)
    return {'family': [fam.to_dict() for fam in family]}


@family_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def family_delete(id):
    """
    Query for a family by id and deletes that family
    """
    family = Family.query.get(id)

    db.session.delete(family)
    db.session.commit()

    return family.to_dict()

@family_routes.route('/', methods=["POST"])
@login_required
def create_family():
    """
    Create a family and return it as a dictionary
    """
    req = request.json
    user = User.query.get(req['userId'])
    name = req['name']
    motto = req['motto']

    family = Family(name=name, motto=motto)
    family.users.append(user)

    db.session.add(family)
    db.session.commit()

    return family.to_dict()

##! Have read and delete, need post and put.