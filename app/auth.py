from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin
from . import db
from .models import Employee

# Create namespace
auth_ns = Namespace('auth', description='Authentication operations')

# Registration model for API documentation
registration_model = auth_ns.model('Registration', {
    'username': fields.String(required=True),
    'password': fields.String(required=True),
    'phone_number': fields.String(),
    'job_name': fields.String(required=True)
})

# Login model for API documentation
login_model = auth_ns.model('Login', {
    'username': fields.String(required=True),
    'password': fields.String(required=True)
})

users_model = auth_ns.model('Users', {
    'username': fields.String(required=True),
    'phone_number': fields.String(),
    'job_name': fields.String(required=True)
})

update_user_model = auth_ns.model('UpdateUser', {
    'username': fields.String(required=False),
    'password': fields.String(required=False),
    'phone_number': fields.String(required=False),
    'job_name': fields.String(required=False),
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
            auth_ns.abort(400, "Username already exists")

        # Create new employee
        new_employee = Employee(
            username=username,
            password_hash=generate_password_hash(password),
            phone_number=phone_number,
            job_name=job_name
        )
        db.session.add(new_employee)
        db.session.commit()
        return {"message": "Employee registered successfully"}, 201

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        """Login and get access token"""
        data = auth_ns.payload
        username = data.get('username')
        password = data.get('password')

        employee = Employee.query.filter_by(username=username).first()
        if not employee or not check_password_hash(employee.password_hash, password):
            auth_ns.abort(401, "Invalid credentials")

        access_token = create_access_token(identity=str(employee.id))
        return {"access_token": access_token}, 200

@auth_ns.route('/user/<int:user_id>')
class UserManagement(Resource):
    @auth_ns.expect(update_user_model)
    @jwt_required()
    def put(self, user_id):
        """Update user data"""
        data = auth_ns.payload
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

        return {"message": "User updated successfully"}, 200

    @jwt_required()
    def delete(self, user_id):
        """Delete a user"""
        employee = Employee.query.get_or_404(user_id)
        db.session.delete(employee)
        db.session.commit()
        return {"message": "User deleted successfully"}, 200

@auth_ns.route('/users')
class Users(Resource):
    """Return ALL data users"""
    @auth_ns.marshal_list_with(users_model)
    @jwt_required()
    def get(self):
        """Get employee details"""
        employees = Employee.query.all()
        return employees

@auth_ns.route('/user')
class User(Resource):
    @cross_origin()  # Enable CORS for this route
    @jwt_required()
    def get(self):
        """Return user information by Token"""
        user_id = get_jwt_identity()  # Get the user ID from the JWT token
        user = Employee.query.get(user_id)
        if user:
            return {
                "id": user.id,
                "username": user.username,
                "job_name": user.job_name,
                # Add other fields as needed
            }, 200
        else:
            return {"error": "User not found"}, 404