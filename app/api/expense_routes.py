from flask import Blueprint, request
from flask_login import login_required
from app.models import Expense
from app.models import db


expense_routes = Blueprint('expenses', __name__)

@expense_routes.route('/<int:userId>')
@login_required
# @login_required
def expenses(userId):
    """
    Query for all expenses and returns them in a list of expenses dictionaries
    """
    expenses = Expense.query.filter(Expense.user_id == userId)
    return {'expenses': [expense.to_dict() for expense in expenses]}

@expense_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def expense_update(id):
    """
    Query for an expense by id and update that expense
    """
    expense = Expense.query.get(id)
    exp = request.json
    expense.name = exp['name']
    expense.amount = exp['amount']
    expense.user_id = exp['user_id']
    db.session.add(expense)
    db.session.commit()

    return expense.to_dict()

@expense_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def expense_delete(id):
    """
    Query for a expense by id and deletes that expense
    """
    expense = Expense.query.get(id)

    db.session.delete(expense)
    db.session.commit()

    return expense.to_dict()

@expense_routes.route('/', methods=["POST"])
# @login_required
# @login_required
def expense_create():
    """
    Create expense and returns it
    """
    exp = request.json
    name = exp['name']
    amount = exp['amount']
    user_id = exp['user_id']
    new_exp = Expense(name = name,amount = amount,user_id = user_id)

    db.session.add(new_exp)
    db.session.commit()

    return request.json

##! Have read and delete, need post and put.