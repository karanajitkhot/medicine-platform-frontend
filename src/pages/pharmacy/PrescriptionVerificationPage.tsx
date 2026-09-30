import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { 
  FileCheck, 
  Check, 
  X, 
  HelpCircle, 
  ShieldAlert, 
  User, 
  Calendar, 
  Building2, 
  FileText,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const PrescriptionVerificationPage: React.FC = () => {
  const { orders, selectedOrderId, setSelectedOrderId, verifyPrescription, setPharmacyView } = useApp();
  const [rejectReason, setRejectReason] = useState('Prescription expired (validity exceeded 6 months)');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [clarificationSent, setClarificationSent] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Orders that need verification or all orders
  const pendingOrders = orders.filter(o => o.rxStatus === 'PENDING_VERIFICATION');
  const currentOrder = orders.find(o => o.id === selectedOrderId) || pendingOrders[0] || orders[0];

  const handleApprove = () => {
    if (!currentOrder) return;
    verifyPrescription(currentOrder.id, true);
    setActionNotice(`Prescription for Order #${currentOrder.id} Approved by Pharmacist! Order moved to batch preparation.`);
    setTimeout(() => {
      setActionNotice(null);
      setPharmacyView('packing');
    }, 1500);
  };

  const handleRejectConfirm = () => {
    if (!currentOrder) return;
    verifyPrescription(currentOrder.id, false, rejectReason);
    setShowRejectModal(false);
    setActionNotice(`Prescription for Order #${currentOrder.id} Rejected: "${rejectReason}". Customer alerted.`);
    setTimeout(() => setActionNotice(null), 2500);
  };

  const handleClarification = () => {
    setClarificationSent(true);
    setActionNotice(`Clarification query sent via automated SMS to ${currentOrder.customerPhone}.`);
    setTimeout(() => {
      setClarificationSent(false);
      setActionNotice(null);
    }, 3000);
  };

  if (!currentOrder) {
    return (
      <div className="card p-6 text-center">
        <CheckCircle2 size={40} color="var(--color-success)" style={{ margin: '0 auto 0.5rem' }} />
        <h3 className="font-bold text-lg">No Pending Prescriptions</h3>
        <p className="text-xs text-muted mt-1">All customer orders have been verified and cleared.</p>
        <button
          type="button"
          className="btn btn-secondary btn-sm mt-3"
          onClick={() => setPharmacyView('orders')}
        >
          Return to Orders Pipeline
        </button>
      </div>
    );
  }

  return (
    <div className="prescription-verification-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Pharmacist Prescription Audit</h2>
          <p className="text-xs text-muted">Mandatory verification under Drugs & Cosmetics Rules • Order #{currentOrder.id}</p>
        </div>

        {/* Dropdown selector if multiple pending */}
        {pendingOrders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted font-medium">Switch Order:</span>
            <select
              className="form-select text-xs"
              value={currentOrder.id}
              onChange={e => setSelectedOrderId(e.target.value)}
              style={{ padding: '4px 8px' }}
            >
              {pendingOrders.map(o => (
                <option key={o.id} value={o.id}>
                  #{o.id} - {o.customerName} ({o.deliveryAddress.village})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {actionNotice && (
        <div className="alert alert-success mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Split View */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Scanned Document Simulation */}
        <div className="card p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <FileText size={18} color="var(--color-primary)" />
              <h3 className="font-bold text-base">Prescription Scan (Simulated)</h3>
            </div>
            <span className="badge badge-info" style={{ fontSize: '10px' }}>High Resolution</span>
          </div>

          {/* Realistic Medical Prescription Mockup Card */}
          <div 
            className="p-4 border rounded" 
            style={{ 
              background: '#fffdfa', 
              borderColor: '#e2e8f0', 
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)',
              fontFamily: 'serif' 
            }}
          >
            {/* Doctor Clinic Header */}
            <div className="border-b pb-2 mb-3 text-center" style={{ borderColor: '#cbd5e1' }}>
              <h4 className="font-bold text-base text-main" style={{ fontFamily: 'var(--font-sans)' }}>
                DR. ANAND KULKARNI, M.D. (Medicine)
              </h4>
              <p className="text-xs text-muted" style={{ fontFamily: 'var(--font-sans)' }}>
                Reg. No: <strong>MCI-2012-08492</strong> • Satara Civil Hospital Road, Satara
              </p>
              <p className="text-xs text-muted" style={{ fontFamily: 'var(--font-sans)' }}>
                Consultation Date: <strong>24 Sep 2026</strong>
              </p>
            </div>

            {/* Patient Header */}
            <div className="grid grid-cols-2 text-xs mb-3 pb-2 border-b" style={{ borderColor: '#e2e8f0', fontFamily: 'var(--font-sans)' }}>
              <div>
                <span className="text-muted">Patient: </span>
                <strong>{currentOrder.customerName}</strong>
              </div>
              <div className="text-right">
                <span className="text-muted">Age/Gender: </span>
                <strong>48 Y / Male</strong>
              </div>
              <div className="mt-1">
                <span className="text-muted">Diagnosis Demo: </span>
                <span>Type 2 Diabetes Mellitus & Essential HTN</span>
              </div>
              <div className="text-right mt-1">
                <span className="text-muted">Prescription Validity: </span>
                <span className="text-success font-semibold">Valid (6 Months)</span>
              </div>
            </div>

            {/* Prescribed Items Symbol Rx */}
            <div style={{ fontFamily: 'var(--font-sans)' }}>
              <div className="font-bold text-lg mb-2 text-primary">℞</div>
              <ol className="text-xs font-medium" style={{ paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>Tab. Metformin HCl 500mg — 1 tablet twice daily after meals (M/E) x 90 days.</li>
                <li>Tab. Telmisartan 40mg — 1 tablet once daily in the morning x 90 days.</li>
                <li>Cap. Omeprazole 20mg — 1 capsule SOS before breakfast for acidity.</li>
              </ol>
            </div>

            {/* Doctor Signature Stamp */}
            <div className="mt-6 pt-3 border-t flex justify-end" style={{ borderColor: '#cbd5e1', fontFamily: 'var(--font-sans)' }}>
              <div className="text-center" style={{ width: '160px' }}>
                <div style={{ height: '30px', fontStyle: 'italic', color: '#1e3a8a', fontWeight: 'bold' }}>
                  A. Kulkarni MD
                </div>
                <div className="border-t text-xs text-muted" style={{ borderColor: '#64748b' }}>
                  Registered Medical Practitioner Stamp
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-muted text-center">
            * Dummy simulated document for UI demonstration. No real patient data.
          </div>
        </div>

        {/* Right: Verification Check & Order Matching */}
        <div className="card p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-base">Items in Customer Order</h3>
              <Badge variant={currentOrder.rxStatus === 'APPROVED' ? 'success' : 'warning'}>
                Rx Status: {currentOrder.rxStatus}
              </Badge>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="p-3 border rounded flex justify-between items-center text-xs" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <div>
                    <div className="font-semibold text-sm">{item.name} ({item.strength})</div>
                    <div className="text-muted">Pack: {item.packSize} • Qty Ordered: <strong>{item.quantity}</strong></div>
                  </div>
                  <div>
                    {item.requiresPrescription ? (
                      <span className="badge badge-success" style={{ fontSize: '10px' }}>
                        Matches ℞ Item
                      </span>
                    ) : (
                      <span className="badge badge-info" style={{ fontSize: '10px' }}>
                        OTC Product
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pharmacist Checklist */}
            <div className="p-3 rounded mb-4" style={{ background: '#f8fafc', border: '1px solid var(--color-border)' }}>
              <h4 className="font-semibold text-xs mb-2 uppercase tracking-wide">Pharmacist Verification Checklist</h4>
              <div className="flex flex-col gap-2 text-xs">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span>Prescription has valid doctor registration number and signature</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span>Patient name and address correspond to registered customer profile</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span>Dosage strengths and quantities fall within prescribed course duration</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleApprove}
              >
                <Check size={18} />
                <span>Approve Prescription & Confirm Stock</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleClarification}
                  disabled={clarificationSent}
                >
                  <HelpCircle size={14} />
                  <span>Request Clarification</span>
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => setShowRejectModal(true)}
                >
                  <X size={14} />
                  <span>Reject Prescription</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="modal-backdrop" onClick={() => setShowRejectModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="font-bold text-base">Select Rejection Reason</h3>
            </div>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label className="form-label text-xs">Regulatory Rejection Reason</label>
                <select
                  className="form-select"
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                >
                  <option value="Prescription expired (validity exceeded 6 months)">Prescription expired (validity exceeded 6 months)</option>
                  <option value="Doctor registration number illegible or missing">Doctor registration number illegible or missing</option>
                  <option value="Patient name does not match order beneficiary">Patient name does not match order beneficiary</option>
                  <option value="Dosage strength does not match medicine ordered">Dosage strength does not match medicine ordered</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowRejectModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger btn-sm" onClick={handleRejectConfirm}>
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
