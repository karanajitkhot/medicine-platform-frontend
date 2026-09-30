import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, Bell, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, t, customerProfile } = useApp();

  return (
    <header className="main-header">
      <div className="brand-wrapper">
        <div className="brand-icon-box">
          <HeartPulse size={24} />
        </div>
        <div>
          <div className="brand-title">{t('brandName')}</div>
          <div className="brand-sub">{t('tagline')}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {role === 'customer' && (
          <div className="flex items-center gap-1 text-xs text-muted" style={{ display: 'none' }}>
            <MapPin size={13} color="var(--color-primary)" />
            <span>{customerProfile.village}, {customerProfile.district}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span 
            className="badge badge-info" 
            style={{ textTransform: 'capitalize', fontSize: '11px', letterSpacing: 'normal' }}
          >
            Role: {role.toUpperCase()}
          </span>
          <div 
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              background: 'var(--color-bg-subtle)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer'
            }}
            title="Notification Center (Mock)"
          >
            <Bell size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};
