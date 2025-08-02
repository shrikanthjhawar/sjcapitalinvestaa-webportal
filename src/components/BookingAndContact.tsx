import { useState } from 'react';

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
      // Note: Replace YOUR-FORM-ID with actual FormKeep form ID
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
    <section className="py-20 bg-white" id="booking-contact">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Calendar Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-primary/10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                📅 Book a Free Consultation
              </h2>
              <p className="text-primary/80">
                Schedule a personalized investment consultation with our certified financial advisors.
              </p>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-2 min-h-[450px] flex items-center justify-center">
              <iframe
                src="https://sjcapitalinvestaa.zohobookings.in/portal-embed#/300049000000042054"
                width="100%"
                height="450"
                frameBorder="0"
                className="rounded-lg"
                title="Book a consultation"
              />
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-primary/10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                ✉️ Send Us a Message
              </h2>
              <p className="text-primary/80">
                Have questions? Get in touch and we'll respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary/90 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary/20 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary/90 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary/20 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary/90 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-primary/20 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-vertical"
                  placeholder="Tell us about your investment goals..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <p className="text-green-800 text-xs">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-red-800 text-xs">
                    Sorry, there was an error sending your message. Please try again.
                  </p>
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}