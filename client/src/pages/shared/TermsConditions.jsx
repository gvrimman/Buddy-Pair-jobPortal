import React from "react";
import PolicyLayout from "../../layouts/PolicyLayout";

const termsData = {
  effectiveDate: "11/01/2025",
  intro:
    "Welcome to Buddy Pair! These Terms and Conditions ('Terms') govern your access to and use of the Buddy Pair website, mobile app, and services (collectively referred to as the 'Platform'). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree, please refrain from using our services.",
  sections: [
    {
      title: "Definitions",
      content: [
        {
          subTitle: "Platform",
          description:
            "Refers to the Buddy Pair website and mobile application.",
        },
        {
          subTitle: "User",
          description:
            "Refers to anyone who uses the Platform, including job seekers, employers, and professional community members.",
        },
        {
          subTitle: "Content",
          description:
            "Refers to all information, data, text, images, and materials uploaded or shared on the Platform.",
        },
      ],
    },
    {
      title: "Eligibility",
      content: [
        {
          description:
            "You must be at least 18 years old to register or use the Platform.",
        },
        {
          description:
            "By using the Platform, you represent and warrant that you meet all eligibility requirements and have the authority to agree to these Terms.",
        },
      ],
    },
    {
      title: "User Accounts",
      content: [
        {
          description:
            "Users must provide accurate and complete information during the registration process.",
        },
        {
          description:
            "You are responsible for maintaining the confidentiality of your login credentials and are solely responsible for any activity under your account.",
        },
        {
          description:
            "Buddy Pair reserves the right to suspend or terminate accounts that violate these Terms.",
        },
      ],
    },
    {
      title: "Services Offered",
      content: [
        {
          subTitle: "For Job Seekers",
          description:
            "Access job listings and apply directly through the Platform. Join professional groups and network with other users.",
        },
        {
          subTitle: "For Employers",
          description:
            "Post job openings and search for potential candidates. Use tools for managing recruitment processes.",
        },
        {
          subTitle: "For Professional Networking",
          description:
            "Create or join professional groups to exchange ideas and collaborate.",
        },
        {
          subTitle: "Professional Dating (Optional)",
          description:
            "Users may opt-in for this feature to build personal connections with like-minded professionals.",
        },
      ],
    },
    {
      title: "User Responsibilities",
      content: [
        {
          description:
            "You agree to use the Platform for lawful purposes only.",
        },
        {
          description:
            "You will not upload or share false, misleading, offensive, or inappropriate content.",
        },
        {
          description:
            "You will not engage in spamming, harassment, or any activity that disrupts the Platform’s functionality.",
        },
      ],
    },
    {
      title: "Privacy Policy",
      description:
        "Our Privacy Policy explains how we collect, use, and protect your data. By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.",
    },
    {
      title: "Intellectual Property",
      content: [
        {
          description:
            "Buddy Pair retains all ownership rights to the Platform and its content, including trademarks, logos, and software.",
        },
        {
          description:
            "Users retain ownership of the content they upload but grant Buddy Pair a non-exclusive, royalty-free license to use, display, and distribute such content as necessary for Platform operations.",
        },
      ],
    },
    {
      title: "Fees and Payments",
      content: [
        {
          description:
            "Certain features may require payment, such as premium subscriptions or enhanced employer tools.",
        },
        {
          description:
            "Payments are non-refundable unless otherwise specified.",
        },
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        {
          description:
            "Buddy Pair is not liable for any direct, indirect, or incidental damages arising from the use or inability to use the Platform.",
        },
        {
          description:
            "We do not guarantee the accuracy or reliability of job postings, user profiles, or other content. Users are responsible for verifying the authenticity of any information.",
        },
      ],
    },
    {
      title: "Termination",
      content: [
        {
          description:
            "Buddy Pair reserves the right to terminate or suspend your account at any time for violating these Terms.",
        },
        {
          description:
            "Users may deactivate their accounts at any time by following the steps provided on the Platform.",
        },
      ],
    },
    {
      title: "Prohibited Activities",
      content: [
        { description: "Impersonating any person or entity." },
        {
          description:
            "Posting unauthorized advertisements or promotional material.",
        },
        {
          description:
            "Hacking, reverse-engineering, or attempting to compromise the Platform’s security.",
        },
      ],
    },
    {
      title: "End-to-End Encryption & Privacy",
      content: [
        {
          description:
            "Buddy Pair prioritizes user privacy and ensures all communications through the chat feature are end-to-end encrypted.",
        },
        {
          description:
            "However, users are responsible for protecting their login credentials and private information.",
        },
      ],
    },
    {
      title: "Third-Party Services",
      content: [
        {
          description:
            "The Platform may include links or integrations with third-party services.",
        },
        {
          description:
            "Buddy Pair is not responsible for the content or services provided by third parties.",
        },
      ],
    },
    {
      title: "Modifications to Terms",
      content: [
        {
          description:
            "Buddy Pair reserves the right to update these Terms at any time.",
        },
        {
          description:
            "Continued use of the Platform after modifications indicates acceptance of the updated Terms.",
        },
      ],
    },
    {
      title: "Governing Law",
      content: [
        {
          description:
            "These Terms are governed by the laws of Indian jurisdiction.",
        },
        {
          description:
            "Any disputes shall be resolved exclusively in the courts of Ernakulam, Kerala.",
        },
      ],
    },
    {
      title: "Contact Information",
      content: [
        {
          description:
            "For any questions or concerns regarding these Terms, please contact us at:",
        },
        { subTitle: "Email", description: "buddypair24@gmail.com" },
        { subTitle: "Phone", description: "7907125266" },
      ],
      description:
        "By using the Buddy Pair Platform, you acknowledge that you have read, understood, and agree to these Terms and Conditions.",
    },
  ],
};

function TermsConditions() {
  return (
    <PolicyLayout title="Terms and Conditions">
      <p className="text-xs leading-6 mb-4">
        <strong>Effective Date:</strong> {termsData.effectiveDate}
      </p>
      <p className="text-xs leading-6 mb-4">{termsData.intro}</p>
      {termsData.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-bold text-xl my-2">
            {index + 1}. {section.title}
          </h2>
          <ul className="list-disc list-inside text-xs mb-4 ml-4">
            {section.content &&
              section.content.map((item, i) => (
                <li key={i}>
                  {item.subTitle && <strong>{item.subTitle}: </strong>}
                  {item.description}
                </li>
              ))}
            {section.description && (
              <p className="text-xs leading-6 mb-4">{section.description}</p>
            )}
          </ul>
        </div>
      ))}
    </PolicyLayout>
  );
}

export default TermsConditions;
