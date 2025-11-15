import axios from 'axios';

/**
 * GUIDDINI EPAY PAYMENT INTEGRATION
 * 
 * API Documentation: https://www.guiddini.dz/docs/api/initiate
 * Login URL: https://epay.guiddini.dz/user/login
 * 
 * TEST CREDENTIALS (Development Only):
 * Email: groupe4@guiddini.com
 * Password: xv82DFy3mnE6
 * 
 * TEST CARD DETAILS (Development/Testing Only):
 * Card Number: 6280580610061011
 * CVV2: 992
 * Expiration Date: 01/2027
 * Cardholder Name: Davy jones
 * Card Password: 123456
 * 
 * ⚠️ IMPLEMENTATION STATUS: 
 * - API structure implemented
 * - Payment flow integration in progress
 * - Full transaction processing pending
 */

const PAYMENT_API_BASE_URL = 'https://epay.guiddini.dz/api';

// Configuration - These should be stored in environment variables in production
const APP_KEY = import.meta.env.VITE_PAYMENT_KEY || "APP-D6FMOTIV2OC2RVTNQO"; // these keys are for demo purposes only
const APP_SECRET = import.meta.env.VITE_PAYMENT_SECRET || "SEC-r18U6rS7lEOCB5X32C9G0y3TwVNHNdH3";
const IS_DEVELOPMENT = import.meta.env.DEV;

class PaymentService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: PAYMENT_API_BASE_URL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-app-key': APP_KEY,
        'x-app-secret': APP_SECRET
      }
    });
  }

  /**
   * Initiate a payment with the Guiddini ePay API
   * @param {number|string} amount - The amount to be paid (in DA)
   * @param {string} language - Language preference ('fr', 'en', 'ar')
   * @returns {Promise<Object>} Payment response with transaction ID and form URL
   */
  async initiatePayment(amount, language = 'FR') {
    // Development mode simulation
    if (IS_DEVELOPMENT && APP_SECRET === 'TEST_SECRET_KEY') {
      console.log('Development mode: Simulating payment initiation');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: 'TEST_' + Date.now(),
              attributes: {
                form_url: '/payment-success?transactionId=TEST_' + Date.now(),
                status: 'pending',
                amount: amount
              }
            },
            transactionId: 'TEST_' + Date.now(),
            redirectUrl: '/payment-success?transactionId=TEST_' + Date.now(),
            status: 'pending',
            amount: amount
          });
        }, 1000);
      });
    }

    try {
      const response = await this.apiClient.post('/payment/initiate', {
        amount: amount.toString(),
        language: language
      });

      if (response.data && response.data.data) {
        return {
          success: true,
          data: response.data.data,
          transactionId: response.data.data.id,
          redirectUrl: response.data.data.attributes.form_url,
          paymentUrl: response.data.data.attributes.form_url,
          status: response.data.data.attributes.status,
          amount: response.data.data.attributes.amount
        };
      } else {
        throw new Error('Invalid response format from payment API');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Payment initiation failed',
        statusCode: error.response?.status
      };
    }
  }

  /**
   * Show payment details using order number
   * @param {string} orderNumber - The order number of the transaction
   * @returns {Promise<Object>} Payment details response
   */
  async showPaymentDetails(orderNumber) {
    try {
      const response = await this.apiClient.get('/payment/show', {
        data: { order_number: orderNumber }
      });

      if (response.data && response.data.data) {
        const paymentData = response.data.data;
        const attributes = paymentData.attributes;
        
        return {
          success: true,
          data: response.data,
          transactionDetails: {
            id: paymentData.id,
            type: paymentData.type,
            amount: attributes.amount,
            orderNumber: attributes.order_number,
            orderId: attributes.order_id,
            status: attributes.status,
            depositAmount: attributes.deposit_amount,
            authCode: attributes.auth_code,
            actionCode: attributes.action_code,
            actionCodeDescription: attributes.action_code_description,
            errorCode: attributes.error_code,
            errorMessage: attributes.error_message,
            confirmationStatus: attributes.confirmation_status,
            licenseEnv: attributes.license_env,
            formUrl: attributes.form_url,
            syfeResponse: attributes.syfe_response,
            pan: attributes.pan,
            ipAddress: attributes.ip_address,
            approvalCode: attributes.approval_code,
            updatedAt: attributes.updated_at
          },
          meta: response.data.meta
        };
      } else {
        throw new Error('Invalid response format from payment API');
      }
    } catch (error) {
      console.error('Payment details retrieval failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to retrieve payment details',
        statusCode: error.response?.status
      };
    }
  }

  /**
   * Download payment receipt using order number
   * @param {string} orderNumber - The order number of the transaction
   * @returns {Promise<Object>} Receipt URL response
   */
  async downloadReceipt(orderNumber) {
    try {
      const response = await this.apiClient.get('/payment/receipt', {
        data: { order_number: orderNumber }
      });

      if (response.data) {
        return {
          success: true,
          data: response.data,
          receiptUrl: response.data.receipt_url || response.data.data?.receipt_url,
          message: response.data.message || 'Receipt retrieved successfully'
        };
      } else {
        throw new Error('Invalid response format from receipt API');
      }
    } catch (error) {
      console.error('Receipt download failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to download receipt',
        statusCode: error.response?.status
      };
    }
  }

  /**
   * Send payment receipt via email
   * @param {string} orderNumber - The order number of the transaction
   * @param {string} email - The email address to send the receipt to
   * @returns {Promise<Object>} Email send response
   */
  async emailReceipt(orderNumber, email) {
    try {
      const response = await this.apiClient.post('/payment/email', {
        order_number: orderNumber,
        email: email
      });

      if (response.data) {
        return {
          success: true,
          data: response.data,
          message: response.data.message || 'Receipt sent successfully'
        };
      } else {
        throw new Error('Invalid response format from email API');
      }
    } catch (error) {
      console.error('Email receipt failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to send receipt email',
        statusCode: error.response?.status
      };
    }
  }

  /**
   * Format amount for display
   * @param {number} amount - Amount in DA
   * @returns {string} Formatted amount
   */
  formatAmount(amount) {
    return `${amount.toLocaleString()} DA`;
  }

  /**
   * Validate payment amount
   * @param {number} amount - Amount to validate
   * @returns {boolean} Whether the amount is valid
   */
  isValidAmount(amount) {
    return amount && amount > 0 && !isNaN(amount);
  }

  /**
   * Get supported languages for payment
   * @returns {Array} Array of supported language codes
   */
  getSupportedLanguages() {
    return [
      { code: 'FR', name: 'Français' },
      { code: 'EN', name: 'English' },
      { code: 'AR', name: 'العربية' }
    ];
  }

  /**
   * Handle payment completion (for future webhook integration)
   * @param {Object} paymentData - Payment completion data
   * @returns {Object} Processing result
   */
  async handlePaymentCompletion(paymentData) {
    try {
      // This would typically verify the payment status with your backend
      // For now, we'll just return the data
      return {
        success: true,
        transactionId: paymentData.transactionId,
        status: paymentData.status,
        amount: paymentData.amount
      };
    } catch (error) {
      console.error('Payment completion handling failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Validate email address format
   * @param {string} email - Email address to validate
   * @returns {boolean} Whether the email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Get payment status by order number (convenience method)
   * @param {string} orderNumber - The order number of the transaction
   * @returns {Promise<string|null>} Payment status or null if not found
   */
  async getPaymentStatus(orderNumber) {
    try {
      const result = await this.showPaymentDetails(orderNumber);
      if (result.success) {
        return result.transactionDetails.status;
      }
      return null;
    } catch (error) {
      console.error('Failed to get payment status:', error);
      return null;
    }
  }

  /**
   * Check if payment is completed
   * @param {string} orderNumber - The order number of the transaction
   * @returns {Promise<boolean>} True if payment is completed
   */
  async isPaymentCompleted(orderNumber) {
    const status = await this.getPaymentStatus(orderNumber);
    return status === 'completed' || status === 'success';
  }
}

// Create and export a singleton instance
const paymentService = new PaymentService();
export default paymentService;

// Export the class as well for testing purposes
export { PaymentService };