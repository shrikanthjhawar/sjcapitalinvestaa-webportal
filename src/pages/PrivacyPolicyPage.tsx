import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Mail, Phone, Calendar, FileText, CheckCircle } from 'lucide-react';

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
      
      <main className="pt-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <Shield className="h-4 w-4" />
              Privacy & Security
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
              Privacy 
              <span className="text-transparent bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text"> Policy</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Your privacy is our priority. Learn how we collect, use, and protect your personal information with transparency and care.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200"
              >
                <div className="bg-green-100 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Secure</h3>
                <p className="text-sm text-neutral-600">Industry-standard security measures</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200"
              >
                <div className="bg-primary/10 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Transparent</h3>
                <p className="text-sm text-neutral-600">Clear about data collection and usage</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200"
              >
                <div className="bg-accent/10 p-3 rounded-xl w-fit mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Compliant</h3>
                <p className="text-sm text-neutral-600">Adheres to privacy regulations</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-premium border border-neutral-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-8 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-primary-400 to-primary-500 p-4 rounded-2xl">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Privacy Policy</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-neutral-500" />
                      <span className="text-sm text-neutral-600">Last updated: October 26, 2023</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-semibold">
                  Current Version
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-12">
              <div className="space-y-8">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary/10">
                  <p className="text-primary leading-relaxed">
                    SJ Capital Investaa ("us", "we", or "our") operates the https://www.sjcapital.in website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                  </p>
                </div>

                {/* Information Collection Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Information Collection and Use</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    We collect several different types of information for various purposes to provide and improve our Service to you.
                  </p>
                  
                  {/* Personal Data */}
                  <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-accent" />
                      Personal Data
                    </h3>
                    <p className="text-neutral-700 mb-4 leading-relaxed">
                      While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { icon: Mail, text: "Email address" },
                        { icon: FileText, text: "First name and last name" },
                        { icon: Phone, text: "Phone number" },
                        { icon: FileText, text: "Address, State, Province, ZIP/Postal code, City" },
                        { icon: Eye, text: "Cookies and Usage Data" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                          <item.icon className="h-4 w-4 text-accent" />
                          <span className="text-sm text-neutral-700">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Usage Data */}
                  <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-accent" />
                      Usage Data
                    </h3>
                    <p className="text-neutral-700 leading-relaxed">
                      We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </p>
                  </div>
                </div>

                {/* Use of Data Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-accent/10 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Use of Data</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    SJ Capital Investaa uses the collected data for various purposes:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "To provide and maintain our Service",
                      "To notify you about changes to our Service",
                      "To allow you to participate in interactive features of our Service when you choose to do so",
                      "To provide customer support",
                      "To gather analysis or valuable information so that we can improve our Service",
                      "To monitor the usage of our Service",
                      "To detect, prevent and address technical issues"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Security Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Lock className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Data Security</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                  </p>
                </div>

                {/* Links to Other Sites */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Links to Other Sites</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                  </p>
                </div>

                {/* Changes to Policy */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-accent/10 p-3 rounded-xl">
                      <Calendar className="h-6 w-6 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Changes to This Privacy Policy</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.
                  </p>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Contact Us</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-semibold text-primary">Email</p>
                          <a href="mailto:shrikanth@sjcapital.in" className="text-accent hover:underline">
                            shrikanth@sjcapital.in
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-semibold text-primary">Phone</p>
                          <a href="tel:+919392265654" className="text-accent hover:underline">
                            +91 93922 65654
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicyPage;