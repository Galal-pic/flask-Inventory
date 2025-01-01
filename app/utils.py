def validate_inventory_data(data):
    required_fields = ['name', 'quantity', 'price']
    return all(field in data for field in required_fields)

def validate_invoice_data(data):
    required_fields = ['type', 'machine_name', 'mechanism', 'items']
    if not all(field in data for field in required_fields):
        return False
    for item in data['items']:
        if not all(key in item for key in ['name', 'item_bar', 'quantity', 'price']):
            return False
    return True