import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Shield, 
  Mail, 
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface PaymentDetails {
  reference: string;
  amount: number;
  credits: number;
  currency: string;
  status: string;
  email?: string;
  paidAt?: string;
}

type PaymentStatus = 'processing' | 'success' | 'failed' | 'cancelled' | 'timeout';

const PaystackCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('processing');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [error, setError] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const reference = searchParams.get('reference') || '';
  const status = searchParams.get('status') || '';
  const message = searchParams.get('message') || '';

  const maxRetries = 10;
  const baseDelay = 2000; // 2 seconds

  useEffect(() => {
    if (!reference) {
      setError('Invalid payment reference');
      setPaymentStatus('failed');
      return;
    }

    // If status is already provided, use it
    if (status === 'success') {
      verifyPayment();
    } else if (status === 'cancelled') {
      setPaymentStatus('cancelled');
      setError('Payment was cancelled');
    } else if (status === 'failed') {
      setPaymentStatus('failed');
      setError(message || 'Payment failed');
    } else {
      // Start verification process
      verifyPayment();
    }
  }, [reference, status, message]);

  const formatCurrency = (value: number, currency: string = 'NGN') => {
    if (currency === 'NGN') {
      return `₦${(value / 100).toFixed(2)}`;
    } else {
      return `$${(value / 100).toFixed(2)}`;
    }
  };

  const showError = (message: string) => {
    setError(message);
    toast.error(message);
  };

  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const verifyPayment = async () => {
    try {
      setPaymentStatus('processing');
      setError('');

      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/payments/paystack/verify/${reference}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.status && data.data) {
        if (data.data.status === 'success') {
          // Payment successful - complete it
          await completePayment(data.data);
        } else if (data.data.status === 'failed') {
          setPaymentStatus('failed');
          setError('Payment failed: ' + (data.data.message || 'Transaction was not successful'));
        } else {
          // Still processing - retry
          retryVerification();
        }
      } else {
        throw new Error(data.message || 'Payment verification failed');
      }

    } catch (error) {
      console.error('Verification error:', error);
      if (retryCount < maxRetries) {
        retryVerification();
      } else {
        setPaymentStatus('timeout');
        setError('Payment verification timed out. Please contact support with reference: ' + reference);
      }
    }
  };

  const completePayment = async (paymentData: any) => {
    try {
      setPaymentStatus('processing');
      setError('');

      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/payments/paystack/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: reference,
          credits: paymentData.metadata?.credits || extractCreditsFromAmount(paymentData.amount),
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();

      if (result.success) {
        setPaymentStatus('success');
        setPaymentDetails({
          reference: paymentData.reference,
          amount: paymentData.amount,
          credits: paymentData.metadata?.credits || extractCreditsFromAmount(paymentData.amount),
          currency: paymentData.currency,
          status: 'completed',
          email: paymentData.customer?.email,
          paidAt: paymentData.paid_at
        });
        showSuccess('Payment successful! Credits have been added to your account.');
      } else {
        throw new Error(result.message || 'Failed to complete payment');
      }

    } catch (error) {
      console.error('Completion error:', error);
      setPaymentStatus('failed');
      setError('Failed to add credits. Please contact support with reference: ' + reference);
    }
  };

  const retryVerification = () => {
    const newRetryCount = retryCount + 1;
    setRetryCount(newRetryCount);

    if (newRetryCount <= maxRetries) {
      const delay = Math.min(baseDelay * Math.pow(2, newRetryCount - 1), 10000); // Max 10 seconds
      
      setTimeout(() => {
        console.log(`Retrying verification (${newRetryCount}/${maxRetries})`);
        verifyPayment();
      }, delay);
    } else {
      setPaymentStatus('timeout');
      setError('Payment verification timed out. Please contact support.');
    }
  };

  const extractCreditsFromAmount = (amount: number) => {
    const baseAmount = amount / 100;
    if (baseAmount >= 1000) return 1000;
    if (baseAmount >= 500) return 500;
    if (baseAmount >= 250) return 250;
    if (baseAmount >= 100) return 100;
    return Math.floor(baseAmount);
  };

  const returnToApp = () => {
    const appUrl = `${import.meta.env.VITE_APP_DEEP_LINK}?reference=${reference}&status=${paymentStatus}`;
    window.location.href = appUrl;
    
    // Fallback after 2 seconds
    setTimeout(() => {
      window.location.href = 'mytimeapp://credits-earnings';
    }, 2000);
  };

  const contactSupport = () => {
    const subject = encodeURIComponent(`Payment Support - ${reference}`);
    const body = encodeURIComponent(`Payment Reference: ${reference}\nStatus: ${paymentStatus}\nIssue: [Please describe your issue]\nTimestamp: ${new Date().toISOString()}`);
    window.location.href = `mailto:support@mytimeapp.com?subject=${subject}&body=${body}`;
  };

  const manualRetry = () => {
    if (isRetrying) return;
    
    setIsRetrying(true);
    setRetryCount(0);
    verifyPayment().finally(() => {
      setIsRetrying(false);
    });
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'processing':
        return <Loader2 className="w-16 h-16 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-600" />;
      case 'failed':
      case 'cancelled':
        return <AlertCircle className="w-16 h-16 text-red-600" />;
      case 'timeout':
        return <Clock className="w-16 h-16 text-orange-600" />;
      default:
        return <Clock className="w-16 h-16 text-gray-600" />;
    }
  };

  const getStatusTitle = () => {
    switch (paymentStatus) {
      case 'processing':
        return 'Processing Payment';
      case 'success':
        return 'Payment Successful!';
      case 'failed':
        return 'Payment Failed';
      case 'cancelled':
        return 'Payment Cancelled';
      case 'timeout':
        return 'Verification Timeout';
      default:
        return 'Payment Status';
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'processing':
        return retryCount > 0 
          ? `Verifying payment... (Attempt ${retryCount}/${maxRetries})`
          : 'Verifying payment with Paystack...';
      case 'success':
        return 'Your credits have been added to your account!';
      case 'failed':
        return error || 'The payment could not be processed.';
      case 'cancelled':
        return 'The payment was cancelled.';
      case 'timeout':
        return 'Payment verification took too long. Please contact support.';
      default:
        return 'Checking payment status...';
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'processing':
        return 'from-blue-500 to-blue-600';
      case 'success':
        return 'from-green-500 to-green-600';
      case 'failed':
      case 'cancelled':
        return 'from-red-500 to-red-600';
      case 'timeout':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Status Header */}
        <Card className={`mb-6 bg-gradient-to-r ${getStatusColor()} text-white border-0`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {getStatusIcon()}
            </div>
            <CardTitle className="text-2xl mb-2">{getStatusTitle()}</CardTitle>
            <CardDescription className="text-white/90">
              {getStatusMessage()}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Error Alert */}
        {error && paymentStatus !== 'success' && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Payment Details */}
        {paymentDetails && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reference</span>
                <Badge variant="secondary" className="font-mono">
                  {paymentDetails.reference}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">{formatCurrency(paymentDetails.amount, paymentDetails.currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Credits</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  +{paymentDetails.credits} Credits
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <Badge variant="default" className="bg-green-600">
                  Completed
                </Badge>
              </div>
              {paymentDetails.paidAt && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">
                    {new Date(paymentDetails.paidAt).toLocaleString()}
                  </span>
                </div>
              )}
              <Separator />
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Credits Added Successfully!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your credits have been added to your account and are ready to use.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              onClick={returnToApp}
              size="lg"
              className="flex-1"
              disabled={paymentStatus === 'processing'}
            >
              Return to App
            </Button>
            
            {(paymentStatus === 'failed' || paymentStatus === 'timeout') && (
              <Button
                onClick={manualRetry}
                variant="outline"
                size="lg"
                disabled={isRetrying}
              >
                {isRetrying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </>
                )}
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={contactSupport}
            className="w-full"
            disabled={paymentStatus === 'processing'}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>

        {/* Help Section */}
        {paymentStatus !== 'processing' && (
          <Card className="mt-6 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="text-sm text-yellow-800">
                <h4 className="font-semibold mb-2">Need Help?</h4>
                <div className="space-y-1">
                  <p>• <strong>Payment Successful?</strong> Credits should appear in your app within 5 minutes.</p>
                  <p>• <strong>Payment Failed?</strong> Check your email or retry the payment.</p>
                  <p>• <strong>Questions?</strong> Contact support with reference: {reference}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Info */}
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div className="text-sm text-green-800">
                <p className="font-semibold">Secure Transaction</p>
                <p>This payment was processed securely through Paystack with bank-level encryption.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaystackCallback;
