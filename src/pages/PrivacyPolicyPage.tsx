import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | SJ Capital Investaa</title>
        <meta name="description" content="Read the privacy policy for SJ Capital Investaa to understand how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://www.sjcapital.in/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | SJ Capital Investaa" />
        <meta property="og:description" content="Our commitment to your privacy. Learn how SJ Capital Investaa handles your data." />
        <meta property="og:url" content="https://www.sjcapital.in/privacy-policy" />
        <meta property="og:type" content="website" />
      </Helmet>
      <main className="pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-200">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
              Privacy Policy
            </h1>
            <p className="text-center text-gray-500 mb-10">Last updated: October 26, 2023</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                SJ Capital Investaa ("us", "we", or "our") operates the https://www.sjcapital.in website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <h3>Types of Data Collected</h3>
              <h4>Personal Data</h4>
              <p>
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
              </p>
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>

              <h4>Usage Data</h4>
              <p>
                We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Use of Data</h2>
              <p>SJ Capital Investaa uses the collected data for various purposes:</p>
              <ul>
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Links to Other Sites</h2>
              <p>
                Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li>By email: shrikanth@sjcapital.in</li>
                <li>By phone: +91 93922 65654</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    
    </>
  );
};

export default PrivacyPolicyPage;