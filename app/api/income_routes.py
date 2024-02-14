from flask import Blueprint, request
from flask_login import login_required
from app.models import Income
from app.models import db, User


income_routes = Blueprint('incomes', __name__)

@income_routes.route('/user/<int:userId>')
@login_required
# @login_required
def user_incomes(userId):
    """
    Query for all incomes and returns them in a list of incomes dictionaries
    """
    incomes = Income.query.filter(Income.user_id == userId)
    return {'incomes': [income.to_dict() for income in incomes]}

@income_routes.route('/<int:userId>')
@login_required
# @login_required
def incomes(userId):
    """
    Query for all incomes and returns them in a list of incomes dictionaries
    """
    incomes = Income.query.filter(Income.user_id == userId)
    return {'incomes': [income.to_dict() for income in incomes]}

@income_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def incomes_update(id):
    """
    Query for an income by id and update that income
    """
    income = Income.query.get(id)
    inc = request.json
    income.name = inc['name']
    income.amount = inc['amount']
    income.user_id = inc['user_id']
    db.session.add(income)
    db.session.commit()

    return income.to_dict()

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

@income_routes.route('/', methods=["POST"])
# @login_required
# @login_required
def income_create():
    """
    Create income and returns it
    """
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!! LINE 55")
    inc = request.json
    name = inc['name']
    amount = inc['amount']
    user_id = inc['user_id']
    new_inc = Income(name = name,amount = amount,user_id = user_id)

    db.session.add(new_inc)
    db.session.commit()

    return request.json

##! Have read and delete, need post and put.