import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeartPulse, CheckCircle2, ShieldCheck, ArrowRight, Phone } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const { setCustomerView, t } = useApp();
  const [mobileNumber, setMobileNumber] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleDemoLogin = () => {
    setCustomerView('home');
  };

  return (
    <div className="card text-center p-6" style={{ maxWidth: '480px', margin: '2rem auto' }}>
      <div 
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}
      >
        <HeartPulse size={40} />
      </div>

      <h1 className="font-bold text-2xl mb-2">{t('brandName')}</h1>
      <p className="text-secondary text-sm mb-6" style={{ maxWidth: '380px', margin: '0 auto 1.5rem' }}>
        {t('tagline')}
      </p>

      <div className="p-3 rounded mb-6 text-left" style={{ background: 'var(--color-bg-subtle)' }}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={16} color="var(--color-primary)" />
          <span className="text-sm font-semibold">Reliable Monthly Refills</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={16} color="var(--color-primary)" />
          <span className="text-sm font-semibold">Licensed Pharmacy Dispensation Only</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} color="var(--color-primary)" />
          <span className="text-sm font-semibold">Scheduled Village Doorstep Delivery</span>
        </div>
      </div>

      <div className="alert alert-info mb-6 text-left">
        <ShieldCheck size={18} style={{ flexShrink: 0 }} />
        <span className="text-xs">
          <strong>Direct Model:</strong> Customer → Our Platform → Licensed Pharmacy Hub → Trained Delivery Rider → Customer. (No multi-store chaos).
        </span>
      </div>

      {!showLoginModal ? (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => setShowLoginModal(true)}
          >
            <span>Enter Customer Prototype</span>
            <ArrowRight size={16} />
          </button>
          
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={handleDemoLogin}
          >
            <span>Use Demo Account (Ramesh Patil)</span>
          </button>
        </div>
      ) : (
        <div className="text-left border p-4 rounded" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="font-bold text-base mb-3">Mock Mobile Verification</h3>
          <div className="form-group mb-3">
            <label className="form-label">Mobile Number</label>
            <div className="flex gap-2">
              <span className="btn btn-secondary" style={{ minWidth: '55px', padding: '0 8px' }}>+91</span>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter 10-digit mobile"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                maxLength={10}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleDemoLogin}
            >
              <Phone size={16} />
              <span>Continue with OTP (Demo Auto-Fill)</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => {
                setMobileNumber('9876543210');
                setTimeout(handleDemoLogin, 300);
              }}
            >
              Fill Demo User (Ramesh Patil - Satara)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
