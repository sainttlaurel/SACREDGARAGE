/**
 * Professional Email Templates for Sacred Garage
 * Used for admin notifications
 */

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

/**
 * New Inquiry Notification Email
 * Sent to admin when customer submits inquiry
 */
export const newInquiryTemplate = (data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  timestamp: string
}): EmailTemplate => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #ffffff;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .badge {
      display: inline-block;
      background-color: #dc2626;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 12px;
    }
    .content {
      padding: 32px 24px;
    }
    .section {
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #333;
      min-width: 120px;
    }
    .info-value {
      color: #666;
      text-align: right;
      flex: 1;
      word-break: break-word;
    }
    .message-box {
      background-color: #f9fafb;
      border-left: 4px solid #dc2626;
      padding: 16px;
      border-radius: 4px;
      margin-top: 12px;
    }
    .message-box p {
      margin: 0;
      color: #333;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .cta-button {
      display: inline-block;
      background-color: #dc2626;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 24px;
      transition: background-color 0.2s;
    }
    .cta-button:hover {
      background-color: #b91c1c;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #666;
    }
    .footer p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🚗 Sacred Garage</h1>
      <p>New Customer Inquiry</p>
      <div class="badge">ACTION REQUIRED</div>
    </div>

    <!-- Content -->
    <div class="content">
      <p style="margin-top: 0; color: #333; font-size: 16px;">
        You have received a new inquiry from a potential customer.
      </p>

      <!-- Customer Info -->
      <div class="section">
        <div class="section-title">📋 Customer Information</div>
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">${data.firstName} ${data.lastName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value"><a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">${data.email}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value"><a href="tel:${data.phone}" style="color: #dc2626; text-decoration: none;">${data.phone}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Received:</span>
          <span class="info-value">${data.timestamp}</span>
        </div>
      </div>

      <!-- Message -->
      <div class="section">
        <div class="section-title">💬 Message</div>
        <div class="message-box">
          <p>${data.message}</p>
        </div>
      </div>

      <!-- CTA -->
      <p style="margin-top: 24px; color: #666; font-size: 14px;">
        Please respond to this inquiry as soon as possible to provide excellent customer service.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Sacred Garage Admin Notification System</p>
      <p style="margin-top: 8px; opacity: 0.7;">This is an automated email. Please do not reply to this address.</p>
    </div>
  </div>
</body>
</html>
  `.trim()

  const text = `
Sacred Garage - New Customer Inquiry

CUSTOMER INFORMATION
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Received: ${data.timestamp}

MESSAGE
${data.message}

---
Please respond to this inquiry as soon as possible.
Sacred Garage Admin Notification System
  `.trim()

  return {
    subject: `🚗 New Inquiry from ${data.firstName} ${data.lastName}`,
    html,
    text
  }
}

/**
 * New Part Order Notification Email
 * Sent to admin when customer places part order
 */
export const newPartOrderTemplate = (data: {
  partName: string
  partBrand: string
  partPrice: string
  quantity: number
  customerName: string
  customerEmail: string
  customerPhone: string
  deliveryOption: string
  timestamp: string
}): EmailTemplate => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #ffffff;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .badge {
      display: inline-block;
      background-color: #16a34a;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 12px;
    }
    .content {
      padding: 32px 24px;
    }
    .section {
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #333;
      min-width: 120px;
    }
    .info-value {
      color: #666;
      text-align: right;
      flex: 1;
      word-break: break-word;
    }
    .part-box {
      background-color: #f9fafb;
      border: 2px solid #e5e7eb;
      padding: 16px;
      border-radius: 6px;
      margin-top: 12px;
    }
    .part-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }
    .part-details {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #16a34a;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 24px;
      transition: background-color 0.2s;
    }
    .cta-button:hover {
      background-color: #15803d;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #666;
    }
    .footer p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🚗 Sacred Garage</h1>
      <p>New Part Order</p>
      <div class="badge">NEW ORDER</div>
    </div>

    <!-- Content -->
    <div class="content">
      <p style="margin-top: 0; color: #333; font-size: 16px;">
        A customer has placed a new order for a part.
      </p>

      <!-- Part Info -->
      <div class="section">
        <div class="section-title">🔧 Part Details</div>
        <div class="part-box">
          <p class="part-name">${data.partBrand} ${data.partName}</p>
          <p class="part-details">
            <strong>Price:</strong> ${data.partPrice}<br>
            <strong>Quantity:</strong> ${data.quantity}<br>
            <strong>Delivery:</strong> ${data.deliveryOption}
          </p>
        </div>
      </div>

      <!-- Customer Info -->
      <div class="section">
        <div class="section-title">👤 Customer Information</div>
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">${data.customerName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value"><a href="mailto:${data.customerEmail}" style="color: #16a34a; text-decoration: none;">${data.customerEmail}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value"><a href="tel:${data.customerPhone}" style="color: #16a34a; text-decoration: none;">${data.customerPhone}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Order Date:</span>
          <span class="info-value">${data.timestamp}</span>
        </div>
      </div>

      <!-- CTA -->
      <p style="margin-top: 24px; color: #666; font-size: 14px;">
        Please contact the customer to confirm the order and arrange payment/delivery.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Sacred Garage Admin Notification System</p>
      <p style="margin-top: 8px; opacity: 0.7;">This is an automated email. Please do not reply to this address.</p>
    </div>
  </div>
</body>
</html>
  `.trim()

  const text = `
Sacred Garage - New Part Order

PART DETAILS
Brand: ${data.partBrand}
Name: ${data.partName}
Price: ${data.partPrice}
Quantity: ${data.quantity}
Delivery: ${data.deliveryOption}

CUSTOMER INFORMATION
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}
Order Date: ${data.timestamp}

---
Please contact the customer to confirm the order.
Sacred Garage Admin Notification System
  `.trim()

  return {
    subject: `🛒 New Part Order - ${data.partBrand} ${data.partName}`,
    html,
    text
  }
}

/**
 * New Vehicle Inquiry Notification Email
 * Sent to admin when customer inquires about a vehicle
 */
export const newVehicleInquiryTemplate = (data: {
  vehicleBrand: string
  vehicleModel: string
  vehicleYear: number
  vehiclePrice: string
  customerName: string
  customerEmail: string
  customerPhone: string
  inquiryType: string
  message: string
  timestamp: string
}): EmailTemplate => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #ffffff;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .badge {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 12px;
    }
    .content {
      padding: 32px 24px;
    }
    .section {
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #333;
      min-width: 120px;
    }
    .info-value {
      color: #666;
      text-align: right;
      flex: 1;
      word-break: break-word;
    }
    .vehicle-box {
      background-color: #f9fafb;
      border: 2px solid #e5e7eb;
      padding: 16px;
      border-radius: 6px;
      margin-top: 12px;
    }
    .vehicle-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }
    .vehicle-details {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
    .message-box {
      background-color: #f9fafb;
      border-left: 4px solid #2563eb;
      padding: 16px;
      border-radius: 4px;
      margin-top: 12px;
    }
    .message-box p {
      margin: 0;
      color: #333;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #666;
    }
    .footer p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🚗 Sacred Garage</h1>
      <p>New Vehicle Inquiry</p>
      <div class="badge">INQUIRY</div>
    </div>

    <!-- Content -->
    <div class="content">
      <p style="margin-top: 0; color: #333; font-size: 16px;">
        A customer has inquired about one of your vehicles.
      </p>

      <!-- Vehicle Info -->
      <div class="section">
        <div class="section-title">🚙 Vehicle Details</div>
        <div class="vehicle-box">
          <p class="vehicle-name">${data.vehicleYear} ${data.vehicleBrand} ${data.vehicleModel}</p>
          <p class="vehicle-details">
            <strong>Price:</strong> ${data.vehiclePrice}<br>
            <strong>Inquiry Type:</strong> ${data.inquiryType}
          </p>
        </div>
      </div>

      <!-- Customer Info -->
      <div class="section">
        <div class="section-title">👤 Customer Information</div>
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">${data.customerName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value"><a href="mailto:${data.customerEmail}" style="color: #2563eb; text-decoration: none;">${data.customerEmail}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value"><a href="tel:${data.customerPhone}" style="color: #2563eb; text-decoration: none;">${data.customerPhone}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Inquiry Date:</span>
          <span class="info-value">${data.timestamp}</span>
        </div>
      </div>

      <!-- Message -->
      <div class="section">
        <div class="section-title">💬 Message</div>
        <div class="message-box">
          <p>${data.message}</p>
        </div>
      </div>

      <!-- CTA -->
      <p style="margin-top: 24px; color: #666; font-size: 14px;">
        Please respond to the customer's inquiry as soon as possible.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Sacred Garage Admin Notification System</p>
      <p style="margin-top: 8px; opacity: 0.7;">This is an automated email. Please do not reply to this address.</p>
    </div>
  </div>
</body>
</html>
  `.trim()

  const text = `
Sacred Garage - New Vehicle Inquiry

VEHICLE DETAILS
Year: ${data.vehicleYear}
Brand: ${data.vehicleBrand}
Model: ${data.vehicleModel}
Price: ${data.vehiclePrice}
Inquiry Type: ${data.inquiryType}

CUSTOMER INFORMATION
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}
Inquiry Date: ${data.timestamp}

MESSAGE
${data.message}

---
Please respond to the customer's inquiry.
Sacred Garage Admin Notification System
  `.trim()

  return {
    subject: `🚗 Vehicle Inquiry - ${data.vehicleYear} ${data.vehicleBrand} ${data.vehicleModel}`,
    html,
    text
  }
}
