from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import db
from .models import Inventory, Invoice, InvoiceItem
from .utils import validate_inventory_data, validate_invoice_data

# Namespaces
inventory_ns = Namespace('inventory', description='Inventory operations')
invoice_ns = Namespace('invoices', description='Invoice operations')

# Models for API documentation
inventory_model = inventory_ns.model('Inventory', {
    'id': fields.Integer(readOnly=True),
    'name': fields.String(required=True),
    'quantity': fields.Integer(required=True),
    'price': fields.Float(required=True),
    'created_at': fields.DateTime(readOnly=True),
    'updated_at': fields.DateTime(readOnly=True)
})

invoice_item_model = invoice_ns.model('InvoiceItem', {
    'name': fields.String(required=True),
    'item_bar': fields.String(required=False),
    'quantity': fields.Integer(required=False),
    'price': fields.Float(required=False),
    'total_price': fields.Float(required=False),
    'description': fields.String(required=False)
})

invoice_model = invoice_ns.model('Invoice', {
    'type': fields.String(required=True),
    'machine_name': fields.String(required=False),
    'mechanism': fields.String(required=False),
    'client_name': fields.String(required=False),
    'Warehouse_manager': fields.String(required=False),
    'total_amount': fields.Float(required=False),
    'Employee_Name': fields.String(required=True),
    'items': fields.List(fields.Nested(invoice_item_model))
})

# Inventory Endpoints
@inventory_ns.route('/')
class InventoryList(Resource):
    @inventory_ns.marshal_list_with(inventory_model)
    @jwt_required()
    def get(self):
        """Get all inventory items"""
        return Inventory.query.all()

    @inventory_ns.expect(inventory_model)
    @inventory_ns.marshal_with(inventory_model)
    @jwt_required()
    def post(self):
        """Add a new inventory item"""
        data = inventory_ns.payload
        if not validate_inventory_data(data):
            inventory_ns.abort(400, "Invalid data")
        new_item = Inventory(**data)
        db.session.add(new_item)
        db.session.commit()
        return new_item, 201

# Invoice Endpoints
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
        employee_id = get_jwt_identity()
        new_invoice = Invoice(employee_id=employee_id, **data)
        for item_data in data['items']:
            new_item = InvoiceItem(**item_data, invoice=new_invoice)
            db.session.add(new_item)
        db.session.add(new_invoice)
        db.session.commit()
        return new_invoice, 201