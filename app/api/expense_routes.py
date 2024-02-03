from flask import Blueprint
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

##! Have read and delete, need post and put.