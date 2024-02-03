from flask import Blueprint
from flask_login import login_required
from app.models import Shopping_list
from app.models import db


shopping_list_routes = Blueprint('shopping_lists', __name__)

@shopping_list_routes.route('/<int:familyId>')
@login_required
# @login_required
def get_shopping_lists(familyId):
    """
    Query for all shopping_lists and returns them in a list of shopping_lists dictionaries
    """
    shopping_lists = Shopping_list.query.filter(Shopping_list.family_id == familyId)
    return {'shopping_lists': [shopping_list.to_dict() for shopping_list in shopping_lists]}



@shopping_list_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def shopping_list_delete(id):
    """
    Query for a shopping_list by id and deletes that shopping_list
    """
    shopping_list = Shopping_list.query.get(id)

    db.session.delete(shopping_list)
    db.session.commit()

    return shopping_list.to_dict()

##! Have read and delete, need post and put.