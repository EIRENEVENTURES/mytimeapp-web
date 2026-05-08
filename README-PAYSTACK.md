# MyTimeApp Paystack Payment Integration

This document describes the complete Paystack payment flow implementation for MyTimeApp, connecting the mobile app to the web payment pages.

## 🚀 Payment Flow Overview

```
Mobile App (CreditsEarnings) → Web Payment Page → Paystack → Callback Page → Mobile App
```

### 1. User Flow
1. **Mobile App**: User selects credits and chooses Paystack
2. **Web Payment**: User completes payment on web page
3. **Paystack**: Processes payment securely
4. **Callback Page**: Verifies payment and shows status
5. **Mobile App**: User returns with credits added

### 2. Technical Flow
1. **Initialize**: Mobile app calls backend to initialize payment
2. **Redirect**: User is redirected to web payment page
3. **Process**: Web page opens Paystack popup
4. **Verify**: Callback page verifies payment with backend
5. **Complete**: Backend adds credits to user account
6. **Return**: User returns to mobile app with success/failure

## 📁 File Structure

### Web App (mytimeapp-web)
```
src/
├── pages/
│   ├── PaystackPayment.tsx      # Main payment page
│   └── PaystackCallback.tsx      # Payment status/callback page
├── App.tsx                      # Router configuration
└── components/ui/               # UI components
```

### Mobile App (MyTimeApp)
```
src/
├── services/
│   └── paystackService.ts       # Paystack integration service
├── screens/
│   └── CreditsEarningsScreen.tsx # Credits purchase screen
└── config/
    └── paystack.ts              # Paystack configuration
```

## 🔧 Configuration

### Environment Variables

#### Web App (.env)
```bash
# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
VITE_PAYSTACK_SECRET_KEY=sk_live_your_secret_key
VITE_PAYSTACK_WEBHOOK_SECRET=whsec_your_webhook_secret
VITE_BACKEND_API_URL=https://mytimeapp-n8zd.onrender.com
VITE_APP_DEEP_LINK=mytimeapp://payment/callback
```

#### Mobile App (.env)
```bash
# Paystack Configuration
EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
EXPO_PUBLIC_PAYSTACK_SECRET_KEY=sk_live_your_secret_key
EXPO_PUBLIC_PAYSTACK_WEBHOOK_SECRET=whsec_your_webhook_secret
EXPO_PUBLIC_PAYSTACK_WEBHOOK_URL=https://mytimeapp-n8zd.onrender.com/payments/webhook
```

## 🌐 Web Pages

### 1. Payment Page (`/paystack-payment`)

**Features:**
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Multiple payment methods (Card, Bank, USSD, Mobile Money)
- ✅ Real-time payment summary
- ✅ Paystack popup integration
- ✅ Error handling and loading states
- ✅ Security indicators and trust signals

**URL Parameters:**
```typescript
?amount=100&credits=100&email=user@example.com&currency=NGN&reference=ref123&userId=user123
```

**Security Features:**
- HTTPS enforcement
- Input validation
- XSS protection
- CSRF protection via reference validation

### 2. Callback Page (`/paystack-callback`)

**Features:**
- ✅ Automatic payment verification
- ✅ Real-time status updates (Processing → Success/Failed)
- ✅ Smart retry mechanism with exponential backoff
- ✅ Deep linking back to mobile app
- ✅ Support contact integration
- ✅ Detailed payment information display

**Verification Process:**
1. Calls backend `/payments/paystack/verify/:reference`
2. Retries with exponential backoff (max 10 attempts)
3. Completes payment via `/payments/paystack/complete`
4. Shows appropriate status and actions

## 📱 Mobile App Integration

### PaystackService Updates

```typescript
// Updated to use web payment URLs
async openPaymentUrl(url: string, paymentData: PaystackPaymentData): Promise<void> {
  const webPaymentUrl = `https://mytimeapp-web.vercel.app/paystack-payment?amount=${paymentData.amount}&credits=${credits}&email=${paymentData.email}&currency=${paymentData.currency}&reference=${paymentData.reference}&userId=${userId}`;
  
  await Linking.openURL(webPaymentUrl);
}
```

### CreditsEarningsScreen Updates

```typescript
// Updated payment flow
const handlePaystackPayment = async () => {
  // 1. Generate reference and payment data
  const reference = paystackService.generateReference('credits');
  const paymentData = { /* payment details */ };
  
  // 2. Initialize with backend
  const initResponse = await paystackService.initializePayment(paymentData);
  
  // 3. Open web payment page
  await paystackService.openPaymentUrl(initResponse.data.authorization_url, paymentData);
  
  // 4. Store reference for callback
  await storePaymentReference(reference, paymentDetails);
};
```

### Deep Linking

#### iOS Configuration (Info.plist)
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>mytimeapp</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>mytimeapp</string>
    </array>
  </dict>
</array>
```

#### Android Configuration (AndroidManifest.xml)
```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="mytimeapp" />
</intent-filter>
```

## 🗄️ Backend API Endpoints

### Required Endpoints

#### 1. Initialize Payment
```
POST /payments/paystack/initialize
```

**Request:**
```json
{
  "amount": 10000,
  "email": "user@example.com",
  "currency": "NGN",
  "reference": "mytime_1234567890_abc123",
  "callback_url": "https://mytimeapp-web.vercel.app/paystack-callback",
  "metadata": {
    "credits": 100,
    "userId": "user123",
    "paymentMethod": "card"
  }
}
```

**Response:**
```json
{
  "status": true,
  "message": "Payment initialized successfully",
  "data": {
    "authorization_url": "https://checkout.paystack.com/abc123",
    "access_code": "abc123",
    "reference": "mytime_1234567890_abc123"
  }
}
```

#### 2. Verify Payment
```
POST /payments/paystack/verify/:reference
```

**Response:**
```json
{
  "status": true,
  "message": "Payment verified successfully",
  "data": {
    "reference": "mytime_1234567890_abc123",
    "amount": 10000,
    "currency": "NGN",
    "status": "success",
    "paid_at": "2024-01-01T12:00:00Z",
    "customer": {
      "email": "user@example.com"
    },
    "metadata": {
      "credits": 100,
      "userId": "user123"
    }
  }
}
```

#### 3. Complete Payment
```
POST /payments/paystack/complete
```

**Request:**
```json
{
  "reference": "mytime_1234567890_abc123",
  "credits": 100,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment completed successfully",
  "credits": 100,
  "newBalance": 1500,
  "transactionId": "txn_1234567890"
}
```

## 🗄️ Database Schema

### User Credits Table
```sql
CREATE TABLE user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  credits_purchased DECIMAL(10,2) NOT NULL,
  credits_consumed DECIMAL(10,2) DEFAULT 0,
  credits_balance DECIMAL(10,2) NOT NULL,
  purchase_amount_usd DECIMAL(10,2) NOT NULL,
  platform_fee_usd DECIMAL(10,2) NOT NULL,
  net_credit_value DECIMAL(10,2) NOT NULL,
  purchase_method VARCHAR(50) NOT NULL, -- 'paystack', 'google_play', 'apple_store'
  transaction_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transaction History Table
```sql
CREATE TABLE transaction_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL, -- 'credit_purchase', 'usage', 'earning_finalized'
  reference_id UUID,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

### Web App Security
- ✅ **HTTPS Only**: All requests use HTTPS
- ✅ **Input Validation**: All parameters validated
- ✅ **XSS Protection**: Content Security Policy headers
- ✅ **CSRF Protection**: Reference-based validation
- ✅ **Rate Limiting**: API call rate limiting
- ✅ **Environment Variables**: Sensitive data in environment

### Backend Security
- ✅ **Webhook Verification**: HMAC signature verification
- ✅ **Idempotency**: Prevent duplicate transactions
- ✅ **Audit Logging**: All payment attempts logged
- ✅ **Data Encryption**: Sensitive data encrypted at rest
- ✅ **Access Control**: Row-level security policies

### Mobile App Security
- ✅ **Deep Link Validation**: Validate callback parameters
- ✅ **Reference Storage**: Secure AsyncStorage usage
- ✅ **Error Handling**: Secure error messages
- ✅ **Timeout Protection**: Payment timeout handling

## 🚀 Deployment

### Web App Deployment (Vercel)

1. **Environment Setup**
   ```bash
   # Clone and install
   git clone https://github.com/EIRENEVENTURES/mytimeapp-web.git
   cd mytimeapp-web
   npm install
   ```

2. **Environment Variables**
   ```bash
   # Add to Vercel dashboard
   VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_key
   VITE_BACKEND_API_URL=https://mytimeapp-n8zd.onrender.com
   ```

3. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

### Mobile App Deployment

1. **Update Paystack Keys**
   ```typescript
   // src/config/paystack.ts
   export const PAYSTACK_CONFIG = {
     PUBLIC_KEY: 'pk_live_your_actual_key',
     SECRET_KEY: 'sk_live_your_actual_key',
     // ...
   };
   ```

2. **Update Web URLs**
   ```typescript
   // src/services/paystackService.ts
   const webPaymentUrl = 'https://mytimeapp-web.vercel.app/paystack-payment';
   ```

3. **Build and Deploy**
   ```bash
   eas build --platform android
   eas build --platform ios
   ```

## 🧪 Testing

### Test Mode
1. **Use Test Keys**: `pk_test_` and `sk_test_` keys
2. **Test Cards**: 
   - Success: `5060666666666666666`
   - Fail: `5060666666666666666` (with specific scenarios)
3. **Test Webhook**: Use Paystack webhook tester

### Production Testing
1. **Live Keys**: Switch to `pk_live_` and `sk_live_`
2. **Real Payments**: Test with small amounts
3. **End-to-End**: Complete mobile → web → mobile flow

## 🐛 Troubleshooting

### Common Issues

#### 1. Payment Not Initializing
- **Check**: Backend API URL and Paystack keys
- **Verify**: Network connectivity and CORS settings
- **Solution**: Check backend logs and API responses

#### 2. Callback Not Working
- **Check**: Webhook configuration in Paystack dashboard
- **Verify**: Callback URL format and accessibility
- **Solution**: Test webhook with Paystack webhook tester

#### 3. Credits Not Adding
- **Check**: Backend completion endpoint
- **Verify**: Database connection and transaction logic
- **Solution**: Check database logs and transaction records

#### 4. App Not Opening
- **Check**: Deep linking configuration
- **Verify**: URL scheme in app manifests
- **Solution**: Test deep links with custom URL schemes

### Debug Mode

Add `?debug=true` to payment page URL for enhanced logging:
```
https://mytimeapp-web.vercel.app/paystack-payment?debug=true&...
```

## 📞 Support

### Contact Information
- **Email**: support@mytimeapp.com
- **Documentation**: This README and inline code comments
- **Issues**: GitHub repository issues

### Debug Information
Always include:
- Payment reference ID
- Error messages/screenshots
- Browser console logs
- Mobile app logs
- Timestamp of issue

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Complete Paystack integration
- ✅ Web payment pages
- ✅ Mobile app integration
- ✅ Backend API endpoints
- ✅ Security features
- ✅ Deployment configuration

---

**This implementation ensures a secure, user-friendly payment experience that complies with app store policies and provides robust error handling and security features.**
