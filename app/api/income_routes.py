from flask import Blueprint
from flask_login import login_required
from app.models import Income
from app.models import db


income_routes = Blueprint('incomes', __name__)

@income_routes.route('/<int:userId>')
@login_required
# @login_required
def incomes(userId):
    """
    Query for all incomes and returns them in a list of incomes dictionaries
    """
    incomes = Income.query.filter(Income.user_id == userId)
    return {'incomes': [income.to_dict() for income in incomes]}



@income_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def income_delete(id):
    """
    Query for a income by id and deletes that income
    """
    income = Income.query.get(id)

    db.session.delete(income)
    db.session.commit()

    return income.to_dict()

##! Have read and delete, need post and put.