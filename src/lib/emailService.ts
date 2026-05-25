/**
 * Email Service using Resend
 * Handles sending admin notifications
 */

import { newInquiryTemplate, newPartOrderTemplate, newVehicleInquiryTemplate } from './emailTemplates'

// Resend API configuration
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY
const RESEND_API_URL = 'https://api.resend.com/emails'
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@sacredgarage.com'
const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL || 'notifications@sacredgarage.com'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text: string
  from?: string
}

/**
 * Send email using Resend API
 */
const sendEmail = async (options: SendEmailOptions): Promise<boolean> => {
  if (!RESEND_API_KEY) {
    console.warn('⚠️ Resend API key not configured. Email not sent.')
    return false
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: options.from || FROM_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('❌ Resend API error:', error)
      return false
    }

    const data = await response.json()
    console.log('✅ Email sent successfully:', data.id)
    return true
  } catch (error) {
    console.error('❌ Error sending email:', error)
    return false
  }
}

/**
 * Send new inquiry notification to admin
 */
export const sendNewInquiryNotification = async (data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}): Promise<boolean> => {
  try {
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Manila'
    })

    const template = newInquiryTemplate({
      ...data,
      timestamp
    })

    return await sendEmail({
      to: ADMIN_EMAIL,
      subject: template.subject,
      html: template.html,
      text: template.text
    })
  } catch (error) {
    console.error('❌ Error sending inquiry notification:', error)
    return false
  }
}

/**
 * Send new part order notification to admin
 */
export const sendNewPartOrderNotification = async (data: {
  partName: string
  partBrand: string
  partPrice: string
  quantity: number
  customerName: string
  customerEmail: string
  customerPhone: string
  deliveryOption: string
}): Promise<boolean> => {
  try {
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Manila'
    })

    const template = newPartOrderTemplate({
      ...data,
      timestamp
    })

    return await sendEmail({
      to: ADMIN_EMAIL,
      subject: template.subject,
      html: template.html,
      text: template.text
    })
  } catch (error) {
    console.error('❌ Error sending part order notification:', error)
    return false
  }
}

/**
 * Send new vehicle inquiry notification to admin
 */
export const sendNewVehicleInquiryNotification = async (data: {
  vehicleBrand: string
  vehicleModel: string
  vehicleYear: number
  vehiclePrice: string
  customerName: string
  customerEmail: string
  customerPhone: string
  inquiryType: string
  message: string
}): Promise<boolean> => {
  try {
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Manila'
    })

    const template = newVehicleInquiryTemplate({
      ...data,
      timestamp
    })

    return await sendEmail({
      to: ADMIN_EMAIL,
      subject: template.subject,
      html: template.html,
      text: template.text
    })
  } catch (error) {
    console.error('❌ Error sending vehicle inquiry notification:', error)
    return false
  }
}

/**
 * Test email function (for debugging)
 */
export const sendTestEmail = async (): Promise<boolean> => {
  try {
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Manila'
    })

    const template = newInquiryTemplate({
      firstName: 'Test',
      lastName: 'Customer',
      email: 'test@example.com',
      phone: '+63 912 345 6789',
      message: 'This is a test email to verify the email notification system is working correctly.',
      timestamp
    })

    return await sendEmail({
      to: ADMIN_EMAIL,
      subject: '🧪 Test Email - Sacred Garage Notifications',
      html: template.html,
      text: template.text
    })
  } catch (error) {
    console.error('❌ Error sending test email:', error)
    return false
  }
}
