from flask_wtf import FlaskForm
from tokenize import String
from wtforms import StringField,PasswordField,SubmitField,BooleanField
from wtforms.validators import DataRequired,Length,Email,Regexp,EqualTo

class RegistrationForm(FlaskForm):
    fname = StringField(label='First Name',validators=[DataRequired(),Length(min=5,max=50)])
    lname = StringField(label='Last Name', validators=[DataRequired(),Length(min=5, max=50)])
    email = StringField(label='Email', validators=[DataRequired(), Email()])
    password = PasswordField(label='Password', validators=[DataRequired(), 
                                                           Length(min=8, max=50), 
                                                           Regexp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,32}$")])
    confirm_password = PasswordField(label='Confirm Password', validators=[DataRequired(), EqualTo('password')])
    warehouse_worker = BooleanField(label='warehouse_worker')
    manager = BooleanField(label='Manager')
    sales = BooleanField(label='Sales')
    purchases = BooleanField(label='Purchases')
    submit = SubmitField(label='Register')                             
    

class LoginForm(FlaskForm):
    email = StringField(label='Email', validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField(label='Log In')             