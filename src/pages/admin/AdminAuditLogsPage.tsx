import React from 'react';
import { Badge } from '../../components/common/Badge';
import { ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const auditLogs = [
    { id: 'LOG-8812', timestamp: '28 Sep 2026, 12:45 PM', event: 'Order Handover Completed', details: 'Order #DEMO-0985 marked Delivered by Rider Ganesh Shinde after OTP verification.', user: 'Rider Ganesh (ID: db-01)', severity: 'INFO' },
    { id: 'LOG-8811', timestamp: '28 Sep 2026, 11:40 AM', event: 'Delivery Assignment', details: 'Order #DEMO-1001 assigned to Route 4 Rider Ganesh Shinde.', user: 'Pharmacist R. Deshmukh', severity: 'INFO' },
    { id: 'LOG-8810', timestamp: '28 Sep 2026, 11:20 AM', event: 'Tamper Barcode Affixed', details: 'Order #DEMO-1001 sealed in Tamper Barcode Bag SEAL-4491-KRG.', user: 'Pharmacist R. Deshmukh', severity: 'INFO' },
    { id: 'LOG-8809', timestamp: '28 Sep 2026, 10:45 AM', event: 'Prescription Verified', details: 'Prescription #sample_prescription_dr_kulkarni.pdf verified and approved under MCI-2012-08492.', user: 'Chief Pharmacist R. Deshmukh', severity: 'COMPLIANCE' },
    { id: 'LOG-8808', timestamp: '28 Sep 2026, 10:15 AM', event: 'Refill Order Created', details: 'Customer Ramesh Patil confirmed monthly refill Order #DEMO-1001 for GlucoCare & CardioPress.', user: 'Customer (cust-101)', severity: 'INFO' },
    { id: 'LOG-8807', timestamp: '27 Sep 2026, 04:30 PM', event: 'Batch Stock Received', details: '100 packs of Batch LOT-TEL-4412 added to central inventory with expiry 05/2028.', user: 'Inventory Admin', severity: 'INVENTORY' }
  ];

  return (
    <div className="admin-audit-logs-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Regulatory Audit Trail & Event Logs</h2>
          <p className="text-xs text-muted">Immutable timestamped logs for CDSCO and state drug controller compliance</p>
        </div>
        <span className="badge badge-success">Audit Integrity: 100% Intact</span>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Timestamp</th>
              <th>Event Category</th>
              <th>Details & Traceability</th>
              <th>Action By</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map(log => (
              <tr key={log.id}>
                <td className="font-mono text-xs text-primary font-bold">{log.id}</td>
                <td className="text-xs text-muted" style={{ whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                <td className="font-semibold text-xs">{log.event}</td>
                <td className="text-xs text-secondary leading-relaxed">{log.details}</td>
                <td className="text-xs font-medium">{log.user}</td>
                <td>
                  <Badge variant={log.severity === 'COMPLIANCE' ? 'success' : 'info'}>
                    {log.severity}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
