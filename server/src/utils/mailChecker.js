const personalEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "zoho.com",
  "protonmail.com", // Add more as needed
];

const isCompanyMail = (mail) => {
    const domain = mail.split("@")[1];
    return !personalEmailProviders.includes(domain);
};

module.exports = isCompanyMail;