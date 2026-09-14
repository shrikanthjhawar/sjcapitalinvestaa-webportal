/**
 * Service for submitting prospect leads from the public landing page to the CRM backend.
 */

export interface ProspectPayload {
  firstName: string;
  lastName?: string | null;
  mobile: string;
  email?: string | null;
  age?: number | null;
  gender?: string | null;
  intent: string;
  privacyConsent: boolean;
  source?: string | null;
  campaign?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  website?: string;
}

export interface ProspectApiResponse {
  success: boolean;
  message?: string;
}

// Constructed dynamically from VITE_PROSPECT_API_URL
const rawBaseUrl = import.meta.env.VITE_PROSPECT_API_URL || 'https://crm.sjcapital.in';
const baseApiUrl = rawBaseUrl.replace(/\/+$/, '');
const PROSPECT_API_ENDPOINT = `${baseApiUrl}/api/v1/public/prospects`;

/**
 * Submits prospect lead information to the backend CRM.
 * Sanitizes response so no internal/database details leak to the client.
 */
export async function submitProspect(payload: ProspectPayload): Promise<ProspectApiResponse> {
  try {
    const response = await fetch(PROSPECT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Intentionally do not leak HTTP error status codes or stack traces
      return {
        success: false,
        message: 'Something went wrong while submitting your details. Please try again.',
      };
    }

    return {
      success: true,
      message: "We've received your details. An SJ Capital advisor will get in touch with you shortly.",
    };
  } catch {
    // Network failure, CORS error, or server unreachable
    return {
      success: false,
      message: 'Something went wrong while submitting your details. Please try again.',
    };
  }
}
