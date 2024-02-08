from flask import Blueprint, request
from flask_login import login_required
from app.models import Medication
from app.models import db


medication_routes = Blueprint('medications', __name__)

@medication_routes.route('/<int:userId>')
@login_required
# @login_required
def medication_by_user(userId):
    """
    Query for all medications and returns them in a list of medications dictionaries
    """
    medications = Medication.query.filter(Medication.user_id == userId)
    return {'medications': [medication.to_dict() for medication in medications]}



@medication_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def medication_delete(id):
    """
    Query for a medication by id and deletes that medication
    """
    medication = Medication.query.get(id)

    db.session.delete(medication)
    db.session.commit()

    return medication.to_dict()

@medication_routes.route('/', methods=["POST"])
# @login_required
# @login_required
def medication_create():
    """
    Create medication and returns it
    """
    med = request.json
    name = med['name']
    dosage = med['dosage']
    time = med['time']
    user_id = med['user_id']
    new_med = Medication(name = name,dosage = dosage,time = time,user_id = user_id)

    db.session.add(new_med)
    db.session.commit()

    return request.json

##! Have read and delete, need post and put.