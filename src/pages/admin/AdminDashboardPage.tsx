import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  AlertTriangle, 
  FileCheck, 
  TrendingUp, 
  ShieldCheck,
  Building2,
  CalendarClock
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { orders, deliveryBoys, inventory, setAdminView } = useApp();

  const totalCustomers = 1240;
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const completedOrdersCount = 892 + orders.filter(o => o.status === 'DELIVERED').length;
  const activeDeliveryBoys = deliveryBoys.length;
  const lowStockAlerts = inventory.filter(i => i.status === 'LOW_STOCK' || i.availableQuantity <= i.safetyStock).length;
  const pendingRxCount = orders.filter(o => o.rxStatus === 'PENDING_VERIFICATION').length;

  return (
    <div className="admin-dashboard-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Executive Administration & Oversight</h2>
          <p className="text-xs text-muted">Network Operations • Maharashtra Rural Division #01</p>
        </div>
        <span className="badge badge-success">System Operational (Localhost Prototype)</span>
      </div>

      {/* KPI Stats Grid */}
      <div className="stat-grid mb-6">
        <div 
          className="stat-card card-clickable" 
          onClick={() => setAdminView('users')}
          style={{ borderLeft: '4px solid var(--color-primary)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="stat-val">{totalCustomers.toLocaleString()}</div>
            <div className="stat-lbl">Registered Beneficiaries</div>
          </div>
        </div>

        <div 
          className="stat-card card-clickable" 
          onClick={() => setAdminView('orders')}
          style={{ borderLeft: '4px solid var(--color-info)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div className="stat-val">{activeOrdersCount}</div>
            <div className="stat-lbl">Active Orders</div>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid var(--color-success)' }}>
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="stat-val">{completedOrdersCount}</div>
            <div className="stat-lbl">Completed Deliveries</div>
          </div>
        </div>

        <div 
          className="stat-card card-clickable" 
          onClick={() => setAdminView('users')}
          style={{ borderLeft: '4px solid #0284c7' }}
        >
          <div className="stat-icon-wrapper" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Truck size={24} />
          </div>
          <div>
            <div className="stat-val">{activeDeliveryBoys}</div>
            <div className="stat-lbl">Active Route Riders</div>
          </div>
        </div>

        <div 
          className="stat-card card-clickable" 
          onClick={() => setAdminView('inventory')}
          style={{ borderLeft: '4px solid var(--color-danger)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="stat-val">{lowStockAlerts}</div>
            <div className="stat-lbl">Inventory Alerts</div>
          </div>
        </div>

        <div 
          className="stat-card card-clickable" 
          onClick={() => setAdminView('orders')}
          style={{ borderLeft: '4px solid var(--color-warning)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>
            <FileCheck size={24} />
          </div>
          <div>
            <div className="stat-val">{pendingRxCount}</div>
            <div className="stat-lbl">Pending Rx Audit</div>
          </div>
        </div>
      </div>

      {/* Analytics Highlights */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-base">Chronic Refill Retention Rate</h3>
            <span className="badge badge-success">94.2% On-Time</span>
          </div>
          <p className="text-xs text-muted mb-3">
            Proportion of registered patients whose diabetes & hypertension refills were delivered before scheduled due date.
          </p>
          <div className="p-3 rounded text-xs flex justify-between" style={{ background: 'var(--color-bg-subtle)' }}>
            <div>
              <span className="text-muted block">Satara Hub Active Batches:</span>
              <span className="font-bold text-sm">48 Formulations</span>
            </div>
            <div>
              <span className="text-muted block">Scheduled Routes:</span>
              <span className="font-bold text-sm">7 Rural Belts</span>
            </div>
          </div>
        </div>

        <div 
          className="card p-4 card-clickable" 
          onClick={() => setAdminView('procurement')}
          style={{ border: '2px solid var(--color-primary-border)', background: 'var(--color-primary-light)' }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-base text-primary">Demand-Driven Procurement</h3>
            <span className="badge badge-success">Action Recommended</span>
          </div>
          <p className="text-xs text-secondary mb-3">
            3 formulations require purchase order generation based on upcoming monthly customer refill commitments.
          </p>
          <span className="font-bold text-xs text-primary">Open Demand Procurement Planning →</span>
        </div>
      </div>
    </div>
  );
};
