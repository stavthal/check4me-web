# Stripe Payment Integration

This document explains the Stripe payment integration for the vehicle inspection service.

## Overview

The payment flow is integrated into the request creation process:

1. **Client creates a request** → Fills out the vehicle inspection form
2. **Payment required** → Payment modal appears with Stripe payment form
3. **Payment processing** → Stripe processes payment with manual capture
4. **Request submission** → Request is created with payment information
5. **Admin management** → Admins can manually capture payments after service completion

## Features

### Client Side

- **Secure Payment**: Integration with Stripe Elements for secure card input
- **Payment Modal**: Clean payment interface with service details
- **Real-time Validation**: Instant feedback on payment status
- **Payment Confirmation**: Clear success/error messaging

### Admin Side

- **Payment Management**: Admin dashboard to view and manage payments
- **Manual Capture**: Ability to capture held payments after service completion
- **Payment Details**: View payment metadata and request information
- **Audit Trail**: Track payment status and actions

### Backend

- **Payment Intents**: Uses Stripe Payment Intents with manual capture
- **Secure API**: Server-side Stripe integration with proper error handling
- **Metadata Storage**: Request details stored in Stripe metadata
- **Status Tracking**: Payment status synchronized with request status

## Configuration

### Environment Variables

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Pricing

- **Inspection Fee**: €50 per vehicle inspection
- **Currency**: EUR (Euros)
- **Capture Method**: Manual (funds held until admin captures)

## API Routes

### Client Routes

- `POST /api/stripe/create-payment-intent` - Create payment intent for request
- `POST /api/stripe/confirm-payment` - Confirm payment with card details

### Admin Routes

- `GET /api/stripe/payment-intent/[id]` - Get payment intent details
- `POST /api/stripe/capture-payment` - Capture held payment

## Components

### Client Components

- `ClientRequestsPaymentModal.vue` - Payment form modal
- `ClientRequestsAddRequestModal.vue` - Updated request form with payment flow

### Admin Components

- `AdminPaymentManager.vue` - Payment management dashboard

## Database Integration

The request table includes payment-related fields:

- `payment_intent_id` - Stripe payment intent ID
- `payment_status` - Current payment status
- `payment_amount` - Payment amount in cents

## Payment Flow

### 1. Request Creation

```typescript
// Client creates request → Payment modal opens
const onSubmit = async () => {
  // Validate form
  if (valid) {
    showPaymentModal.value = true;
  }
};
```

### 2. Payment Processing

```typescript
// Payment intent created with manual capture
const paymentIntent = await stripe.paymentIntents.create({
  amount: PRICING.INSPECTION_FEE * 100,
  currency: PRICING.CURRENCY,
  capture_method: "manual", // Funds held until manually captured
  metadata: {
    /* request details */
  },
});
```

### 3. Request Submission

```typescript
// Request submitted with payment information
await submitFormWithPayment(formData, paymentIntentId);
```

### 4. Admin Capture

```typescript
// Admin captures payment after service completion
const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
```

## Security

- **PCI Compliance**: Uses Stripe Elements for PCI-compliant card handling
- **Server-side Processing**: All sensitive operations on server
- **Environment Variables**: API keys stored securely in environment
- **Validation**: Proper validation and error handling throughout

## Testing

Use Stripe test cards for development:

- **Success**: `4242424242424242`
- **Decline**: `4000000000000002`
- **3D Secure**: `4000002500003155`

## Future Enhancements

- **Automatic Capture**: Capture payments automatically when service is marked complete
- **Refunds**: Admin ability to refund payments if needed
- **Payment History**: Detailed payment history and reporting
- **Multiple Payment Methods**: Support for additional payment methods
- **Subscription Plans**: Monthly plans for frequent users

## Troubleshooting

### Common Issues

1. **Stripe not loading**: Check publishable key configuration
2. **Payment fails**: Verify secret key and webhook endpoints
3. **Capture fails**: Ensure payment intent is in correct status

### Error Handling

The integration includes comprehensive error handling:

- Network errors are caught and displayed to user
- Stripe errors are properly formatted
- Server errors return appropriate HTTP status codes
- Client-side validation prevents invalid submissions

## Support

For payment-related issues:

1. Check Stripe dashboard for payment details
2. Review server logs for API errors
3. Use admin payment manager to investigate specific payments
4. Contact Stripe support for payment processing issues
