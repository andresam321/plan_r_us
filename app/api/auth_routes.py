from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import os

FAMILY_CODE = os.environ.get('FAMILY_CODE')

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['family_code'] != FAMILY_CODE:
            return {'errors': 'Invalid family code.'}, 400

        user = User.query.filter(User.first_name == form.data['first_name'], User.family_code == form.data['family_code']).first()
        if user:
            login_user(user)
            return user.to_dict()
        return {'errors': {'message': 'Invalid credentials'}}, 401
    return form.errors, 401



@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['family_code'] != FAMILY_CODE:
            return {'errors': 'Invalid family code.'}, 400

        if User.query.filter(User.first_name == form.data['first_name']).first():
            return {'errors': 'User already exists.'}, 400

        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            family_code=form.data['family_code']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401