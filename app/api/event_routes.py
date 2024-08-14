from flask import Blueprint, request
from app.models import Event
from app.forms import EventForm
from flask_login import current_user, login_user, logout_user, login_required


event_routes = Blueprint("event",__name__)