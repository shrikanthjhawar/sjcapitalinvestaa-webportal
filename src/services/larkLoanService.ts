/**
 * Service wrapper for Lark Finserv Loan Against Securities (LAS) SDK.
 * Handles SDK initialization, responsive display mode calculation, event subscriptions,
 * and graceful error handling.
 */

export interface LarkSDKConfig {
  sdkKey?: string;
  apiKey?: string;
  sdkSecret?: string;
  apiSecret?: string;
  partnerId?: string;
  phoneNumber?: string;
  theme?: Record<string, string>;
  env?: 'sandbox' | 'production';
}

export type LarkSDKEvent = 'INITIATED' | 'READY' | 'ELIGIBILITY_RESULT' | 'ERROR' | 'CLOSE_FRAME';
export type LarkSDKEventCallback = (data?: any) => void;

export const DEFAULT_LARK_WHITE_LABEL_URL =
  import.meta.env.VITE_LARK_WHITE_LABEL_URL || 'https://loan.sjcapital.in';

class LarkLoanService {
  private sdkInstance: any = null;
  private isInitialized = false;
  private eventListeners: Map<LarkSDKEvent, Set<LarkSDKEventCallback>> = new Map();

  /**
   * Calculates recommended display mode based on viewport width.
   */
  public getRecommendedMode(): 'inline' | 'popup' {
    if (typeof window === 'undefined') return 'inline';
    return window.innerWidth >= 768 ? 'inline' : 'popup';
  }

  /**
   * Initializes the Lark SDK instance safely.
   */
  public async initializeSDK(customConfig?: Partial<LarkSDKConfig>): Promise<boolean> {
    try {
      const sdkKey = customConfig?.sdkKey || customConfig?.apiKey || import.meta.env.VITE_LARK_SDK_KEY;
      const partnerId = customConfig?.partnerId || import.meta.env.VITE_LARK_PARTNER_ID;

      if (!sdkKey && !partnerId) {
        console.warn('Lark SDK Key / Partner ID is not configured. SDK will use fallback mode.');
        return false;
      }

      // Dynamic import with runtime resolution to prevent Rollup build failure prior to npm install
      let SDKModule: any;
      try {
        const pkgName = 'lark-sdk-multi';
        SDKModule = await import(/* @vite-ignore */ pkgName);
      } catch (err) {
        console.warn('lark-sdk-multi package not installed yet. Operating in preview/fallback mode.');
        return false;
      }

      const SDKConstructor = SDKModule?.default || SDKModule?.LoanEligibilitySDK || SDKModule?.LarkSDK || SDKModule;

      if (typeof SDKConstructor !== 'function') {
        console.warn('Unable to resolve Lark SDK constructor.');
        return false;
      }

      const config: LarkSDKConfig = {
        sdkKey,
        apiKey: sdkKey,
        partnerId,
        env: (import.meta.env.VITE_LARK_ENV as 'sandbox' | 'production') || 'sandbox',
        theme: {
          primaryColor: '#0f172a',
          accentColor: '#d4af37',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '12px',
        },
        ...customConfig,
      };

      this.sdkInstance = new SDKConstructor(config);

      // Register internal event forwarding
      const events: LarkSDKEvent[] = ['INITIATED', 'READY', 'ELIGIBILITY_RESULT', 'ERROR', 'CLOSE_FRAME'];
      events.forEach((evt) => {
        if (typeof this.sdkInstance?.on === 'function') {
          this.sdkInstance.on(evt, (data: any) => this.triggerEvent(evt, data));
        }
      });

      if (typeof this.sdkInstance?.initialize === 'function') {
        await this.sdkInstance.initialize();
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Lark SDK:', error);
      this.triggerEvent('ERROR', error);
      return false;
    }
  }

  /**
   * Launches the Loan Eligibility check workflow.
   */
  public async openEligibilityCheck(mode?: 'inline' | 'popup'): Promise<boolean> {
    const displayMode = mode || this.getRecommendedMode();

    if (!this.isInitialized || !this.sdkInstance) {
      const initialized = await this.initializeSDK();
      if (!initialized) {
        return false;
      }
    }

    try {
      if (typeof this.sdkInstance?.openEligibilityCheck === 'function') {
        this.sdkInstance.openEligibilityCheck(displayMode);
        return true;
      } else {
        console.warn('openEligibilityCheck method not found on Lark SDK instance.');
        return false;
      }
    } catch (error) {
      console.error('Error opening Lark eligibility check:', error);
      this.triggerEvent('ERROR', error);
      return false;
    }
  }

  /**
   * Closes the Lark SDK frame/modal.
   */
  public closeFrame(): void {
    try {
      if (this.sdkInstance && typeof this.sdkInstance.closeFrame === 'function') {
        this.sdkInstance.closeFrame();
      }
    } catch (err) {
      console.error('Error closing Lark frame:', err);
    }
  }

  /**
   * Subscribes to an SDK lifecycle event.
   */
  public on(event: LarkSDKEvent, callback: LarkSDKEventCallback): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.eventListeners.get(event)?.delete(callback);
    };
  }

  private triggerEvent(event: LarkSDKEvent, data?: any): void {
    const callbacks = this.eventListeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in Lark SDK event listener [${event}]:`, e);
        }
      });
    }
  }
}

export const larkLoanService = new LarkLoanService();
