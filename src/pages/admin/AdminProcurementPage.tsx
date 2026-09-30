import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { FileSpreadsheet, CheckCircle2, AlertCircle, ShoppingCart, ArrowRight } from 'lucide-react';

export const AdminProcurementPage: React.FC = () => {
  const { procurement } = useApp();
  const [poGenerated, setPoGenerated] = useState<string | null>(null);

  const handleGeneratePO = () => {
    setPoGenerated(`Purchase Order #PO-2026-M09 generated successfully for 590 total packs across 5 manufacturers! Transmitted to licensed pharmaceutical distributors (Mock).`);
    setTimeout(() => setPoGenerated(null), 4000);
  };

  return (
    <div className="admin-procurement-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Demand-Driven Procurement Planning</h2>
          <p className="text-xs text-muted">Aggregated forecasting derived from registered chronic customer regular refill cycles</p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleGeneratePO}
        >
          <ShoppingCart size={16} />
          <span>Generate Mock Purchase Order (PO)</span>
        </button>
      </div>

      {poGenerated && (
        <div className="alert alert-success mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{poGenerated}</span>
        </div>
      )}

      {/* Prototype Disclaimer */}
      <div className="alert alert-info mb-4">
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        <span className="text-xs">
          <strong>Visual Prototype Notice:</strong> This screen demonstrates the demand-driven procurement concept where monthly chronic patient refills drive central bulk procurement from certified pharmaceutical manufacturers. No real forecasting algorithms or financial orders are implemented.
        </span>
      </div>

      {/* Procurement Table */}
      <div className="table-responsive mb-4">
        <table className="data-table">
          <thead>
            <tr>
              <th>Medicine Formulation</th>
              <th>Expected Refill Demand (Packs)</th>
              <th>Current Central Stock</th>
              <th>Safety Buffer Stock</th>
              <th>Suggested Procurement</th>
              <th>Est. Unit Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {procurement.map((item, idx) => (
              <tr key={idx}>
                <td className="font-semibold">{item.medicineName}</td>
                <td>
                  <span className="font-bold text-sm text-primary">{item.expectedDemand} packs</span>
                  <span className="text-xs text-muted block">Next 30-Day Cycle</span>
                </td>
                <td>
                  <span className="font-semibold">{item.currentStock} packs</span>
                </td>
                <td className="text-muted">{item.safetyStock} packs</td>
                <td>
                  <span className="font-bold text-base text-success">
                    +{item.suggestedProcurement} packs
                  </span>
                </td>
                <td className="text-xs">₹{item.unitCost}</td>
                <td>
                  <Badge variant={item.status === 'Approved' ? 'success' : 'warning'}>
                    {item.status}
                  </Badge>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '3px 8px', fontSize: '11px', minHeight: '26px' }}
                    onClick={() => alert(`Indent details for ${item.medicineName}: Derived from regular refills in Koregaon, Rahimatpur, and Wai blocks.`)}
                  >
                    Breakdown
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calculation Formula Explanation Card */}
      <div className="card p-4" style={{ background: '#f8fafc' }}>
        <h4 className="font-bold text-xs uppercase tracking-wide text-muted mb-2">Demand Formulation Logic</h4>
        <p className="text-xs text-secondary leading-relaxed">
          <code>Suggested Procurement = (Expected Scheduled Chronic Refills + Minimum Safety Stock Buffer) - Current Inventory On Hand</code>
          <br /><br />
          This guarantees rural medicine availability without capital lockup or stockouts in chronic treatments (Diabetes, Hypertension, Thyroid).
        </p>
      </div>
    </div>
  );
};
