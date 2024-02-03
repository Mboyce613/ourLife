from flask import Blueprint
from flask_login import login_required
from app.models import Appointment
from app.models import db


appointment_routes = Blueprint('appointments', __name__)

@appointment_routes.route('/<int:userId>')
@login_required
# @login_required
def appointments(userId):
    """
    Query for all appointments and returns them in a list of appointments dictionaries
    """
    appointments = Appointment.query.filter(Appointment.user_id == userId)
    return {'appointments': [appointment.to_dict() for appointment in appointments]}



@appointment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def appointment_delete(id):
    """
    Query for a appointment by id and deletes that appointment
    """
    appointment = Appointment.query.get(id)

    db.session.delete(appointment)
    db.session.commit()

    return appointment.to_dict()

##! Have read and delete, need post and put.