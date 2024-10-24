from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.api.email_routes import send_family_code_email, generate_family_code
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
        # Fetch user by email and family code
        user = User.query.filter_by(email=form.data['email']).first()
        
        if user and user.check_password(form.data['password']) and user.check_family_code(form.data['family_code']):
            login_user(user)
            return user.to_dict()
        else:
            return {'errors': {'message': 'Invalid email, password, or family code.'}}, 401
    return form.errors, 401



@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


# @auth_routes.route('/signup', methods=['POST'])
# def sign_up():
#     form = SignUpForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         if form.data['family_code'] != FAMILY_CODE:
#             return {'errors': 'Invalid family code.'}, 400

#         if User.query.filter(User.first_name == form.data['first_name']).first():
#             return {'errors': 'User already exists.'}, 400

#         user = User(
#             first_name=form.data['first_name'],
#             last_name=form.data['last_name'],
#             family_code=form.data['family_code']
#         )
#         db.session.add(user)
#         db.session.commit()
#         login_user(user)
#         return user.to_dict()
#     return form.errors, 401

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        # Check if family code is provided; generate one if not
        family_code = form.data.get('family_code')
        if not family_code:
            family_code = generate_family_code()  # Generate a new family code

        # Create a new user with the provided or generated family code
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            email = form.data['email'],
            password=form.data['password'],
            family_code=family_code
        )
        
        db.session.add(user)
        db.session.commit()

        # Send the generated family code via email to the user's email
        send_family_code_email(form.data['email'], family_code)

        login_user(user)
        return user.to_dict()
    
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401