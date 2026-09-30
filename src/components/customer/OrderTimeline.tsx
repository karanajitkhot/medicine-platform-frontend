import React from 'react';
import { Order } from '../../types';
import { Check, Clock, CircleDot, AlertTriangle } from 'lucide-react';

interface OrderTimelineProps {
  order: Order;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ order }) => {
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-base">Delivery Progress</h3>
        <span className="text-xs text-muted">Order #{order.id}</span>
      </div>

      <ul className="timeline-list">
        {order.timeline.map((step, idx) => {
          const isCompleted = step.completed;
          const isCurrent = !isCompleted && (idx === 0 || order.timeline[idx - 1].completed);

          let stepClass = 'timeline-step';
          if (isCompleted) stepClass += ' completed';
          if (isCurrent) stepClass += ' current';

          return (
            <li key={idx} className={stepClass}>
              <div className="timeline-dot">
                {isCompleted ? (
                  <Check size={13} strokeWidth={3} />
                ) : isCurrent ? (
                  <CircleDot size={12} strokeWidth={3} />
                ) : (
                  <Clock size={11} color="var(--color-text-muted)" />
                )}
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className={`text-sm ${isCompleted || isCurrent ? 'font-semibold' : 'text-muted'}`}>
                    {step.label}
                  </span>
                  <span className="text-xs text-muted">{step.timestamp}</span>
                </div>

                {isCurrent && (
                  <p className="text-xs text-primary mt-1 font-medium">
                    Current stage • In operational progress
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {order.status === 'OUT_FOR_DELIVERY' && order.assignedDeliveryBoyName && (
        <div className="alert alert-info mt-2">
          <div>
            <div className="font-semibold text-sm">Rider en route: {order.assignedDeliveryBoyName}</div>
            <div className="text-xs mt-1">
              Contact: {order.assignedDeliveryBoyPhone || '+91 97654 32109'} • Tamper Seal: <strong>{order.tamperBagNumber || 'SEAL-4491-KRG'}</strong>
            </div>
          </div>
        </div>
      )}

      {order.rxStatus === 'PENDING_VERIFICATION' && (
        <div className="alert alert-warning mt-2">
          <AlertTriangle size={16} />
          <div className="text-xs">
            A licensed pharmacist is actively verifying your prescription against regulatory norms before packing.
          </div>
        </div>
      )}
    </div>
  );
};
