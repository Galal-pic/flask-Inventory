from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import db
from .models import Inventory, Invoice
from .utils import validate_inventory_data, validate_invoice_data

# Create namespaces
inventory_ns = Namespace('inventory', description='Inventory operations')
invoice_ns = Namespace('invoices', description='Invoice operations')

# Inventory model for API documentation
inventory_model = inventory_ns.model('Inventory', {
    'id': fields.Integer(readOnly=True),
    'name': fields.String(required=True),
    'quantity': fields.Integer(required=True),
    'price': fields.Float(required=True),
    'created_at': fields.DateTime(readOnly=True),
    'updated_at': fields.DateTime(readOnly=True)
})

# Invoice model for API documentation
invoice_model = invoice_ns.model('Invoice', {
    'id': fields.Integer(readOnly=True),
    'type': fields.String(required=True),
    'amount': fields.Float(required=True),
    'created_at': fields.DateTime(readOnly=True),
    'employee_id': fields.Integer(required=True)
})

@inventory_ns.route('/')
class InventoryList(Resource):
    @inventory_ns.marshal_list_with(inventory_model)
    @jwt_required()
    def get(self):
        """Get all inventory items"""
        inventory = Inventory.query.all()
        return inventory

    @inventory_ns.expect(inventory_model)
    @inventory_ns.marshal_with(inventory_model)
    @jwt_required()
    def post(self):
        """Add a new inventory item"""
        data = inventory_ns.payload
        if not validate_inventory_data(data):
            inventory_ns.abort(400, "Invalid data")

        new_item = Inventory(name=data['name'], quantity=data['quantity'], price=data['price'])
        db.session.add(new_item)
        db.session.commit()
        return new_item, 201

@invoice_ns.route('/')
class InvoiceList(Resource):
    @invoice_ns.expect(invoice_model)
    @invoice_ns.marshal_with(invoice_model)
    @jwt_required()
    def post(self):
        """Create a new invoice"""
        data = invoice_ns.payload
        if not validate_invoice_data(data):
            invoice_ns.abort(400, "Invalid data")

        new_invoice = Invoice(type=data['type'], amount=data['amount'], employee_id=get_jwt_identity())
        db.session.add(new_invoice)
        db.session.commit()
        return new_invoice, 201