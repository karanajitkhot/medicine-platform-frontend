import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { 
  CalendarClock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Truck,
  CreditCard
} from 'lucide-react';

export const RefillReviewPage: React.FC = () => {
  const { 
    regularMedicines, 
    customerProfile, 
    confirmRefillOrder, 
    setCustomerView,
    setSelectedOrderId
  } = useApp();

  const [paymentOption, setPaymentOption] = useState<'COD' | 'ONLINE_MOCK'>('COD');
  const [isProcessing, setIsProcessing] = useState(false);

  const activeItems = regularMedicines.filter(m => m.status === 'Active');

  const totalAmount = activeItems.reduce((acc, curr) => acc + curr.customerPrice * curr.quantity, 0);
  const totalMrp = Math.round(totalAmount * 1.3);
  const savings = totalMrp - totalAmount;

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrderId = confirmRefillOrder(activeItems);
      setIsProcessing(false);
      setSelectedOrderId(newOrderId);
      setCustomerView('order_details');
    }, 800);
  };

  return (
    <div className="refill-review-page">
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setCustomerView('regular')}
          style={{ padding: '6px' }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="font-bold text-xl">Review Refill Order</h2>
          <span className="text-xs text-muted">Scheduled cycle for 10 Oct 2026</span>
        </div>
      </div>

      <div className="alert alert-info mb-4">
        <CalendarClock size={18} style={{ flexShrink: 0 }} />
        <span className="text-xs">
          Please review the medicines below. Clicking <strong>Confirm & Place Order</strong> will transmit your verified request to the licensed pharmacy hub for batch preparation.
        </span>
      </div>

      {/* Medicines to be dispatched */}
      <div className="card mb-4">
        <h3 className="font-bold text-sm mb-3">Medicines for This Scheduled Refill</h3>

        <div className="flex flex-col gap-3">
          {activeItems.map(item => (
            <div 
              key={item.id} 
              className="p-3 border rounded flex justify-between items-center"
              style={{ borderColor: 'var(--color-border)', background: '#ffffff' }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{item.medicineName}</span>
                  {item.requiresPrescription && <Badge variant="rx">Rx</Badge>}
                </div>
                <div className="text-xs text-muted mt-1">
                  {item.strength} • {item.packSize}
                </div>
                <div className="text-xs font-semibold text-primary mt-1">
                  Qty: {item.quantity} pack(s)
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-base">₹{item.customerPrice * item.quantity}</span>
                <span className="text-xs text-muted block">₹{item.customerPrice} / pack</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doorstep Delivery Address */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} color="var(--color-primary)" />
            <h3 className="font-bold text-sm">Delivery Destination</h3>
          </div>
          <span className="badge badge-success" style={{ fontSize: '10px' }}>Default Rural Address</span>
        </div>

        <div className="text-sm font-semibold">{customerProfile.name}</div>
        <div className="text-xs text-muted mt-1">
          {customerProfile.landmark}, {customerProfile.village}, Taluka {customerProfile.taluka}, District {customerProfile.district} - {customerProfile.pincode}
        </div>
        <div className="text-xs text-muted mt-1">
          Contact: <strong>{customerProfile.phone}</strong>
        </div>

        <div className="p-2 rounded mt-3 flex items-center gap-2" style={{ background: 'var(--color-bg-subtle)' }}>
          <Truck size={14} color="var(--color-primary)" />
          <span className="text-xs font-medium">Village Route Scheduled Slot: <strong>Tomorrow 10:30 AM - 1:30 PM</strong></span>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="card mb-4">
        <h3 className="font-bold text-sm mb-3">Payment Method</h3>

        <div className="flex flex-col gap-2">
          <label 
            className="flex items-center gap-3 p-3 border rounded card-clickable"
            style={{ 
              borderColor: paymentOption === 'COD' ? 'var(--color-primary)' : 'var(--color-border)',
              background: paymentOption === 'COD' ? 'var(--color-primary-light)' : '#ffffff'
            }}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentOption === 'COD'}
              onChange={() => setPaymentOption('COD')}
            />
            <div className="flex-1">
              <span className="font-semibold text-sm block">Cash on Delivery (COD)</span>
              <span className="text-xs text-muted">Pay cash directly to the delivery rider upon package verification.</span>
            </div>
          </label>

          <label 
            className="flex items-center gap-3 p-3 border rounded card-clickable"
            style={{ 
              borderColor: paymentOption === 'ONLINE_MOCK' ? 'var(--color-primary)' : 'var(--color-border)',
              background: paymentOption === 'ONLINE_MOCK' ? 'var(--color-primary-light)' : '#ffffff'
            }}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentOption === 'ONLINE_MOCK'}
              onChange={() => setPaymentOption('ONLINE_MOCK')}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">UPI / QR / Online Payment</span>
                <span className="badge badge-info" style={{ fontSize: '9px' }}>Mock Gateway</span>
              </div>
              <span className="text-xs text-muted">Pay via GPay, PhonePe, or BHIM (Simulated for Prototype).</span>
            </div>
          </label>
        </div>
      </div>

      {/* Price Summary Breakdown */}
      <div className="card mb-4">
        <h3 className="font-bold text-sm mb-3">Order Price Summary</h3>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Total MRP:</span>
            <span>₹{totalMrp}</span>
          </div>
          <div className="flex justify-between text-success">
            <span>Direct-to-Customer Discount:</span>
            <span>- ₹{savings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Village Scheduled Delivery:</span>
            <span className="text-success font-semibold">FREE</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <span>Total Payable:</span>
            <span className="text-primary">₹{totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleConfirmOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span>Processing Order...</span>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>Confirm Order (₹{totalAmount})</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={() => {
            alert('Refill reminder snoozed. We will prompt you again in 48 hours.');
            setCustomerView('home');
          }}
        >
          Remind Me Later
        </button>
      </div>

      <div className="flex items-center justify-center gap-1 text-xs text-muted">
        <ShieldCheck size={14} color="var(--color-primary)" />
        <span>Dispensed by licensed registered pharmacist from certified hub.</span>
      </div>
    </div>
  );
};
