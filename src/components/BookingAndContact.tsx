import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Phone, Mail, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function BookingAndContact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xjkovlap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50/30" id="booking-contact">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header - More Compact */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <Phone className="h-4 w-4" />
            Get In Touch
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
            Book Consultation & Contact Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Calendar Section - More Compact */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Book a Free Consultation
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Schedule a personalized investment consultation with our certified financial advisors.
              </p>
            </div>
            
            {/* Features - More Compact Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-neutral-700">Free Consultation</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-neutral-700">Expert Advisors</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-neutral-700">Personalized Plan</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-neutral-700">No Obligation</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-3 min-h-[350px] flex items-center justify-center border border-neutral-200">
              <iframe
                src="https://sjcapitalinvestaa.zohobookings.in/portal-embed#/300049000000042054"
                width="100%"
                height="350"
                frameBorder="0"
                className="rounded-lg"
                title="Book a consultation"
              />
            </div>
          </motion.div>

          {/* Contact Form Section - More Compact */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-3">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Send Us a Message
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Have questions about investments? Get in touch with our expert team.
              </p>
            </div>

            {/* Quick Contact Info - More Compact */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                <Phone className="h-3 w-3 text-accent" />
                <span className="text-xs font-medium text-neutral-700">+91 93922 65654</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                <Mail className="h-3 w-3 text-accent" />
                <span className="text-xs font-medium text-neutral-700">Quick Response</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                <Clock className="h-3 w-3 text-accent" />
                <span className="text-xs font-medium text-neutral-700">24hr Response</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                <CheckCircle className="h-3 w-3 text-accent" />
                <span className="text-xs font-medium text-neutral-700">Expert Advice</span>
              </div>
            </div>

            {/* Form - More Compact */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-primary mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 resize-none text-sm"
                  placeholder="Tell us about your investment goals and questions..."
                />
              </div>

              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <p className="text-green-800 font-medium text-sm">
                      Thank you for your message! We'll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-red-800 font-medium text-sm">
                      Sorry, there was an error sending your message. Please try again.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-gradient text-primary px-6 py-3 rounded-xl font-bold hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}