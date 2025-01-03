from datetime import datetime
from . import db

class Employee(db.Model):
    __tablename__ = 'employee'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(20))
    job_name = db.Column(db.String(100), nullable=False)
    invoices = db.relationship('Invoice', backref='employee', lazy=True)

class Inventory(db.Model):
    __tablename__ = 'inventory'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, index=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Invoice(db.Model):
    __tablename__ = 'invoice'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    machine_name = db.Column(db.String(255))
    mechanism = db.Column(db.String(255))
    client_name = db.Column(db.String(50))
    Warehouse_manager = db.Column(db.String(255))
    total_amount = db.Column(db.Float)
    Employee_Name = db.Column(db.String(50), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    items = db.relationship('InvoiceItem', backref='invoice', cascade='all, delete-orphan')

class InvoiceItem(db.Model):
    __tablename__ = 'invoice_item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, index=True)
    item_bar = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Float)
    total_price = db.Column(db.Float)
    description = db.Column(db.Text)
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'), nullable=False)