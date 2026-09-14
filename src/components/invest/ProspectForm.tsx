import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitProspect, ProspectPayload } from '../../services/prospectService';

const CONSULTATION_REASONS = [
  'Start investing',
  'Start or increase my SIP',
  'Review my existing investments',
  'Plan for a financial goal',
  'Understand mutual fund options',
  'Other',
] as const;

interface FormState {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: string;
  intent: string;
  privacyConsent: boolean;
  website: string; // Honeypot field
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  dob?: string;
  intent?: string;
  privacyConsent?: string;
  general?: string;
}

// Calculate age from YYYY-MM-DD
function calculateAgeFromDob(dobString: string): number | null {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

const ProspectForm: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    dob: '',
    intent: '',
    privacyConsent: false,
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // First Name (Required)
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name (Required)
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Mobile (Required, Indian 10-digit mobile starting with 6-9)
    const cleanMobile = formData.mobile.replace(/[\s-+()]/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(cleanMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // Email (Required, valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Date of Birth (Required)
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const calculatedAge = calculateAgeFromDob(formData.dob);
      if (calculatedAge === null || calculatedAge < 18) {
        newErrors.dob = 'You must be at least 18 years old';
      } else if (calculatedAge > 120) {
        newErrors.dob = 'Please enter a valid date of birth';
      }
    }

    // Why do you need a consultation? (Required)
    if (!formData.intent) {
      newErrors.intent = 'Please select why you need a consultation';
    }

    // Mandatory Consent (Required, unchecked by default)
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must agree to the consent statement to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, general: undefined }));

    // Extract query parameters for marketing attribution
    const source = searchParams.get('source') || null;
    const campaign = searchParams.get('campaign') || null;
    const utmSource = searchParams.get('utm_source') || null;
    const utmMedium = searchParams.get('utm_medium') || null;
    const utmCampaign = searchParams.get('utm_campaign') || null;
    const utmContent = searchParams.get('utm_content') || null;
    const utmTerm = searchParams.get('utm_term') || null;

    // Calculate age from DOB
    const age = calculateAgeFromDob(formData.dob);

    const payload: ProspectPayload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      mobile: formData.mobile.replace(/[\s-+()]/g, ''),
      email: formData.email.trim(),
      age,
      intent: formData.intent,
      privacyConsent: formData.privacyConsent,
      source,
      campaign,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      website: formData.website,
    };

    const result = await submitProspect(payload);

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrors((prev) => ({
        ...prev,
        general:
          result.message ||
          'Something went wrong while submitting your details. Please try again.',
      }));
    }
  };

  // Max selectable date for DOB (18 years ago today)
  const maxDobDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split('T')[0];
  })();

  // Success State View
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 border border-neutral-200/80 text-center shadow-sm">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 text-green-600 rounded-full mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-primary mb-2">
          Thank you for reaching out.
        </h3>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          We've received your details. An SJ Capital advisor will get in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
      {errors.general && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>{errors.general}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Hidden Honeypot Field */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <label htmlFor="website">Website (Leave Blank)</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs font-semibold text-neutral-700 mb-1"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              disabled={isSubmitting}
              value={formData.firstName}
              onChange={handleInputChange}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              placeholder="First name"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                errors.firstName
                  ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-neutral-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500'
              } disabled:bg-neutral-100 disabled:cursor-not-allowed`}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-xs font-semibold text-neutral-700 mb-1"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              disabled={isSubmitting}
              value={formData.lastName}
              onChange={handleInputChange}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              placeholder="Last name"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                errors.lastName
                  ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-neutral-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500'
              } disabled:bg-neutral-100 disabled:cursor-not-allowed`}
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Mobile & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="mobile"
              className="block text-xs font-semibold text-neutral-700 mb-1"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-500 font-medium select-none">
                +91
              </span>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                inputMode="tel"
                disabled={isSubmitting}
                value={formData.mobile}
                onChange={handleInputChange}
                aria-invalid={!!errors.mobile}
                aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                placeholder="10-digit mobile number"
                className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                  errors.mobile
                    ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-neutral-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500'
                } disabled:bg-neutral-100 disabled:cursor-not-allowed`}
              />
            </div>
            {errors.mobile && (
              <p id="mobile-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.mobile}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-neutral-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              inputMode="email"
              disabled={isSubmitting}
              value={formData.email}
              onChange={handleInputChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="name@example.com"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                errors.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-neutral-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500'
              } disabled:bg-neutral-100 disabled:cursor-not-allowed`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dob"
            className="block text-xs font-semibold text-neutral-700 mb-1"
          >
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            disabled={isSubmitting}
            max={maxDobDate}
            value={formData.dob}
            onChange={handleInputChange}
            aria-invalid={!!errors.dob}
            aria-describedby={errors.dob ? 'dob-error' : undefined}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none bg-white ${
              errors.dob
                ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-neutral-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500'
            } disabled:bg-neutral-100 disabled:cursor-not-allowed`}
          />
          {errors.dob && (
            <p id="dob-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.dob}
            </p>
          )}
        </div>

        {/* Why do you need a consultation? (Dropdown) */}
        <div>
          <label
            htmlFor="intent"
            className="block text-xs font-semibold text-neutral-700 mb-1"
          >
            Why do you need a consultation? <span className="text-red-500">*</span>
          </label>
          <select
            id="intent"
            name="intent"
            disabled={isSubmitting}
            value={formData.intent}
            onChange={handleInputChange}
            aria-invalid={!!errors.intent}
            aria-describedby={errors.intent ? 'intent-error' : undefined}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none bg-white ${
              errors.intent
                ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-neutral-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500'
            } disabled:bg-neutral-100 disabled:cursor-not-allowed`}
          >
            <option value="">Select an option</option>
            {CONSULTATION_REASONS.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          {errors.intent && (
            <p id="intent-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.intent}
            </p>
          )}
        </div>

        {/* Mandatory Single Consent Checkbox */}
        <div className="pt-2">
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="privacyConsent"
              name="privacyConsent"
              disabled={isSubmitting}
              checked={formData.privacyConsent}
              onChange={handleInputChange}
              aria-invalid={!!errors.privacyConsent}
              aria-describedby={errors.privacyConsent ? 'privacyConsent-error' : undefined}
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-accent-600 focus:ring-accent-500 shrink-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <label
              htmlFor="privacyConsent"
              className="text-xs text-neutral-600 leading-relaxed cursor-pointer select-none"
            >
              I agree to SJ Capital Investaa collecting and using the information provided above to contact me regarding my enquiry and to send me relevant investment-related updates and educational communications, in accordance with the{' '}
              <Link
                to="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-700 hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              . <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.privacyConsent && (
            <p
              id="privacyConsent-error"
              className="mt-1 text-xs text-red-600 pl-6"
              role="alert"
            >
              {errors.privacyConsent}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-gradient text-primary font-bold py-3 px-6 rounded-xl hover:shadow-glow transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Getting in touch...</span>
              </>
            ) : (
              <span>Get in Touch</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProspectForm;
