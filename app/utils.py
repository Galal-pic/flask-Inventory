def validate_inventory_data(data):
    required_fields = ['name', 'quantity', 'price']
    if not all(field in data for field in required_fields):
        return False
    if data['quantity'] < 0 or data['price'] < 0:
        return False
    return True

def validate_invoice_data(data):
    required_fields = ['type', 'Employee_Name', 'items']
    if not all(field in data for field in required_fields):
        return False
    for item in data['items']:
        if 'name' not in item:
            return False
    return True