import React from "react";
import PolicyLayout from "../../layouts/PolicyLayout";
import ContactForm from "../../components/common/ContactForm";

function AboutUs() {
  return (
    <PolicyLayout title="About Us">
      <p className="text-xs leading-6 mb-4">
        <strong>Welcome to Buddy Pair</strong> – your ultimate platform for
        seamless job searches, professional networking, and meaningful
        connections
      </p>
      <p className="text-xs leading-6 mb-4">
        At Buddy Pair, we believe in redefining how professionals connect with
        opportunities and with each other. Whether you’re a job seeker looking
        for your dream job, an employer seeking top talent, or a professional
        aiming to build valuable networks, Buddy Pair provides the perfect space
        to grow and succeed.
      </p>
      <h4 className="font-bold text-xl my-2">Our Mission</h4>
      <p className="text-xs leading-6 mb-4">
        Our mission is to bridge the gap between opportunities and talent by
        offering an innovative and secure platform that prioritizes privacy,
        seamless experiences, and meaningful professional connections.
      </p>
      <h4 className="font-bold text-xl my-2">What Makes Us Unique?</h4>
      <ul className="list-disc list-inside text-xs mb-4">
        <li>
          <strong>Seamless Job Matching</strong> Find the perfect job or
          candidate with our intuitive search and matching system.
        </li>
        <li>
          <strong>Professional Networking</strong> Create groups, share ideas,
          and collaborate with like-minded professionals in your field.
        </li>
        <li>
          <strong>Secure Communication</strong> Chat with end-to-end encryption,
          ensuring your privacy and security.
        </li>
        <li>
          <strong>Beyond Professionalism</strong> Explore professional dating
          options for like-minded individuals looking for meaningful connections
          beyond work.
        </li>
      </ul>
      <h4 className="font-bold text-xl my-2">Why Choose Buddy Pair?</h4>
      <ul className="list-disc list-inside text-xs mb-4">
        <li>
          <strong>For Job Seekers:</strong> Simplify your job search with smart
          tools and direct access to employers.
        </li>
        <li>
          <strong>For Employers:</strong> Easily find the right candidates to
          grow your business.
        </li>
        <li>
          <strong>For Professionals:</strong> Build your network, join
          communities, and exchange knowledge in a secure environment.
        </li>
        <li>
          <strong>For Privacy Lovers:</strong> Your data and interactions are
          fully protected, as we prioritize your confidentiality.
        </li>
      </ul>
      <h4 className="font-bold text-xl my-2">Our Vision</h4>
      <p className="text-xs leading-6 mb-4">
        To become the leading platform that combines professional growth,
        seamless recruitment, and secure networking under one roof, empowering
        individuals and organizations worldwide.
      </p>
      <h4 className="font-bold text-xl my-2">Join the Buddy Pair Community</h4>
      <p className="text-xs leading-6 mb-4">
        Buddy Pair isn’t just a platform; it’s a growing community of
        professionals, employers, and innovators dedicated to building
        meaningful connections and advancing their careers.
      </p>
      <p className="text-xs leading-6 mb-4">
        Be part of our journey and unlock new opportunities with Buddy Pair.
      </p>
      <p className="text-xs leading-6 mb-4">
        Thank you for trusting us as your partner in success. Let’s grow
        together!
      </p>
      <h4 className="font-bold text-xl my-2">Contact Form</h4>
      <p className="text-xs leading-6 mb-4">
        Alternatively, you can use the contact form below to send us a message
        directly.
      </p>
      <ContactForm />
      <p className="text-xs leading-6 mb-4">
        We aim to respond to all inquiries within 24-48 hours.
      </p>
      <p className="text-xs leading-6 mb-4">
        Thank you for choosing <strong>Buddy Pair!</strong>
      </p>
    </PolicyLayout>
  );
}

export default AboutUs;
