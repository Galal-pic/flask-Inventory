from datetime import datetime
from . import db

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(20))
    job_name = db.Column(db.String(100), nullable=False)
    invoices = db.relationship('Invoice', backref='employee', lazy=True)  # Relationship to Invoice

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "phone_number": self.phone_number,
            "job_name": self.job_name
        }

class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "quantity": self.quantity,
            "price": self.price,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    machine_name = db.Column(db.String(255), nullable=False)
    mechanism = db.Column(db.String(255), nullable=False)
    client_name = db.Column(db.String(50))
    Warehouse_manager = db.Column(db.String(255))
    total_amount = db.Column(db.Float)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    items = db.relationship('InvoiceItem', backref='invoice', cascade='all, delete-orphan')

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "created_at": self.created_at.isoformat(),
            "machine_name": self.machine_name,
            "mechanism": self.mechanism,
            "client_name": self.client_name,
            "Warehouse_manager": self.Warehouse_manager,
            "total_amount": self.total_amount,
            "employee_id": self.employee_id,
            "items": [item.serialize() for item in self.items]
        }

class InvoiceItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    item_bar = db.Column(db.String(20), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)  # Added description column
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "item_bar": self.item_bar,
            "quantity": self.quantity,
            "price": self.price,
            "description": self.description,
            "invoice_id": self.invoice_id
        }