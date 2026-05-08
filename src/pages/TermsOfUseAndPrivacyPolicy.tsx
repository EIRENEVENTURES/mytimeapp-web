import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsOfUseAndPrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Terms of Use & Privacy Policy</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-56px)]">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

          {/* TERMS OF USE */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">MY TIME – TERMS OF USE</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Effective Date:</strong> 16th March, 2026</p>
              <p><strong>Operator:</strong> My Time</p>
              <p><strong>Parent Company:</strong> EIRENE VENTURES LIMITED (Canada)</p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These Terms of Use ("Terms") govern access to and use of the My Time mobile application, website, and services (collectively, the "Services").
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Services are owned and operated by EIRENE VENTURES LIMITED, incorporated under the laws of Canada ("Company," "we," "us," or "our").
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By accessing or using the Services, you agree to be legally bound by these Terms.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You must be at least 18 years old or the age of majority in your jurisdiction.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">2. Nature of the Platform</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">My Time is a digital marketplace platform that enables users to:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Participate in paid voice and video calls</li>
                <li>Engage in paid chat sessions</li>
                <li>Host and join paid Spaces</li>
                <li>Purchase and use App Credits</li>
                <li>Earn session-based compensation</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">My Time is not:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>A bank</li>
                <li>A financial institution</li>
                <li>A telecommunications carrier</li>
                <li>An employer of users</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">3. Account Registration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Users must:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain account security</li>
                <li>Not share credentials</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Accounts may be suspended for violations of these Terms or applicable laws.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">4. App Credits</h3>

              <h4 className="text-base font-medium">4.1 Nature of Credits</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">App Credits:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Are digital usage tokens</li>
                <li>Represent prepaid access to Services</li>
                <li>Are not legal tender</li>
                <li>Are not cryptocurrency</li>
                <li>Do not accrue interest</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">Credits may only be used within the Services.</p>

              <h4 className="text-base font-medium">4.2 Purchases</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Credit purchases:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Are generally non-refundable except where required by law</li>
                <li>May be subject to third-party payment fees</li>
                <li>Must clear successfully before Credit Balance updates</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">5. Billing, Creator Earnings & Platform Fees</h3>

              <h4 className="text-base font-medium">5.1 Billing Structure</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Paid interactions ("Paid Sessions") may include:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Voice calls</li>
                <li>Video calls</li>
                <li>Paid chat sessions</li>
                <li>Paid Spaces</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">Billing may occur:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Per second</li>
                <li>Per minute</li>
                <li>At a fixed rate</li>
                <li>Under other pricing models introduced by My Time</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Credits are deducted automatically from the initiating user's Credit Balance during Paid Sessions. If insufficient credits are available, sessions may terminate or lock.
              </p>

              <h4 className="text-base font-medium">5.2 Creator Earnings</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Creators earn compensation based on the actual value of completed Paid Sessions. Creator Earnings are calculated as: Total Session Value minus Applicable Platform Service Fees minus Adjustments.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">Creator Earnings:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Accrue in the Creator's Earnings balance</li>
                <li>Are not wages or salary</li>
                <li>Do not create employment status</li>
                <li>Are subject to compliance review</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">Creators are independent platform users.</p>

              <h4 className="text-base font-medium">5.3 Platform Service Fee</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                My Time deducts a Platform Service Fee from the total session value.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">The Platform Service Fee:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Is determined at My Time's discretion</li>
                <li>Is disclosed within the App prior to participation</li>
                <li>May vary by region, user tier, service type, promotions, or separate agreements</li>
                <li>May change over time</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The net amount after fees is credited to the Creator's Earnings balance.
              </p>

              <h4 className="text-base font-medium">5.4 Fee Modification Notice</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                My Time may modify the Platform Service Fee structure at any time. If material changes occur:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Updated fees will be displayed in the App prior to participation in Paid Sessions</li>
                <li>Continued use of monetized features constitutes acceptance</li>
                <li>Advance notice will be provided where legally required</li>
              </ul>

              <h4 className="text-base font-medium">5.5 Adjustments & Reversals</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Earnings may be withheld, adjusted, or reversed due to:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Chargebacks</li>
                <li>Fraud</li>
                <li>Policy violations</li>
                <li>Suspicious activity</li>
                <li>Legal or regulatory requirements</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">Balances may be temporarily frozen during investigations.</p>

              <h4 className="text-base font-medium">5.6 Earnings Withdrawals</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Creators may request withdrawal of available Earnings subject to:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Minimum thresholds</li>
                <li>Identity verification</li>
                <li>AML screening</li>
                <li>Tax compliance</li>
                <li>Fraud review</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">Processing times depend on payment providers.</p>

              <h4 className="text-base font-medium">5.7 No Guarantee of Income</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">My Time does not guarantee:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Minimum earnings</li>
                <li>Session volume</li>
                <li>Continued monetization eligibility</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">6. Prohibited Conduct</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Users may not:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Engage in illegal activity</li>
                <li>Share child exploitation content</li>
                <li>Promote violence or terrorism</li>
                <li>Conduct scams</li>
                <li>Manipulate billing systems</li>
                <li>Evade sanctions laws</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Violations may result in immediate termination and forfeiture of Credits and Earnings.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">7. Limitation of Liability</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, liability is limited to the greater of fees paid in the previous 3 months or $100 CAD.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">8. Governing Law</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of Canada. Disputes shall be resolved via binding arbitration in Canada unless prohibited by mandatory consumer laws.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* PRIVACY POLICY */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">MY TIME – PRIVACY POLICY</h2>
            <p className="text-sm text-muted-foreground"><strong>Operator:</strong> EIRENE VENTURES LIMITED (Canada)</p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">1. Data Collected</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">We collect:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Account details</li>
                <li>Credit purchase records</li>
                <li>Session duration data</li>
                <li>Earnings records</li>
                <li>Device and IP information</li>
                <li>KYC documentation (where required)</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We do not record calls or chats unless required for legal or safety purposes.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">2. Use of Data</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">We use data to:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Operate the Services</li>
                <li>Process credit purchases</li>
                <li>Calculate Creator Earnings</li>
                <li>Prevent fraud</li>
                <li>Conduct KYC/AML checks</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">3. International Transfers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Data may be processed in Canada and other jurisdictions with appropriate safeguards including contractual protections.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">4. User Rights</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Depending on jurisdiction, users may request:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Access</li>
                <li>Correction</li>
                <li>Deletion</li>
                <li>Data portability</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">Contact: [Insert Privacy Email]</p>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* CREATOR AGREEMENT */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">SEPARATE CREATOR AGREEMENT</h2>
            <p className="text-sm text-muted-foreground italic">This applies only to users who enable monetization.</p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">1. Independent Status</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Creator is an independent contractor. Nothing in this Agreement creates employment, partnership, or agency. Creator is responsible for taxes and reporting.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">2. Earnings Structure</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Creator Earnings are calculated per Section 5 of the Terms. My Time deducts a Platform Service Fee.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">3. Tax Responsibility</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Creator agrees to:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Declare earnings in their jurisdiction</li>
                <li>Provide required tax documentation</li>
                <li>Comply with local tax laws</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">4. Compliance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Creator agrees to comply with:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>AML/KYC requirements</li>
                <li>Sanctions screening</li>
                <li>Content safety rules</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Failure may result in termination and forfeiture of Earnings.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">5. Chargebacks</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If a payment is reversed, related Earnings may be deducted.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* COMPLIANCE SUMMARY */}
          <section className="space-y-6 pb-8">
            <h2 className="text-2xl font-bold text-primary">Regulator-Ready Compliance Summary</h2>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Platform Classification</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">My Time is:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>A digital marketplace platform</li>
                <li>Not an e-money issuer</li>
                <li>Not a bank</li>
                <li>Not a payment institution</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Credits are prepaid usage tokens, not stored monetary value.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">AML Controls</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>KYC required for withdrawals</li>
                <li>Transaction monitoring</li>
                <li>Sanctions screening</li>
                <li>Suspicious activity review</li>
                <li>Earnings freeze capability</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Risk Mitigation</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Chargeback protection</li>
                <li>Audit logs</li>
                <li>IP/device tracking</li>
                <li>Fraud scoring</li>
                <li>Tiered withdrawal limits</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Data Protection</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>GDPR-aligned processing</li>
                <li>SCCs for cross-border transfers</li>
                <li>Encrypted payment processing</li>
                <li>Secure authentication</li>
              </ul>
            </div>
          </section>

        </div>
      </ScrollArea>
    </div>
  );
};

export default TermsOfUseAndPrivacyPolicy;
