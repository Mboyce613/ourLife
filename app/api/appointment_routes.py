from flask import Blueprint, request
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

@appointment_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def appointments_update(id):
    """
    Query for an appointment by id and update that appointment
    """
    appointment = Appointment.query.get(id)
    app = request.json
    appointment.name = app['name']
    appointment.request = app['request']
    appointment.start_date = app['start_date']
    appointment.duration = app['duration']
    appointment.user_id = app['user_id']
    db.session.add(appointment)
    db.session.commit()

    return appointment.to_dict()

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

@appointment_routes.route('/', methods=["POST"])
# @login_required
# @login_required
def appointment_create():
    """
    Create appointment and returns it
    """
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!! LINE 57")
    app = request.json
    name = app['name']
    if(app.request == "False"):
        request = False
    if(app.request == "True"):
        request = True
    start_date = app['start_date']
    duration = app['duration']
    user_id = app['user_id']
    new_app = Appointment(name = name, request = request, start_date = start_date, duration = duration, user_id = user_id)

    db.session.add(new_app)
    db.session.commit()

    return request.json

##! Have read and delete, need post and put.