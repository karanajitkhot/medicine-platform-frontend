import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { 
  ClipboardList, 
  FileCheck, 
  Box, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Stethoscope
} from 'lucide-react';

export const PharmacyDashboardPage: React.FC = () => {
  const { orders, inventory, setPharmacyView, setSelectedOrderId } = useApp();

  const newOrders = orders.filter(o => o.status === 'PLACED');
  const pendingRx = orders.filter(o => o.rxStatus === 'PENDING_VERIFICATION');
  const packingOrders = orders.filter(o => o.status === 'STOCK_CONFIRMED' || o.status === 'PACKING');
  const readyOrders = orders.filter(o => o.status === 'READY_FOR_DELIVERY');
  const lowStockItems = inventory.filter(i => i.status === 'LOW_STOCK' || i.availableQuantity <= i.safetyStock);

  return (
    <div className="pharmacy-dashboard">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Licensed Pharmacy Hub Operations</h2>
          <p className="text-xs text-muted">Satara Central Fulfillment Hub #01 • Pharmacist in Charge: Dr. R. Deshmukh, Reg. #MH-4921</p>
        </div>
        <Badge variant="success">FSSAI & CDSCO Compliant</Badge>
      </div>

      {/* KPI Cards Grid */}
      <div className="stat-grid mb-6">
        <div 
          className="stat-card card-clickable" 
          onClick={() => setPharmacyView('orders')}
          style={{ borderLeft: '4px solid var(--color-primary)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            <ClipboardList size={24} />
          </div>
          <div>
            <div className="stat-val">{newOrders.length}</div>
            <div className="stat-lbl">New Orders</div>
          </div>
        </div>

        <div 
          className="stat-card card-clickable" 
          onClick={() => setPharmacyView('prescriptions')}
          style={{ borderLeft: '4px solid var(--color-warning)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>
            <FileCheck size={24} />
          </div>
          <div>
            <div className="stat-val">{pendingRx.length}</div>
            <div className="stat-lbl">Pending Rx Verification</div>
          </div>
        </div>

        <div 
          className="stat-card card-clickable" 
          onClick={() => setPharmacyView('packing')}
          style={{ borderLeft: '4px solid var(--color-secondary)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-secondary-light)', color: 'var(--color-secondary)' }}>
            <Box size={24} />
          </div>
          <div>
            <div className="stat-val">{packingOrders.length}</div>
            <div className="stat-lbl">In Packing Queue</div>
          </div>
        </div>

        <div 
          className="stat-card card-clickable" 
          onClick={() => setPharmacyView('assignment')}
          style={{ borderLeft: '4px solid var(--color-info)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
            <Truck size={24} />
          </div>
          <div>
            <div className="stat-val">{readyOrders.length}</div>
            <div className="stat-lbl">Ready for Rider Dispatch</div>
          </div>
        </div>

        <div 
          className="stat-card card-clickable" 
          onClick={() => setPharmacyView('inventory')}
          style={{ borderLeft: '4px solid var(--color-danger)' }}
        >
          <div className="stat-icon-wrapper" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="stat-val">{lowStockItems.length}</div>
            <div className="stat-lbl">Low Stock Alerts</div>
          </div>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-2 gap-4">
        {/* Urgent Actions: Pending Rx */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <FileCheck size={18} color="var(--color-warning)" />
              <h3 className="font-bold text-base">Prescription Review Queue</h3>
            </div>
            <button
              type="button"
              className="text-xs text-primary font-semibold"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setPharmacyView('prescriptions')}
            >
              View Queue ({pendingRx.length}) →
            </button>
          </div>

          {pendingRx.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted" style={{ background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
              <CheckCircle2 size={24} color="var(--color-success)" style={{ margin: '0 auto 0.5rem' }} />
              All uploaded prescriptions verified and approved!
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {pendingRx.map(order => (
                <div key={order.id} className="p-3 border rounded flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
                  <div>
                    <div className="font-semibold text-sm">Order #{order.id} • {order.customerName}</div>
                    <div className="text-xs text-muted">Village {order.deliveryAddress.village} • {order.items.length} item(s)</div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setPharmacyView('prescriptions');
                    }}
                  >
                    Verify Rx
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ready to Pack Queue */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Box size={18} color="var(--color-secondary)" />
              <h3 className="font-bold text-base">Packing Station</h3>
            </div>
            <button
              type="button"
              className="text-xs text-primary font-semibold"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setPharmacyView('packing')}
            >
              Open Packing ({packingOrders.length}) →
            </button>
          </div>

          {packingOrders.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted" style={{ background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
              No orders waiting for packaging.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {packingOrders.map(order => (
                <div key={order.id} className="p-3 border rounded flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
                  <div>
                    <div className="font-semibold text-sm">Order #{order.id} • {order.customerName}</div>
                    <div className="text-xs text-muted">Route: {order.deliveryAddress.village} ({order.deliverySlot})</div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setPharmacyView('packing');
                    }}
                  >
                    Pack Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
