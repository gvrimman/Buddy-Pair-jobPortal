import React from 'react'
import PolicyLayout from "../../layouts/PolicyLayout";

function ContactUs() {
  return (
    <PolicyLayout title="Contact Us">
      <p className="text-xs leading-6 mb-4">
        We’re here to help! Whether you have questions about our services, need
        assistance, or want to share feedback, feel free to reach out to us.
      </p>
      <h4 className="font-bold text-xl my-2">Get in Touch</h4>
      <ul className="list-disc list-inside text-xs mb-4">
        <li>
          <strong>Email:</strong>
          buddypair24@gmail.com
          <p>For general inquiries, support, or feedback.</p>
        </li>
        <li>
          <strong>Phone:</strong>
          +917907125266
          <p>Available Monday to Friday, 10.00 am IST to 5.30 pm IST</p>
        </li>
        <li>
          <strong>Address:</strong>
          GVR Business Transforms, 1st Floor Ayisha Complex, St. Albert Lane,
          Banerji Road, Ernakulam 682018
        </li>
      </ul>
      <h4 className="font-bold text-xl my-2">Support Hours</h4>
      <ul className="list-disc list-inside text-xs mb-4">
        <li>
          <strong>Monday to Friday:</strong> 9:00 AM – 6:00 PM
        </li>
        <li>
          <strong>Saturday & Sunday:</strong> Closed
        </li>
      </ul>
      <h4 className="font-bold text-xl my-2">Frequently Asked Questions</h4>
      <p className="text-xs leading-6 mb-4">
        Check out our FAQ Section for quick answers to common questions.
      </p>
      <h4 className="font-bold text-xl my-2">Follow Us</h4>
      <p className="text-xs leading-6 mb-4">
        Stay connected with us on social media for the latest updates:
      </p>
      <ul className="list-disc list-inside text-xs mb-4">
        <li>Facebook</li>
        <li>Twitter</li>
        <li>LinkedIn</li>
      </ul>
      <h4 className="font-bold text-xl my-2">Contact Form</h4>
      <p className="text-xs leading-6 mb-4">
        Alternatively, you can use the contact form below to send us a message
        directly.
      </p>
      <ContactUs />
      <p className="text-xs leading-6 mb-4">
        We aim to respond to all inquiries within 24-48 hours.
      </p>
      <p className="text-xs leading-6 mb-4">
        Thank you for choosing <strong>Buddy Pair!</strong>
      </p>
    </PolicyLayout>
  );
}

export default ContactUs