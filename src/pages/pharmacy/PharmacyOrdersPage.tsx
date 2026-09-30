import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Search, Filter, Eye, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { OrderStatus } from '../../types';

export const PharmacyOrdersPage: React.FC = () => {
  const { orders, setSelectedOrderId, setPharmacyView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.village.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' ||
      (statusFilter === 'RX_PENDING' && order.rxStatus === 'PENDING_VERIFICATION') ||
      (statusFilter === 'TO_PACK' && (order.status === 'STOCK_CONFIRMED' || order.status === 'PACKING')) ||
      (statusFilter === 'READY' && order.status === 'READY_FOR_DELIVERY') ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pharmacy-orders-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Order Pipeline Management</h2>
          <p className="text-xs text-muted">Complete audit of orders from village customer placement to doorstep confirmation</p>
        </div>
      </div>

      {/* Search & Tabs Filter */}
      <div className="card p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input text-xs"
            style={{ paddingLeft: '32px' }}
            placeholder="Search Order ID, Customer, or Village..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {[
            { id: 'ALL', label: 'All Orders' },
            { id: 'RX_PENDING', label: 'Rx Pending' },
            { id: 'TO_PACK', label: 'To Pack' },
            { id: 'READY', label: 'Ready for Rider' },
            { id: 'DELIVERED', label: 'Delivered' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`btn btn-sm ${statusFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '12px', padding: '4px 10px', minHeight: '32px' }}
              onClick={() => setStatusFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer & Village</th>
              <th>Items</th>
              <th>Prescription</th>
              <th>Order Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4 text-muted">
                  No orders matching criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                const rxBadgeVariant = 
                  order.rxStatus === 'APPROVED' ? 'success' :
                  order.rxStatus === 'PENDING_VERIFICATION' ? 'warning' :
                  order.rxStatus === 'REJECTED' ? 'danger' : 'info';

                return (
                  <tr key={order.id}>
                    <td className="font-bold text-primary">#{order.id}</td>
                    <td>
                      <div className="font-semibold">{order.customerName}</div>
                      <div className="text-xs text-muted">{order.deliveryAddress.village}</div>
                    </td>
                    <td>
                      <div className="text-xs font-medium">{order.items.length} product(s)</div>
                      <div className="text-xs text-muted truncate" style={{ maxWidth: '160px' }}>
                        {order.items.map(i => i.name).join(', ')}
                      </div>
                    </td>
                    <td>
                      <Badge variant={rxBadgeVariant}>
                        {order.rxStatus.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={order.status === 'DELIVERED' ? 'success' : 'info'}>
                        {order.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td>
                      <div className="text-xs font-semibold">₹{order.totalAmount}</div>
                      <div className="text-xs text-muted">{order.paymentMethod}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {order.rxStatus === 'PENDING_VERIFICATION' && (
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            style={{ padding: '3px 8px', fontSize: '11px', minHeight: '28px' }}
                            onClick={() => {
                              setSelectedOrderId(order.id);
                              setPharmacyView('prescriptions');
                            }}
                          >
                            Verify Rx
                          </button>
                        )}

                        {(order.status === 'STOCK_CONFIRMED' || order.status === 'PACKING') && (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            style={{ padding: '3px 8px', fontSize: '11px', minHeight: '28px' }}
                            onClick={() => {
                              setSelectedOrderId(order.id);
                              setPharmacyView('packing');
                            }}
                          >
                            Pack
                          </button>
                        )}

                        {order.status === 'READY_FOR_DELIVERY' && (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '3px 8px', fontSize: '11px', minHeight: '28px' }}
                            onClick={() => {
                              setSelectedOrderId(order.id);
                              setPharmacyView('assignment');
                            }}
                          >
                            Assign
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
