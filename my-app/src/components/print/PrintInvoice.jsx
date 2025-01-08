import React from 'react';

export default function PrintInvoice({ invoice }) {
  return (
    <div id="print-section">
      <h3>Invoice {invoice.id}</h3>
      <p><strong>Customer:</strong> {invoice.customerName}</p>
      <p><strong>Total Amount:</strong> ${invoice.totalAmount}</p>
      <h4>Items:</h4>
      <ul>
        {invoice.items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
