import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, Language } from '../../types';
import { User, Truck, Stethoscope, ShieldCheck, RefreshCw, Languages } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole, language, setLanguage, resetDemoData } = useApp();

  const roles: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    { id: 'customer', label: 'Customer', icon: <User size={14} /> },
    { id: 'delivery', label: 'Delivery Boy', icon: <Truck size={14} /> },
    { id: 'pharmacy', label: 'Pharmacy / Ops', icon: <Stethoscope size={14} /> },
    { id: 'admin', label: 'Admin', icon: <ShieldCheck size={14} /> }
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' }
  ];

  return (
    <aside aria-label="Demo controls" className="demo-role-banner">
      <div className="demo-label">
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
        <span>DEMO V0.1 ROLE SWITCHER:</span>
      </div>

      <div className="role-switcher-buttons">
        {roles.map(r => (
          <button
            key={r.id}
            className={`role-btn ${role === r.id ? 'active' : ''}`}
            onClick={() => setRole(r.id)}
          >
            {r.icon}
            <span>{r.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1" title="Switch Language">
          <Languages size={14} color="#94a3b8" />
          {languages.map(l => (
            <button
              key={l.code}
              className={`lang-btn ${language === l.code ? 'active' : ''}`}
              onClick={() => setLanguage(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          className="role-btn"
          style={{ background: '#334155', color: '#f1f5f9' }}
          onClick={() => {
            if (confirm('Reset prototype demo state to initial data?')) {
              resetDemoData();
            }
          }}
          title="Reset mock data to default"
        >
          <RefreshCw size={12} />
          <span>Reset</span>
        </button>
      </div>
    </aside>
  );
};
