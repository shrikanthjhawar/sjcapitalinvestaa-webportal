import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | SJ Capital Investaa</title>
        <meta name="description" content="Read the terms and conditions for using the services of SJ Capital Investaa." />
        <link rel="canonical" href="https://www.sjcapital.in/terms-of-service" />
        <meta property="og:title" content="Terms of Service | SJ Capital Investaa" />
        <meta property="og:description" content="Review the terms of service for SJ Capital Investaa." />
        <meta property="og:url" content="https://www.sjcapital.in/terms-of-service" />
        <meta property="og:type" content="website" />
      </Helmet>
      <main className="pt-20 bg-white">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-primary/10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6 text-center">
              Terms of Service
            </h1>
            <p className="text-center text-primary/60 mb-10">Last updated: October 26, 2023</p>

            <div className="
              prose prose-lg max-w-none
              prose-p:font-serif prose-p:leading-relaxed prose-p:text-primary/90
              prose-headings:font-sans prose-headings:font-bold prose-headings:text-primary
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-ul:font-serif prose-li:my-2
              prose-a:text-accent hover:prose-a:underline prose-a:font-semibold
            ">
              <p>
                Welcome to SJ Capital Investaa. These terms and conditions outline the rules and regulations for the use of SJ Capital Investaa's Website, located at https://www.sjcapital.in.
              </p>
              <p>
                By accessing this website we assume you accept these terms and conditions. Do not continue to use SJ Capital Investaa if you do not agree to take all of the terms and conditions stated on this page.
              </p>

              <h2>1. Introduction</h2>
              <p>
                These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, SJ Capital Investaa accessible at https://www.sjcapital.in.
              </p>

              <h2>2. Intellectual Property Rights</h2>
              <p>
                Other than the content you own, under these Terms, SJ Capital Investaa and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
              </p>

              <h2>3. Restrictions</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul>
                <li>publishing any Website material in any other media;</li>
                <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                <li>publicly performing and/or showing any Website material;</li>
                <li>using this Website in any way that is or may be damaging to this Website;</li>
                <li>using this Website in any way that impacts user access to this Website;</li>
                <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                <li>using this Website to engage in any advertising or marketing.</li>
              </ul>

              <h2>4. Your Content</h2>
              <p>
                In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant SJ Capital Investaa a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
              </p>

              <h2>5. No warranties</h2>
              <p>
                This Website is provided "as is," with all faults, and SJ Capital Investaa express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
              </p>

              <h2>6. Limitation of liability</h2>
              <p>
                In no event shall SJ Capital Investaa, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. SJ Capital Investaa, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
              </p>

              <h2>7. Governing Law & Jurisdiction</h2>
              <p>
                These Terms will be governed by and interpreted in accordance with the laws of the State of Telangana, India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Telangana for the resolution of any disputes.
              </p>

            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TermsOfServicePage;