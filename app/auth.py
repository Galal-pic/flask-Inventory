from flask_restx import Namespace, Resource, fields
from flask import jsonify,make_response
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import db
from .models import Employee

# Create namespace
auth_ns = Namespace('auth', description='Authentication operations')

# Registration model for API documentation
registration_model = auth_ns.model('Registration', {
    'username': fields.String(required=True),
    'password': fields.String(required=True),
    'phone_number': fields.String(required=False),
    'job_name': fields.String(required=True),
})

# Update user model for API documentation
update_user_model = auth_ns.model('UpdateUser', {
    'username': fields.String(required=False),
    'password': fields.String(required=False),
    'phone_number': fields.String(required=False),
    'job_name': fields.String(required=False),
})

# Login model for API documentation
login_model = auth_ns.model('Login', {
    'username': fields.String(required=True),
    'password': fields.String(required=True)
})

@auth_ns.route('/register')
class Register(Resource):
    @auth_ns.expect(registration_model)
    def post(self):
        """Register a new employee"""
        data = auth_ns.payload

        # Extract data from request payload
        username = data.get('username')
        password = data.get('password')
        phone_number = data.get('phone_number')
        job_name = data.get('job_name')

        # Validate required fields
        if not username or not password or not job_name:
            auth_ns.abort(400, "Missing required fields")

        # Check if username already exists
        if Employee.query.filter_by(username=username).first():
            return jsonify ({"message":f"user with usser name {username} is already registered"})

        # Create new employee
        new_employee = Employee(
            username=username,
            password_hash=generate_password_hash(password),
            phone_number=phone_number,
            job_name=job_name,
        )
        db.session.add(new_employee)
        db.session.commit()
        return make_response(jsonify({"message": f"{username} -> Employee registered successfully"}), 201)
    

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        """Login and get access token"""
        data = auth_ns.payload

        # Extract data from request payload
        username = data.get('username')
        password = data.get('password')

        employee = Employee.query.filter_by(username=username).first()
        if not employee or not check_password_hash(employee.password_hash, password):
            auth_ns.abort(401, "Invalid credentials")

        access_token = create_access_token(identity=str(employee.id))
        return make_response(jsonify({"access_token": access_token}), 200)


@auth_ns.route('/user/<int:user_id>')
class UserManagement(Resource):
    @auth_ns.expect(update_user_model)
    @jwt_required()
    def put(self, user_id):
        """Update user data"""
        data = auth_ns.payload
        print(data)
        employee = Employee.query.get_or_404(user_id)

        # Update fields if provided
        if 'username' in data:
            employee.username = data['username']
        if 'password' in data:
            employee.password_hash = generate_password_hash(data['password'])
        if 'phone_number' in data:
            employee.phone_number = data['phone_number']
        if 'job_name' in data:
            employee.job_name = data['job_name']

        db.session.commit()
        return make_response(jsonify({"message": "User updated successfully"}), 200)

    @jwt_required()
    def delete(self, user_id):
        """Delete a user"""
        employee = Employee.query.get_or_404(user_id)
        db.session.delete(employee)
        db.session.commit()
        return make_response(jsonify({"message": "User deleted successfully"}), 200)