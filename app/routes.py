from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import db
from .models import Inventory, Invoice, InvoiceItem
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

# Invoice item model for API documentation
invoice_item_model = invoice_ns.model('InvoiceItem', {
    'name': fields.String(required=True),
    'item_bar': fields.String(required=True),
    'quantity': fields.Integer(required=True),
    'price': fields.Float(required=True),
    'description': fields.String(required=False)  # Added description field
})

# Invoice model for API documentation
invoice_model = invoice_ns.model('Invoice', {
    'type': fields.String(required=True),
    'machine_name': fields.String(required=True),
    'mechanism': fields.String(required=True),
    'client_name': fields.String(required=False),
    'Warehouse_manager': fields.String(required=False),
    'total_amount': fields.Float(required=False),
    'items': fields.List(fields.Nested(invoice_item_model))
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

        employee_id = get_jwt_identity()
        new_invoice = Invoice(
            type=data['type'],
            machine_name=data['machine_name'],
            mechanism=data['mechanism'],
            client_name=data.get('client_name'),
            Warehouse_manager=data.get('Warehouse_manager'),
            total_amount=data.get('total_amount'),
            employee_id=employee_id
        )

        for item_data in data['items']:
            new_item = InvoiceItem(
                name=item_data['name'],
                item_bar=item_data['item_bar'],
                quantity=item_data['quantity'],
                price=item_data['price'],
                description=item_data.get('description'),  # Added description
                invoice=new_invoice
            )
            db.session.add(new_item)

        db.session.add(new_invoice)
        db.session.commit()
        return new_invoice, 201

@invoice_ns.route('/<int:invoice_id>')
class InvoiceDetail(Resource):
    @invoice_ns.marshal_with(invoice_model)
    @jwt_required()
    def get(self, invoice_id):
        """Get an invoice by ID"""
        invoice = Invoice.query.get_or_404(invoice_id)
        return invoice

    @invoice_ns.expect(invoice_model)
    @invoice_ns.marshal_with(invoice_model)
    @jwt_required()
    def put(self, invoice_id):
        """Update an invoice"""
        data = invoice_ns.payload
        invoice = Invoice.query.get_or_404(invoice_id)

        invoice.type = data['type']
        invoice.machine_name = data['machine_name']
        invoice.mechanism = data['mechanism']
        invoice.client_name = data.get('client_name')
        invoice.Warehouse_manager = data.get('Warehouse_manager')
        invoice.total_amount = data.get('total_amount')

        # Update or add items
        for item_data in data['items']:
            if 'id' in item_data:  # Update existing item
                item = InvoiceItem.query.get(item_data['id'])
                if item:
                    item.name = item_data['name']
                    item.item_bar = item_data['item_bar']
                    item.quantity = item_data['quantity']
                    item.price = item_data['price']
                    item.description = item_data.get('description')  # Added description
            else:  # Add new item
                new_item = InvoiceItem(
                    name=item_data['name'],
                    item_bar=item_data['item_bar'],
                    quantity=item_data['quantity'],
                    price=item_data['price'],
                    description=item_data.get('description'),  # Added description
                    invoice=invoice
                )
                db.session.add(new_item)

        db.session.commit()
        return invoice

    @jwt_required()
    def delete(self, invoice_id):
        """Delete an invoice"""
        invoice = Invoice.query.get_or_404(invoice_id)
        db.session.delete(invoice)
        db.session.commit()
        return {"message": "Invoice deleted successfully"}, 200