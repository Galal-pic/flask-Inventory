def validate_inventory_data(data):
    required_fields = ['name', 'quantity', 'price']
    return all(field in data for field in required_fields)

def validate_invoice_data(data):
    required_fields = ['type', 'amount']
    return all(field in data for field in required_fields)