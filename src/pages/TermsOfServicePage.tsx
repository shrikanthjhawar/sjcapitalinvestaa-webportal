import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Scale, Shield, FileText, AlertTriangle, Mail, Phone, Calendar, CheckCircle, Lock, Eye } from 'lucide-react';

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
      
      <main className="pt-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <Scale className="h-4 w-4" />
              Legal Terms
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
              Terms of 
              <span className="text-transparent bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text"> Service</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Please read these terms and conditions carefully before using our services. They govern your use of our website and services.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200"
              >
                <div className="bg-blue-100 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Scale className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Fair Terms</h3>
                <p className="text-sm text-neutral-600">Clear and reasonable conditions</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200"
              >
                <div className="bg-green-100 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Protected</h3>
                <p className="text-sm text-neutral-600">Your rights are safeguarded</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200"
              >
                <div className="bg-accent/10 p-3 rounded-xl w-fit mx-auto mb-4">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Transparent</h3>
                <p className="text-sm text-neutral-600">No hidden clauses or surprises</p>
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
                    <Scale className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Terms of Service</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-neutral-500" />
                      <span className="text-sm text-neutral-600">Last updated: October 26, 2023</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-semibold">
                  Current Version
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-12">
              <div className="space-y-8">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary/10">
                  <p className="text-primary leading-relaxed mb-4">
                Welcome to SJ Capital Investaa. These terms and conditions outline the rules and regulations for the use of SJ Capital Investaa's Website, located at https://www.sjcapital.in.
              </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-amber-800 text-sm">
                By accessing this website we assume you accept these terms and conditions. Do not continue to use SJ Capital Investaa if you do not agree to take all of the terms and conditions stated on this page.
              </p>
                    </div>
                  </div>
                </div>

                {/* Introduction Section */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">1. Introduction</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, SJ Capital Investaa accessible at https://www.sjcapital.in.
              </p>
                </div>

                {/* Intellectual Property */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-accent/10 p-3 rounded-xl">
                      <Lock className="h-6 w-6 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">2. Intellectual Property Rights</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                Other than the content you own, under these Terms, SJ Capital Investaa and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
              </p>
                </div>

                {/* Restrictions */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 p-3 rounded-xl">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">3. Restrictions</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed mb-4">You are specifically restricted from all of the following:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Publishing any Website material in any other media",
                      "Selling, sublicensing and/or otherwise commercializing any Website material",
                      "Publicly performing and/or showing any Website material",
                      "Using this Website in any way that is or may be damaging to this Website",
                      "Using this Website in any way that impacts user access to this Website",
                      "Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity",
                      "Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website",
                      "Using this Website to engage in any advertising or marketing"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-red-100">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Your Content */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">4. Your Content</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant SJ Capital Investaa a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
              </p>
                </div>

                {/* No Warranties */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-amber-100 p-3 rounded-xl">
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">5. No Warranties</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                This Website is provided "as is," with all faults, and SJ Capital Investaa express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
              </p>
                </div>

                {/* Limitation of Liability */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">6. Limitation of Liability</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                In no event shall SJ Capital Investaa, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. SJ Capital Investaa, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
              </p>
                </div>

                {/* Governing Law */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Scale className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">7. Governing Law & Jurisdiction</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                These Terms will be governed by and interpreted in accordance with the laws of the State of Telangana, India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Telangana for the resolution of any disputes.
              </p>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Questions About These Terms?</h2>
                  </div>
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    If you have any questions about these Terms of Service, please don't hesitate to contact us:
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

export default TermsOfServicePage;