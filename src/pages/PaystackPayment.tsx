import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Smartphone, Building2, Phone, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentData {
  amount: number;
  credits: number;
  email: string;
  currency: string;
  reference: string;
  userId?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Card Payment',
    description: 'Visa, Mastercard, Verve',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'bg-blue-500'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Direct bank payment',
    icon: <Building2 className="w-5 h-5" />,
    color: 'bg-green-500'
  },
  {
    id: 'ussd',
    name: 'USSD',
    description: 'Dial to pay',
    icon: <Phone className="w-5 h-5" />,
    color: 'bg-purple-500'
  },
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    description: 'MTN, Airtel, Glo, 9mobile',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'bg-orange-500'
  }
];

const PaystackPayment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string>('');

  // Parse URL parameters
  useEffect(() => {
    const amount = parseFloat(searchParams.get('amount') || '0');
    const credits = parseInt(searchParams.get('credits') || '0');
    const email = searchParams.get('email') || '';
    const currency = searchParams.get('currency') || 'NGN';
    const reference = searchParams.get('reference') || '';
    const userId = searchParams.get('userId') || '';

    if (amount > 0 && credits > 0 && email && reference) {
      setPaymentData({
        amount,
        credits,
        email,
        currency,
        reference,
        userId
      });
    } else {
      setError('Invalid payment parameters. Please return to the app and try again.');
    }
  }, [searchParams]);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const formatCurrency = (value: number, currency: string = 'NGN') => {
    if (currency === 'NGN') {
      return `₦${value.toFixed(2)}`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  const generateReference = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `mytime_${timestamp}_${random}`;
  };

  const showError = (message: string) => {
    setError(message);
    toast.error(message);
  };

  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const initiatePayment = async () => {
    if (!paymentData) {
      showError('Invalid payment data');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Initialize transaction with backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/payments/paystack/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentData.amount * 100, // Convert to kobo/cents
          email: paymentData.email,
          currency: paymentData.currency,
          reference: paymentData.reference,
          callback_url: `${window.location.origin}/paystack-callback`,
          metadata: {
            credits: paymentData.credits,
            userId: paymentData.userId,
            paymentMethod: selectedMethod,
            source: 'web'
          }
        })
      });

      const data = await response.json();

      if (!data.status) {
        throw new Error(data.message || 'Payment initialization failed');
      }

      // Open Paystack popup
      const handler = (window as any).PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: paymentData.email,
        amount: paymentData.amount * 100,
        ref: paymentData.reference,
        currency: paymentData.currency,
        callback: function(response: any) {
          // Payment successful - redirect to callback
          navigate(`/paystack-callback?reference=${response.reference}&status=success`);
        },
        onClose: function() {
          // Payment cancelled
          setIsLoading(false);
          showInfo('Payment was cancelled. You can try again.');
        }
      });

      handler.openIframe();

    } catch (error) {
      console.error('Payment error:', error);
      showError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  const showInfo = (message: string) => {
    toast.info(message);
  };

  if (error && !paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Invalid Payment</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => window.location.href = 'mytimeapp://credits-earnings'}
              className="w-full"
            >
              Return to App
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MyTimeApp Credits</h1>
          <p className="text-gray-600">Secure payment powered by Paystack</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Credits</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {paymentData.credits} Credits
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold">{formatCurrency(paymentData.amount, paymentData.currency)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Currency</span>
              <span className="font-medium">{paymentData.currency}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email</span>
              <span className="font-medium text-sm">{paymentData.email}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-blue-600">
                {formatCurrency(paymentData.amount, paymentData.currency)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you want to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`
                    relative p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedMethod === method.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center text-white`}>
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div className="text-sm text-green-800">
                <p className="font-semibold">Secure Payment</p>
                <p>Your payment information is encrypted and secure. We never store your card details.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button
          onClick={initiatePayment}
          disabled={isLoading || isVerifying}
          size="lg"
          className="w-full text-lg py-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ${formatCurrency(paymentData.amount, paymentData.currency)}`
          )}
        </Button>

        {/* Cancel Button */}
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            onClick={() => window.location.href = 'mytimeapp://credits-earnings'}
            disabled={isLoading}
          >
            Cancel and Return to App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaystackPayment;
