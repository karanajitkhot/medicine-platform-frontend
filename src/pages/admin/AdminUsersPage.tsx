import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Users, Truck, Stethoscope, Search, ShieldCheck } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { customerProfile, deliveryBoys } = useApp();
  const [tab, setTab] = useState<'CUSTOMERS' | 'RIDERS' | 'PHARMACY'>('CUSTOMERS');

  const demoCustomers = [
    { id: 'cust-101', name: customerProfile.name, phone: customerProfile.phone, village: customerProfile.village, taluka: customerProfile.taluka, activeOrders: 1 },
    { id: 'cust-102', name: 'Suresh Deshmukh', phone: '+91 98221 65432', village: 'Rahimatpur Gaon', taluka: 'Koregaon', activeOrders: 1 },
    { id: 'cust-103', name: 'Anita Shankar Ghorpade', phone: '+91 97632 10987', village: 'Pimpode Budruk', taluka: 'Koregaon', activeOrders: 1 },
    { id: 'cust-104', name: 'Mahadev Jadhav', phone: '+91 94220 11223', village: 'Kumthe', taluka: 'Koregaon', activeOrders: 1 }
  ];

  const pharmacyStaff = [
    { id: 'ph-01', name: 'Dr. Rahul Deshmukh', role: 'Chief Registered Pharmacist (Reg #MH-4921)', hub: 'Satara Central Fulfillment Hub' },
    { id: 'ph-02', name: 'Kavita Salunkhe', role: 'Dispensing & Quality Technician', hub: 'Satara Central Fulfillment Hub' }
  ];

  return (
    <div className="admin-users-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Network Directory & Role Management</h2>
          <p className="text-xs text-muted">Beneficiaries, delivery fleet, and licensed pharmacist personnel</p>
        </div>
      </div>

      <div className="card p-3 mb-4 flex gap-2">
        <button
          type="button"
          className={`btn btn-sm ${tab === 'CUSTOMERS' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setTab('CUSTOMERS')}
        >
          <Users size={14} />
          <span>Village Customers ({demoCustomers.length})</span>
        </button>

        <button
          type="button"
          className={`btn btn-sm ${tab === 'RIDERS' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setTab('RIDERS')}
        >
          <Truck size={14} />
          <span>Delivery Fleet ({deliveryBoys.length})</span>
        </button>

        <button
          type="button"
          className={`btn btn-sm ${tab === 'PHARMACY' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setTab('PHARMACY')}
        >
          <Stethoscope size={14} />
          <span>Pharmacy Staff ({pharmacyStaff.length})</span>
        </button>
      </div>

      {tab === 'CUSTOMERS' && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Full Name</th>
                <th>Contact</th>
                <th>Village & Taluka</th>
                <th>Active Orders</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {demoCustomers.map(c => (
                <tr key={c.id}>
                  <td className="font-mono text-xs">{c.id}</td>
                  <td className="font-semibold">{c.name}</td>
                  <td className="text-xs">{c.phone}</td>
                  <td className="text-xs">{c.village}, Tal. {c.taluka}</td>
                  <td>
                    <Badge variant="info">{c.activeOrders} Active</Badge>
                  </td>
                  <td>
                    <span className="badge badge-success">KYC Verified</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'RIDERS' && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rider ID</th>
                <th>Rider Name</th>
                <th>Phone</th>
                <th>Assigned Route</th>
                <th>Vehicle</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveryBoys.map(r => (
                <tr key={r.id}>
                  <td className="font-mono text-xs">{r.id}</td>
                  <td className="font-semibold">{r.name}</td>
                  <td className="text-xs">{r.phone}</td>
                  <td className="text-xs">{r.assignedRoute}</td>
                  <td className="text-xs text-muted">{r.vehicleType}</td>
                  <td>
                    <Badge variant={r.status === 'AVAILABLE' ? 'success' : 'warning'}>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'PHARMACY' && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Designation & License</th>
                <th>Assigned Hub</th>
                <th>Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              {pharmacyStaff.map(p => (
                <tr key={p.id}>
                  <td className="font-mono text-xs">{p.id}</td>
                  <td className="font-semibold">{p.name}</td>
                  <td className="text-xs">{p.role}</td>
                  <td className="text-xs">{p.hub}</td>
                  <td>
                    <Badge variant="success">Active Licensed</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
