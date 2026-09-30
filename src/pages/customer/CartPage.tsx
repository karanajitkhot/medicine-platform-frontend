import React from 'react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/common/Badge';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, ShieldAlert } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, setCustomerView, t } = useApp();

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = cart.reduce((acc, curr) => acc + curr.medicine.customerPrice * curr.quantity, 0);
  const totalMrp = cart.reduce((acc, curr) => acc + curr.medicine.mrp * curr.quantity, 0);
  const totalSavings = totalMrp - totalAmount;

  const requiresPrescription = cart.some(item => item.medicine.requiresPrescription);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setCustomerView('home')}
            style={{ padding: '6px' }}
          >
            <ArrowLeft size={16} />
          </button>
          <h2 className="font-bold text-xl">Shopping Cart</h2>
        </div>

        <EmptyState
          icon={<ShoppingBag size={48} />}
          title="Your Cart is Empty"
          description="You don't have any medicines in your cart yet. Search or browse our catalog to add doorstep medicines."
          actionText="Search Medicines"
          onAction={() => setCustomerView('search')}
        />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setCustomerView('home')}
            style={{ padding: '6px' }}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="font-bold text-xl">Shopping Cart</h2>
            <span className="text-xs text-muted">{totalItems} item(s) selected</span>
          </div>
        </div>

        <button
          type="button"
          className="text-xs text-primary font-semibold"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setCustomerView('search')}
        >
          + Add More
        </button>
      </div>

      {requiresPrescription && (
        <div className="alert alert-warning mb-3">
          <ShieldAlert size={18} style={{ flexShrink: 0 }} />
          <span className="text-xs">
            Your cart contains <strong>Prescription (Rx)</strong> medicines. You will be prompted to attach your doctor's prescription during checkout.
          </span>
        </div>
      )}

      {/* Cart items list */}
      <div className="flex flex-col gap-3 mb-4">
        {cart.map(item => {
          const med = item.medicine;
          const itemTotal = med.customerPrice * item.quantity;
          const itemMrpTotal = med.mrp * item.quantity;

          return (
            <div key={med.id} className="card p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm">{med.name}</h4>
                    {med.requiresPrescription ? (
                      <Badge variant="rx">Rx</Badge>
                    ) : (
                      <span className="badge badge-success" style={{ fontSize: '10px' }}>OTC</span>
                    )}
                  </div>
                  <div className="text-xs text-muted mt-1">{med.strength} • {med.packSize}</div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ color: 'var(--color-danger)', padding: '4px 6px', minHeight: '30px' }}
                  onClick={() => removeFromCart(med.id)}
                  title="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                {/* Quantity Controls */}
                <div className="flex items-center border rounded" style={{ overflow: 'hidden' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => updateCartQuantity(med.id, item.quantity - 1)}
                    style={{ borderRadius: 0, width: '32px', minHeight: '32px', padding: 0 }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '36px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => updateCartQuantity(med.id, item.quantity + 1)}
                    style={{ borderRadius: 0, width: '32px', minHeight: '32px', padding: 0 }}
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="font-bold text-base text-primary">₹{itemTotal}</span>
                    <span className="text-xs text-muted" style={{ textDecoration: 'line-through' }}>₹{itemMrpTotal}</span>
                  </div>
                  <span className="text-xs text-success font-semibold">
                    Saved ₹{itemMrpTotal - itemTotal}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bill Breakdown Card */}
      <div className="card mb-4">
        <h4 className="font-bold text-sm mb-3">Bill Details</h4>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Total MRP:</span>
            <span>₹{totalMrp}</span>
          </div>
          <div className="flex justify-between text-success">
            <span>Direct Platform Savings:</span>
            <span>- ₹{totalSavings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Village Route Delivery:</span>
            <span className="text-success font-semibold">FREE</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <span>To Pay:</span>
            <span className="text-primary">₹{totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mb-6">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => setCustomerView('checkout')}
        >
          <span>{t('proceedCheckout')} (₹{totalAmount})</span>
          <ArrowRight size={16} />
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={() => setCustomerView('search')}
        >
          {t('continueShopping')}
        </button>
      </div>
    </div>
  );
};
