import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    customerProfile, 
    placeOrder, 
    setCustomerView, 
    setSelectedOrderId, 
    t 
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE_MOCK'>('COD');
  const [deliverySlot, setDeliverySlot] = useState<string>('Tomorrow Morning 10 AM - 1 PM (Koregaon Route)');
  const [rxAttached, setRxAttached] = useState<boolean>(true);
  const [isPlacing, setIsPlacing] = useState(false);

  const hasRx = cart.some(item => item.medicine.requiresPrescription);
  const totalAmount = cart.reduce((acc, curr) => acc + curr.medicine.customerPrice * curr.quantity, 0);
  const totalMrp = cart.reduce((acc, curr) => acc + curr.medicine.mrp * curr.quantity, 0);

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      const orderId = placeOrder(paymentMethod, deliverySlot, rxAttached);
      setIsPlacing(false);
      setSelectedOrderId(orderId);
      setCustomerView('order_details');
    }, 700);
  };

  return (
    <div className="checkout-page">
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setCustomerView('cart')}
          style={{ padding: '6px' }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="font-bold text-xl">Order Checkout</h2>
          <span className="text-xs text-muted">Complete your doorstep delivery request</span>
        </div>
      </div>

      {/* Step 1: Delivery Address */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} color="var(--color-primary)" />
            <h3 className="font-bold text-sm">Delivery Destination</h3>
          </div>
          <span className="badge badge-success">Verified Village Route</span>
        </div>

        <div className="font-semibold text-sm">{customerProfile.name}</div>
        <div className="text-xs text-secondary mt-1">
          {customerProfile.landmark}, {customerProfile.village}, Taluka {customerProfile.taluka}, District {customerProfile.district} - {customerProfile.pincode}
        </div>
        <div className="text-xs text-muted mt-1">
          Contact: <strong>{customerProfile.phone}</strong>
        </div>
      </div>

      {/* Step 2: Scheduled Route Delivery Slot */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={16} color="var(--color-primary)" />
          <h3 className="font-bold text-sm">Select Delivery Window</h3>
        </div>

        <div className="flex flex-col gap-2">
          {[
            'Tomorrow Morning 10 AM - 1 PM (Koregaon Route)',
            'Tomorrow Afternoon 2 PM - 5 PM (Koregaon Route)',
            'Batch Wednesday Doorstep Dispatch'
          ].map((slot, idx) => (
            <label 
              key={idx}
              className="flex items-center gap-2 p-2 border rounded card-clickable text-xs"
              style={{
                borderColor: deliverySlot === slot ? 'var(--color-primary)' : 'var(--color-border)',
                background: deliverySlot === slot ? 'var(--color-primary-light)' : '#ffffff'
              }}
            >
              <input
                type="radio"
                name="slot"
                checked={deliverySlot === slot}
                onChange={() => setDeliverySlot(slot)}
              />
              <span className="font-medium">{slot}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Step 3: Prescription Attachment if Rx items present */}
      {hasRx && (
        <div className="card mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText size={16} color="var(--color-danger)" />
              <h3 className="font-bold text-sm">Prescription Verification</h3>
            </div>
            <span className="badge badge-rx">Mandatory</span>
          </div>

          <div className="p-3 rounded mb-2 flex items-center justify-between" style={{ background: '#f8fafc', border: '1px solid var(--color-border)' }}>
            <div>
              <div className="font-semibold text-xs">Attached: Prescription_Satara_Oct2026.pdf</div>
              <div className="text-xs text-muted">Dr. A. Kulkarni (Satara Civil Hospital)</div>
            </div>
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={rxAttached}
                onChange={e => setRxAttached(e.target.checked)}
              />
              <span>Attach to Order</span>
            </label>
          </div>

          <p className="text-xs text-muted">
            The licensed pharmacy will verify this prescription prior to allocating items from inventory.
          </p>
        </div>
      )}

      {/* Step 4: Payment Method (Mock Only) */}
      <div className="card mb-4">
        <h3 className="font-bold text-sm mb-3">Payment Method</h3>

        <div className="flex flex-col gap-2">
          <label 
            className="flex items-center gap-3 p-3 border rounded card-clickable"
            style={{ 
              borderColor: paymentMethod === 'COD' ? 'var(--color-primary)' : 'var(--color-border)',
              background: paymentMethod === 'COD' ? 'var(--color-primary-light)' : '#ffffff'
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === 'COD'}
              onChange={() => setPaymentMethod('COD')}
            />
            <Banknote size={20} color="var(--color-primary)" />
            <div className="flex-1">
              <span className="font-semibold text-sm block">Cash on Delivery (COD)</span>
              <span className="text-xs text-muted">Pay cash when package arrives at your home.</span>
            </div>
          </label>

          <label 
            className="flex items-center gap-3 p-3 border rounded card-clickable"
            style={{ 
              borderColor: paymentMethod === 'ONLINE_MOCK' ? 'var(--color-primary)' : 'var(--color-border)',
              background: paymentMethod === 'ONLINE_MOCK' ? 'var(--color-primary-light)' : '#ffffff'
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === 'ONLINE_MOCK'}
              onChange={() => setPaymentMethod('ONLINE_MOCK')}
            />
            <CreditCard size={20} color="var(--color-secondary)" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">UPI / Online Payment (Mock)</span>
                <span className="badge badge-info" style={{ fontSize: '9px' }}>Demo Gateway</span>
              </div>
              <span className="text-xs text-muted">Simulate instant UPI prepaid verification.</span>
            </div>
          </label>
        </div>
      </div>

      {/* Step 5: Summary */}
      <div className="card mb-4">
        <h4 className="font-bold text-sm mb-2">Order Price Summary</h4>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted">Total MRP:</span>
            <span>₹{totalMrp}</span>
          </div>
          <div className="flex justify-between text-success">
            <span>Direct Platform Discount:</span>
            <span>- ₹{totalMrp - totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Rural Delivery Fee:</span>
            <span className="text-success font-semibold">FREE</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <span>Final Amount:</span>
            <span className="text-primary">₹{totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handlePlaceOrder}
          disabled={isPlacing || (hasRx && !rxAttached)}
        >
          {isPlacing ? (
            <span>Placing Demo Order...</span>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>{t('placeOrder')} (₹{totalAmount})</span>
            </>
          )}
        </button>

        {hasRx && !rxAttached && (
          <p className="text-xs text-danger text-center mt-2">
            Please attach prescription before placing order with Rx medicines.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted">
        <ShieldCheck size={14} color="var(--color-primary)" />
        <span>Fulfillment: Licensed central hub • Trained delivery boy with sealed tamper bag.</span>
      </div>
    </div>
  );
};
