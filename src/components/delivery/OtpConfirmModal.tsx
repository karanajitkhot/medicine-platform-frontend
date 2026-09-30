import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Order } from '../../types';
import { KeyRound, CheckCircle2, Banknote, ShieldAlert } from 'lucide-react';

interface OtpConfirmModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  confirmDelivery: (orderId: string, otp: string) => boolean;
}

export const OtpConfirmModal: React.FC<OtpConfirmModalProps> = ({
  order,
  isOpen,
  onClose,
  onSuccess,
  confirmDelivery
}) => {
  const [otp, setOtp] = useState<string>('');
  const [cashCollected, setCashCollected] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!order) return null;

  const isCod = order.paymentMethod === 'COD';

  const handleVerify = () => {
    if (isCod && !cashCollected) {
      setErrorMsg('Please confirm cash collection before completing delivery.');
      return;
    }

    const ok = confirmDelivery(order.id, otp);
    if (ok) {
      setErrorMsg(null);
      onSuccess();
    } else {
      setErrorMsg('Invalid OTP. Please enter the code shared by the customer (Demo code: ' + (order.otpCode || '4291') + ')');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Customer Delivery">
      <div className="mb-3 text-center">
        <div 
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.5rem'
          }}
        >
          <KeyRound size={28} />
        </div>
        <h4 className="font-bold text-base">Handover to {order.customerName}</h4>
        <p className="text-xs text-muted">Order #{order.id} • Village {order.deliveryAddress.village}</p>
      </div>

      {isCod && (
        <div 
          className="p-3 border rounded mb-3"
          style={{ background: '#fefce8', borderColor: '#fef08a' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs" style={{ color: 'var(--color-warning-text)' }}>
              Cash on Delivery to Collect
            </span>
            <span className="font-bold text-base text-primary">₹{order.totalAmount}</span>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={cashCollected}
              onChange={e => setCashCollected(e.target.checked)}
            />
            <span>I have received exactly ₹{order.totalAmount} cash</span>
          </label>
        </div>
      )}

      <div className="form-group mb-3">
        <label className="form-label text-xs">Customer 4-Digit Delivery OTP</label>
        <input
          type="text"
          maxLength={6}
          className="form-input text-center font-bold text-lg"
          placeholder="Enter 4-digit code"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          style={{ letterSpacing: '4px' }}
        />
        <div className="text-xs text-muted mt-1 flex justify-between">
          <span>Ask customer for delivery PIN</span>
          <button
            type="button"
            className="text-primary font-semibold"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' }}
            onClick={() => setOtp(order.otpCode || '4291')}
          >
            Auto-fill demo PIN ({order.otpCode || '4291'})
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="alert alert-danger mb-3 p-2 text-xs flex items-center gap-1">
          <ShieldAlert size={14} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleVerify}
        >
          <CheckCircle2 size={16} />
          <span>Confirm Delivery & Seal Handover</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-block btn-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
