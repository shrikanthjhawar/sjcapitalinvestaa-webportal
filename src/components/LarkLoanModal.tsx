import React, { useEffect, useState } from 'react';
import { X, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import { larkLoanService, DEFAULT_LARK_WHITE_LABEL_URL } from '../services/larkLoanService';

interface LarkLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'inline' | 'popup';
}

export const LarkLoanModal: React.FC<LarkLoanModalProps> = ({ isOpen, onClose, mode }) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setErrorMessage(null);

    const unsubInitiated = larkLoanService.on('INITIATED', () => {
      setLoading(true);
    });

    const unsubReady = larkLoanService.on('READY', () => {
      setLoading(false);
    });

    const unsubError = larkLoanService.on('ERROR', (err) => {
      setLoading(false);
      setErrorMessage(
        typeof err === 'string'
          ? err
          : err?.message || 'The loan eligibility widget could not load automatically.'
      );
    });

    const unsubClose = larkLoanService.on('CLOSE_FRAME', () => {
      onClose();
    });

    // Launch check
    larkLoanService.openEligibilityCheck(mode).then((success) => {
      if (!success) {
        setLoading(false);
        setErrorMessage(
          'Loan widget initialization pending credentials or package setup.'
        );
      }
    });

    return () => {
      unsubInitiated();
      unsubReady();
      unsubError();
      unsubClose();
      larkLoanService.closeFrame();
    };
  }, [isOpen, mode, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeInUp">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-premium overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" />
            <h3 className="text-lg font-bold font-heading">Loan Against Securities</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative flex-1 p-6 overflow-y-auto min-h-[400px] flex flex-col justify-center items-center">
          {/* Loading Indicator */}
          {loading && !errorMessage && (
            <div className="flex flex-col items-center gap-4 text-slate-600">
              <Loader2 className="w-10 h-10 animate-spin text-accent-500" />
              <p className="text-sm font-medium">Initializing secure loan journey...</p>
            </div>
          )}

          {/* User-Facing Error Banner & Fallback Button */}
          {errorMessage && (
            <div className="w-full max-w-md bg-amber-50 border border-amber-200 rounded-xl p-6 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-amber-900 text-base">Widget Status Notice</h4>
                <p className="text-sm text-amber-800">{errorMessage}</p>
              </div>
              <p className="text-xs text-amber-700">
                You can continue your Loan Against Mutual Funds / Securities application directly on our white-labelled portal.
              </p>
              <div className="pt-2">
                <a
                  href={DEFAULT_LARK_WHITE_LABEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors text-sm shadow-md"
                >
                  Continue with Loan Portal
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Inline SDK Container target */}
          <div id="lark-eligibility-container" className="w-full h-full min-h-[450px]" />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Powered by Lark Finserv Infrastructure</span>
          <a
            href={DEFAULT_LARK_WHITE_LABEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-accent-600 font-medium inline-flex items-center gap-1 transition-colors"
          >
            Direct Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LarkLoanModal;
