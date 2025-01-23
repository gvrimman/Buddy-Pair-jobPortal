import React from "react";
import PolicyLayout from "../../layouts/PolicyLayout";

function RefundPolicy() {
    return (
      <PolicyLayout title="Refund Policy">
        <p className="text-xs leading-6 mb-4">
          <strong>Effective Date:</strong> 11/01/2025
        </p>
        <p className="text-xs leading-6 mb-4">
          Thank you for using <strong>Buddy Pair</strong>. Please read this
          Refund Policy carefully, as it outlines our policy regarding refunds
          for any payments made on our Platform.
        </p>
        <h4 className="font-bold text-xl my-2">1. No Refunds Policy</h4>
        <p className="text-xs leading-6 mb-4">
          At <strong>Buddy Pair</strong>, all payments made for subscriptions,
          services, or features on our Platform are{" "}
          <strong>final and non-refundable</strong>, regardless of usage,
          cancellation, or dissatisfaction with the service.
        </p>
        <h4 className="font-bold text-xl my-2">2. Subscription Cancellation</h4>
        <ul className="list-disc list-inside text-xs mb-4">
          <li>
            Users may cancel their subscription at any time, but no refunds will
            be provided for any unused portion of the subscription or service
            period.
          </li>
          <li>
            Access to the service will remain active until the end of the
            current billing cycle.
          </li>
        </ul>
        <h4 className="font-bold text-xl my-2">3. Exceptional Cases</h4>
        <p className="text-xs leading-6 mb-4">
          In rare cases, such as billing errors or technical issues, you may
          contact our support team to review your situation. However, issuing
          refunds is solely at our discretion and is not guaranteed.
        </p>
        <h4 className="font-bold text-xl my-2">4. Changes to this Policy</h4>
        <p className="text-xs leading-6 mb-4">
          We reserve the right to update or modify this Refund Policy at any
          time. Any changes will be communicated through updates on the Platform
          or by notifying users directly.
        </p>
        <h4 className="font-bold text-xl my-2">5. Contact Us</h4>
        <p className="text-xs leading-6 mb-4">
          If you have any questions or concerns regarding this Refund Policy,
          please contact us:
        </p>
        <ul className="list-disc list-inside text-xs mb-4">
          <li>
            <strong>Email:</strong> buddypair24@gmail.com
          </li>
          <li>
            <strong>Phone:</strong> 7907125266
          </li>
          <li>
            <strong>Address:</strong> GVR Business Transforms, 1st Floor Ayisha
            Complex, St. Albert Lane, Banerji Road, Ernakulam 682018
          </li>
        </ul>
      </PolicyLayout>
    );
}

export default RefundPolicy;
