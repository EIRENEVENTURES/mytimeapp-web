import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, RefreshCw, CreditCard, History, Check, X, Filter, Calendar, DollarSign, Edit, Banknote, Building2, Smartphone, Clock, Shield, AlertCircle, CalendarCheck } from "lucide-react";
import { useState } from "react";

interface PayoutDetails {
  method: 'bank' | 'mobile_money' | 'stripe' | 'paypal' | null;
  stripeEmail: string;
  paypalEmail: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  mobileNumber: string;
  mobileProvider: string;
  country: string;
  verificationStatus: 'pending' | 'verified' | 'unverified';
}

const CreditsEarningsScreen = ({ onBack }: { onBack: () => void }) => {
  const [selectedAmount, setSelectedAmount] = useState<{ type: 'preset' | 'custom', value: number, credits: number } | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showCustomAmountConfirm, setShowCustomAmountConfirm] = useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);

  // Payment processing states
  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showPaymentFailed, setShowPaymentFailed] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // History filter states
  const [showHistoryFilter, setShowHistoryFilter] = useState(false);
  const [historyFilters, setHistoryFilters] = useState({
    type: 'all',
    dateRange: 'all',
    paymentMethod: 'all'
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [transactionsLoaded, setTransactionsLoaded] = useState(4);

  // Rate editing states
  const [showRateEdit, setShowRateEdit] = useState(false);
  const [currentRate, setCurrentRate] = useState(152);
  const [editRate, setEditRate] = useState("");

  // Payout states
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState<PayoutDetails>({
    method: null,
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    mobileNumber: "",
    mobileProvider: "",
    country: "Nigeria",
    verificationStatus: 'unverified',
    stripeEmail: "",
    paypalEmail: ""
  });

  // Credits (purchased) - for consuming digital services
  const purchasedCredits = 50.00;
  // Earnings (from providing services) - separate from credits
  const creatorEarnings = 75.50;
  const eligibleForPayout = 60.00; // Cleared earnings eligible for payout
  const minimumPayout = 10.00;
  
  // Weekly payout schedule info
  const nextPayoutDate = "January 6, 2025";
  const lastPayoutDate = "December 30, 2024";
  const lastPayoutAmount = 45.00;

  const presetAmounts = [
    { amount: 10, credits: 100 },
    { amount: 25, credits: 250 },
    { amount: 50, credits: 500 },
    { amount: 100, credits: 1000 }
  ];

  const paymentMethods = [
    { id: 'google_play', name: 'Google Play', description: 'In-App Purchase' },
    { id: 'apple', name: 'Apple', description: 'In-App Purchase' },
    { id: 'paystack', name: 'Paystack', description: 'Card, Bank & Mobile Money' },
    { id: 'stripe', name: 'Stripe', description: 'Card & Bank Payments' },
  ];

  const mobileProviders = [
    'MTN Mobile Money',
    'Airtel Money',
    'Glo Mobile Money',
    '9mobile Money'
  ];

  const handleCustomAmountAdd = () => {
    const amount = parseFloat(customAmount);
    if (amount >= 1) {
      setSelectedAmount({ type: 'custom', value: amount, credits: amount * 10 });
      setShowCustomAmountConfirm(true);
    }
  };

  const confirmCustomAmount = () => {
    setShowCustomAmountConfirm(false);
    setCustomAmount("");
  };

  const handleContinueToPayment = () => {
    if (selectedAmount && selectedPaymentMethod) {
      setShowPaymentFlow(true);
    }
  };

  const resetPaymentFlow = () => {
    setShowPaymentFlow(false);
    setSelectedAmount(null);
    setSelectedPaymentMethod(null);
  };

  // History filter functions
  const applyFilters = () => {
    setShowHistoryFilter(false);
  };

  const resetFilters = () => {
    setHistoryFilters({
      type: 'all',
      dateRange: 'all',
      paymentMethod: 'all'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (historyFilters.type !== 'all') count++;
    if (historyFilters.dateRange !== 'all') count++;
    if (historyFilters.paymentMethod !== 'all') count++;
    return count;
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setTransactionsLoaded(prev => prev + 4);
      setIsLoadingMore(false);
    }, 1500);
  };

  // Updated transactions with compliant terminology
  const allTransactions = [
    { id: 1, type: 'purchase', title: 'Credits Purchased', date: 'Dec 28, 2024 • 2:30 PM', amount: '+100', method: 'Google Play', color: 'green' },
    { id: 2, type: 'usage', title: 'Chat Session', date: 'Dec 27, 2024 • 5:15 PM', amount: '-25', method: 'Usage', color: 'orange' },
    { id: 3, type: 'usage', title: 'Space Access', date: 'Dec 26, 2024 • 1:45 PM', amount: '-12', method: 'Usage', color: 'orange' },
    { id: 4, type: 'purchase', title: 'Credits Purchased', date: 'Dec 25, 2024 • 9:20 AM', amount: '+50', method: 'Google Play', color: 'green' },
    { id: 5, type: 'earnings', title: 'Chat Compensation', date: 'Dec 24, 2024 • 3:15 PM', amount: '+15', method: 'Earnings', color: 'blue' },
    { id: 6, type: 'usage', title: 'Video Call', date: 'Dec 23, 2024 • 8:30 AM', amount: '-8', method: 'Usage', color: 'orange' },
    { id: 7, type: 'purchase', title: 'Credits Purchased', date: 'Dec 22, 2024 • 11:00 AM', amount: '+25', method: 'Google Play', color: 'green' },
    { id: 8, type: 'earnings', title: 'Live Session Compensation', date: 'Dec 21, 2024 • 6:45 PM', amount: '+20', method: 'Earnings', color: 'blue' },
    { id: 9, type: 'usage', title: 'Chat Session', date: 'Dec 20, 2024 • 2:20 PM', amount: '-5', method: 'Usage', color: 'orange' },
    { id: 10, type: 'purchase', title: 'Credits Purchased', date: 'Dec 19, 2024 • 4:10 PM', amount: '+75', method: 'Google Play', color: 'green' }
  ];

  const displayedTransactions = allTransactions.slice(0, transactionsLoaded);
  const hasMoreTransactions = transactionsLoaded < allTransactions.length;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return CreditCard;
      case 'earnings': return DollarSign;
      case 'usage': return Clock;
      default: return CreditCard;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-600 dark:text-green-400' };
      case 'blue': return { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-600 dark:text-blue-400' };
      case 'orange': return { bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-600 dark:text-orange-400' };
      default: return { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-600 dark:text-gray-400' };
    }
  };

  // Rate editing functions
  const handleEditRate = () => {
    setEditRate(currentRate.toString());
    setShowRateEdit(true);
  };

  const saveNewRate = () => {
    const newRate = parseFloat(editRate);
    if (newRate > 0 && newRate <= 1000) {
      setCurrentRate(newRate);
      setShowRateEdit(false);
      setEditRate("");
    }
  };

  const cancelRateEdit = () => {
    setShowRateEdit(false);
    setEditRate("");
  };

  // Payment processing functions
  const handlePaymentContinue = () => {
    setShowPaymentProcessing(true);
    
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setShowPaymentProcessing(false);
        setShowPaymentSuccess(true);
      } else {
        setShowPaymentProcessing(false);
        setShowPaymentFailed(true);
        setPaymentError("Payment was declined. Please try again or contact support.");
      }
    }, 3000);
  };

  const resetAllPaymentStates = () => {
    setShowPaymentFlow(false);
    setShowPaymentProcessing(false);
    setShowPaymentSuccess(false);
    setShowPaymentFailed(false);
    setSelectedAmount(null);
    setSelectedPaymentMethod(null);
    setPaymentError("");
  };

  const retryPayment = () => {
    setShowPaymentFailed(false);
    setPaymentError("");
  };

  // Payout functions
  const handleSavePayoutDetails = () => {
    setPayoutDetails(prev => ({ ...prev, verificationStatus: 'pending' }));
    setShowPayoutDetails(false);
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold">Credits & Earnings</h1>
      </div>

      {/* Balance Display */}
      <div className="p-4">
        <div className="mb-4">
          <Card className="p-4 text-center border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{purchasedCredits.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Credits Balance</div>
            <div className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">For digital services</div>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-primary/10"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="flex-1">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-xs px-1">Overview</TabsTrigger>
          <TabsTrigger value="buy" className="text-xs px-1">Buy Credits</TabsTrigger>
          <TabsTrigger value="earnings" className="text-xs px-1">Earnings</TabsTrigger>
          <TabsTrigger value="history" className="text-xs px-1">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="p-4">
          {showRateEdit ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={cancelRateEdit}>
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-lg font-semibold">Edit Service Rate</h2>
              </div>

              <Card className="feature-card">
                <h3 className="font-semibold mb-4">Set Your Rate Per Second</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rate (Credits/second)</label>
                    <input 
                      type="number" 
                      placeholder="Enter your rate" 
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      value={editRate}
                      onChange={(e) => setEditRate(e.target.value)}
                      min="0.1"
                      max="1000"
                      step="0.1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 50-500 Credits/sec • Max: 1000 Credits/sec
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">Rate Preview</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Per Second</span>
                        <span className="font-medium">{editRate || '0'} Credits</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Per Minute</span>
                        <span className="font-medium">{Math.floor((parseFloat(editRate) || 0) * 60)} Credits</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Per Hour</span>
                        <span className="font-medium">{((parseFloat(editRate) || 0) * 3600).toFixed(0)} Credits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={saveNewRate}
                  disabled={!editRate || parseFloat(editRate) <= 0 || parseFloat(editRate) > 1000}
                >
                  Save Rate
                </Button>
                <Button variant="outline" className="w-full" onClick={cancelRateEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Credits Section */}
              <Card className="feature-card">
                <h3 className="font-semibold mb-4 flex items-center">
                  <CreditCard size={18} className="mr-2 text-blue-600" />
                  MyTime Credits
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Available Credits</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{purchasedCredits.toFixed(0)}</span>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <strong>About Credits:</strong> Credits are virtual digital items for accessing digital services within MyTime. Credits have no real-world monetary value and cannot be exchanged for cash.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Creator Earnings Section */}
              <Card className="feature-card">
                <h3 className="font-semibold mb-4 flex items-center">
                  <DollarSign size={18} className="mr-2 text-green-600" />
                  Creator Earnings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Earnings</span>
                    <span className="font-medium text-green-600 dark:text-green-400">${creatorEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Available Compensation</span>
                    <span className="font-medium">${eligibleForPayout.toFixed(2)}</span>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      <strong>About Earnings:</strong> Earnings represent compensation for digital services you provide. Disbursements are processed separately from credits and are subject to review.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Important Notice */}
              <Card className="feature-card border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/50">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-amber-800 dark:text-amber-200">Important Notice</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      Credits are not redeemable for cash. Creator earnings are governed by separate terms and processed as compensation through approved disbursement methods.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Buy Credits Tab */}
        <TabsContent value="buy" className="p-4 space-y-4">
          {showPaymentSuccess ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={resetAllPaymentStates}>
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-lg font-semibold">Purchase Complete</h2>
              </div>

              <Card className="feature-card">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Credits Added!</h3>
                  <p className="text-muted-foreground mb-6">
                    {selectedAmount?.credits} credits have been added to your account
                  </p>
                  
                  <div className="bg-muted rounded-lg p-4 mb-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount Paid</span>
                        <span className="font-medium">${selectedAmount?.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credits Received</span>
                        <span className="font-medium">{selectedAmount?.credits} Credits</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" onClick={resetAllPaymentStates}>
                      Buy More Credits
                    </Button>
                    <Button variant="outline" className="w-full" onClick={resetAllPaymentStates}>
                      Done
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : showPaymentFailed ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={resetAllPaymentStates}>
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-lg font-semibold">Purchase Failed</h2>
              </div>

              <Card className="feature-card">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X size={32} className="text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Purchase Failed</h3>
                  <p className="text-muted-foreground mb-6">{paymentError}</p>
                  
                  <div className="space-y-2">
                    <Button className="w-full" onClick={retryPayment}>
                      Try Again
                    </Button>
                    <Button variant="outline" className="w-full" onClick={resetAllPaymentStates}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : showPaymentProcessing ? (
            <div className="space-y-4">
              <Card className="feature-card">
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <RefreshCw size={24} className="text-primary animate-spin" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Processing Purchase...</h3>
                  <p className="text-muted-foreground mb-6">
                    Please wait while we complete your purchase
                  </p>
                </div>
              </Card>
            </div>
          ) : showPaymentFlow ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={resetPaymentFlow}>
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-lg font-semibold">Complete Purchase</h2>
              </div>

              <Card className="feature-card">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">${selectedAmount?.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credits</span>
                    <span className="font-medium">{selectedAmount?.credits} Credits</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${selectedAmount?.value}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="feature-card">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Ready to Purchase</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Proceed to complete your in-app purchase
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full" size="lg" onClick={handlePaymentContinue}>
                      Continue
                    </Button>
                    <Button variant="outline" className="w-full" onClick={resetPaymentFlow}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : showCustomAmountConfirm ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={() => setShowCustomAmountConfirm(false)}>
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-lg font-semibold">Confirm Amount</h2>
              </div>

              <Card className="feature-card">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Custom Amount Selected</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-2xl font-bold">${selectedAmount?.value}</p>
                    <p className="text-muted-foreground">{selectedAmount?.credits} Credits</p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" onClick={confirmCustomAmount}>
                      Continue
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setShowCustomAmountConfirm(false)}>
                      Change Amount
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <>
              <Card className="feature-card">
                <h3 className="font-semibold mb-4">Select Credit Amount</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <Button 
                      key={preset.amount}
                      variant={selectedAmount?.value === preset.amount && selectedAmount.type === 'preset' ? "default" : "outline"}
                      className="h-16 flex flex-col relative"
                      onClick={() => setSelectedAmount({ type: 'preset', value: preset.amount, credits: preset.credits })}
                    >
                      {selectedAmount?.value === preset.amount && selectedAmount.type === 'preset' && (
                        <Check size={16} className="absolute top-2 right-2" />
                      )}
                      <span className="text-lg font-bold">{preset.credits} Credits</span>
                    </Button>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-3">Custom Amount</h4>
                  <div className="flex gap-3">
                    <input 
                      type="number" 
                      placeholder="Enter amount (Credit)"
                      className="flex-1 p-3 border border-border rounded-lg bg-background"
                      min="1"
                      step="0.01"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      className="px-6"
                      onClick={handleCustomAmountAdd}
                      disabled={!customAmount || parseFloat(customAmount) < 1}
                    >
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Minimum: 100 Credits
                  </p>
                </div>
              </Card>

              {selectedAmount && (
                <Card className="feature-card border-primary/20 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Selected Amount</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedAmount.credits} Credits
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedAmount(null)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </Card>
              )}

              <Card className="feature-card">
                <h3 className="font-semibold mb-4 flex items-center">
                  <CreditCard size={20} className="mr-2" />
                  Purchase Method
                </h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <Button 
                      key={method.id}
                      variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                      className="w-full justify-between h-12 relative"
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <span>{method.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{method.description}</span>
                        {selectedPaymentMethod === method.id && (
                          <Check size={16} />
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleContinueToPayment}
                disabled={!selectedAmount || !selectedPaymentMethod}
              >
                Continue to Purchase
              </Button>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground text-center">
                  Credits are virtual digital items for accessing MyTime services. Credits have no real-world monetary value and are non-refundable except where required by applicable policies.
                </p>
              </div>
            </>
          )}
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="p-4 space-y-4">
          {showPayoutDetails ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={() => setShowPayoutDetails(false)}>
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-lg font-semibold">Payout Details</h2>
              </div>

              <Card className="feature-card">
                <h3 className="font-semibold mb-4">Select Payout Method</h3>
                <div className="space-y-3">
                  <Button 
                    variant={payoutDetails.method === 'stripe' ? "default" : "outline"}
                    className="w-full justify-start h-12"
                    onClick={() => setPayoutDetails(prev => ({ ...prev, method: 'stripe' }))}
                  >
                    <CreditCard size={18} className="mr-3" />
                    <span>Stripe</span>
                    {payoutDetails.method === 'stripe' && <Check size={16} className="ml-auto" />}
                  </Button>
                  <Button 
                    variant={payoutDetails.method === 'paypal' ? "default" : "outline"}
                    className="w-full justify-start h-12"
                    onClick={() => setPayoutDetails(prev => ({ ...prev, method: 'paypal' }))}
                  >
                    <DollarSign size={18} className="mr-3" />
                    <span>PayPal</span>
                    {payoutDetails.method === 'paypal' && <Check size={16} className="ml-auto" />}
                  </Button>
                  <Button 
                    variant={payoutDetails.method === 'bank' ? "default" : "outline"}
                    className="w-full justify-start h-12"
                    onClick={() => setPayoutDetails(prev => ({ ...prev, method: 'bank' }))}
                  >
                    <Building2 size={18} className="mr-3" />
                    <span>Bank Transfer</span>
                    {payoutDetails.method === 'bank' && <Check size={16} className="ml-auto" />}
                  </Button>
                  <Button 
                    variant={payoutDetails.method === 'mobile_money' ? "default" : "outline"}
                    className="w-full justify-start h-12"
                    onClick={() => setPayoutDetails(prev => ({ ...prev, method: 'mobile_money' }))}
                  >
                    <Smartphone size={18} className="mr-3" />
                    <span>Mobile Money</span>
                    {payoutDetails.method === 'mobile_money' && <Check size={16} className="ml-auto" />}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    If your region isn't supported by Stripe or PayPal, you can receive disbursements via Bank Transfer or Mobile Money.
                  </p>
                </div>
              </Card>

              {payoutDetails.method === 'bank' && (
                <Card className="feature-card">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Building2 size={18} className="mr-2" />
                    Bank Account Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Bank Name</label>
                      <select
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.bankName}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, bankName: e.target.value }))}
                      >
                        <option value="">Select a bank</option>
                        <option value="Chase">Chase</option>
                        <option value="Bank of America">Bank of America</option>
                        <option value="Wells Fargo">Wells Fargo</option>
                        <option value="Citibank">Citibank</option>
                        <option value="US Bank">US Bank</option>
                        <option value="Capital One">Capital One</option>
                        <option value="PNC Bank">PNC Bank</option>
                        <option value="TD Bank">TD Bank</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Account Number</label>
                      <input 
                        type="text" 
                        placeholder="Enter account number" 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.accountNumber}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Account Holder Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter full name as on account" 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.accountHolderName}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                      />
                    </div>
                  </div>
                </Card>
              )}

              {payoutDetails.method === 'mobile_money' && (
                <Card className="feature-card">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Smartphone size={18} className="mr-2" />
                    Mobile Money Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Provider</label>
                      <select 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.mobileProvider}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, mobileProvider: e.target.value }))}
                      >
                        <option value="">Select provider</option>
                        {mobileProviders.map(provider => (
                          <option key={provider} value={provider}>{provider}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Mobile Number</label>
                      <input 
                        type="tel" 
                        placeholder="Enter mobile number" 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.mobileNumber}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, mobileNumber: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Account Holder Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter full name" 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.accountHolderName}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                      />
                    </div>
                  </div>
                </Card>
              )}

              {payoutDetails.method === 'stripe' && (
                <Card className="feature-card">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <CreditCard size={18} className="mr-2" />
                    Stripe Account Details
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Receive disbursements directly to your Stripe account. Ideal if other methods aren't available in your region.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Stripe Account Email</label>
                      <input 
                        type="email" 
                        placeholder="Enter your Stripe account email" 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.stripeEmail}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, stripeEmail: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Account Holder Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter full name on your Stripe account" 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.accountHolderName}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                      />
                    </div>
                  </div>
                </Card>
              )}

              {payoutDetails.method === 'paypal' && (
                <Card className="feature-card">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <DollarSign size={18} className="mr-2" />
                    PayPal Account Details
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Receive disbursements directly to your PayPal account. A great alternative if other methods aren't available in your region.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">PayPal Email Address</label>
                      <input 
                        type="email" 
                        placeholder="Enter your PayPal email address" 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.paypalEmail}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, paypalEmail: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Account Holder Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter full name on your PayPal account" 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        value={payoutDetails.accountHolderName}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                      />
                    </div>
                  </div>
                </Card>
              )}


              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield size={16} className="text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Your payout details are encrypted and stored securely. They will only be used to process creator compensation payments.
                  </p>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSavePayoutDetails}
                disabled={
                  !payoutDetails.method || 
                  !payoutDetails.accountHolderName ||
                  (payoutDetails.method === 'bank' && (!payoutDetails.bankName || !payoutDetails.accountNumber)) ||
                  (payoutDetails.method === 'mobile_money' && (!payoutDetails.mobileNumber || !payoutDetails.mobileProvider)) ||
                  (payoutDetails.method === 'stripe' && !payoutDetails.stripeEmail) ||
                  (payoutDetails.method === 'paypal' && !payoutDetails.paypalEmail)
                }
              >
                Save Payout Details
              </Button>
            </div>
          ) : (
            <>
              <Card className="feature-card">
                <h3 className="font-semibold mb-4">Earnings Overview</h3>
                <div className="text-center py-4">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">${creatorEarnings.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Total Creator Earnings</div>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Available Compensation</span>
                    <span className="font-medium">${eligibleForPayout.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Under Review</span>
                    <span className="font-medium">${(creatorEarnings - eligibleForPayout).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Minimum Payout</span>
                    <span className="font-medium">${minimumPayout.toFixed(2)}</span>
                  </div>
                </div>
              </Card>

              {/* Weekly Payout Schedule Card */}
              <Card className="feature-card border-primary/30 bg-primary/5">
                <h3 className="font-semibold mb-4 flex items-center">
                  <CalendarCheck size={18} className="mr-2 text-primary" />
                  Weekly Payout Schedule
                </h3>
                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Next Payout</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Automatic</span>
                    </div>
                    <div className="text-lg font-bold text-primary">{nextPayoutDate}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {eligibleForPayout >= minimumPayout ? (
                        <span className="text-green-600 dark:text-green-400">
                          ${eligibleForPayout.toFixed(2)} eligible for payout
                        </span>
                      ) : (
                        <span>
                          ${(minimumPayout - eligibleForPayout).toFixed(2)} more to reach minimum
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Last Paid Out</span>
                      <span className="font-medium">{lastPayoutDate}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Amount Paid</span>
                      <span className="font-medium text-green-600 dark:text-green-400">${lastPayoutAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Frequency</span>
                      <span className="font-medium">Every Monday</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <strong>How it works:</strong> Eligible earnings are automatically processed every Monday. No action required from you - just ensure your payout details are verified.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="feature-card">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Banknote size={18} className="mr-2" />
                  Payout Details
                </h3>
                {payoutDetails.verificationStatus === 'unverified' ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">
                      Add payout details to receive creator compensation when eligible.
                    </p>
                    <Button onClick={() => setShowPayoutDetails(true)}>
                      Add Payout Method
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Method</span>
                      <span className="font-medium">{payoutDetails.method === 'bank' ? 'Bank Transfer' : 'Mobile Money'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`font-medium ${payoutDetails.verificationStatus === 'verified' ? 'text-green-600' : 'text-amber-600'}`}>
                        {payoutDetails.verificationStatus === 'verified' ? 'Verified' : 'Pending Verification'}
                      </span>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setShowPayoutDetails(true)}>
                      Edit Payout Details
                    </Button>
                  </div>
                )}
              </Card>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground text-center">
                  Creator payouts are processed automatically on a weekly basis. Payments represent creator compensation for digital services provided, not a withdrawal of credits or stored funds.
                </p>
              </div>
            </>
          )}
        </TabsContent>

        {/* Activity/History Tab */}
        <TabsContent value="history" className="p-4 space-y-4">
          {showHistoryFilter ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={() => setShowHistoryFilter(false)}>
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-lg font-semibold">Filter Activity</h2>
              </div>

              <Card className="feature-card">
                <h3 className="font-semibold mb-4">Activity Type</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Activity', icon: Clock },
                    { value: 'purchase', label: 'Credit Purchases', icon: CreditCard },
                    { value: 'earnings', label: 'Earnings', icon: DollarSign },
                    { value: 'usage', label: 'Service Usage', icon: Clock }
                  ].map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <Button
                        key={option.value}
                        variant={historyFilters.type === option.value ? "default" : "outline"}
                        className="w-full justify-start h-12"
                        onClick={() => setHistoryFilters(prev => ({ ...prev, type: option.value }))}
                      >
                        <IconComponent size={16} className="mr-3" />
                        <span>{option.label}</span>
                        {historyFilters.type === option.value && (
                          <Check size={16} className="ml-auto" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </Card>

              <Card className="feature-card">
                <h3 className="font-semibold mb-4">Date Range</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Time' },
                    { value: 'today', label: 'Today' },
                    { value: 'week', label: 'This Week' },
                    { value: 'month', label: 'This Month' }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={historyFilters.dateRange === option.value ? "default" : "outline"}
                      className="w-full justify-start h-12"
                      onClick={() => setHistoryFilters(prev => ({ ...prev, dateRange: option.value }))}
                    >
                      <Calendar size={16} className="mr-3" />
                      <span>{option.label}</span>
                      {historyFilters.dateRange === option.value && (
                        <Check size={16} className="ml-auto" />
                      )}
                    </Button>
                  ))}
                </div>
              </Card>

              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={applyFilters}>
                  Apply Filters
                </Button>
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Activity History</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowHistoryFilter(true)}
                  className="relative"
                >
                  <Filter size={16} className="mr-2" />
                  Filter
                  {getActiveFiltersCount() > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </Button>
              </div>

              {getActiveFiltersCount() > 0 && (
                <Card className="feature-card border-primary/20 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">Active Filters</h4>
                      <div className="flex gap-2 mt-2">
                        {historyFilters.type !== 'all' && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {historyFilters.type}
                          </span>
                        )}
                        {historyFilters.dateRange !== 'all' && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {historyFilters.dateRange}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      <X size={16} />
                    </Button>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {displayedTransactions.map((transaction) => {
                  const IconComponent = getTransactionIcon(transaction.type);
                  const colorClasses = getColorClasses(transaction.color);
                  const isPositive = transaction.amount.startsWith('+');
                  
                  return (
                    <Card key={transaction.id} className="feature-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 ${colorClasses.bg} rounded-full flex items-center justify-center mr-3`}>
                            <IconComponent size={16} className={colorClasses.text} />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.title}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {transaction.amount} {transaction.type === 'earnings' ? '' : 'Credits'}
                          </p>
                          <p className="text-sm text-muted-foreground">{transaction.method}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}

                {isLoadingMore && (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <Card key={`loading-${i}`} className="feature-card">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-muted rounded-full animate-pulse mr-3"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                              <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                            <div className="h-3 w-12 bg-muted rounded animate-pulse"></div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {hasMoreTransactions ? (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <>
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </Button>
              ) : (
                transactionsLoaded > 4 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No more activity to load</p>
                  </div>
                )
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditsEarningsScreen;
