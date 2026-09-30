import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  CalendarClock, 
  HelpCircle, 
  Languages, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import { Language } from '../../types';

export const CustomerProfilePage: React.FC = () => {
  const { customerProfile, language, setLanguage, regularMedicines, setCustomerView } = useApp();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'mr', label: 'मराठी (Marathi)' }
  ];

  return (
    <div className="customer-profile-page">
      <div className="mb-4">
        <h2 className="font-bold text-xl mb-1">Customer Profile</h2>
        <span className="text-xs text-muted">Account & family health registry</span>
      </div>

      {/* Profile Overview Card */}
      <div className="card mb-4 p-4 text-center">
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem'
          }}
        >
          <User size={32} />
        </div>
        <h3 className="font-bold text-lg">{customerProfile.name}</h3>
        <p className="text-xs text-muted">Beneficiary ID: {customerProfile.id} • Village Resident</p>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t text-left text-xs" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <Phone size={14} color="var(--color-primary)" />
            <span>{customerProfile.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} color="var(--color-primary)" />
            <span className="truncate">{customerProfile.email}</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={16} color="var(--color-primary)" />
          <h4 className="font-bold text-sm">Registered Village Address</h4>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          {customerProfile.landmark}<br />
          Village: <strong>{customerProfile.village}</strong>, Taluka {customerProfile.taluka}<br />
          District: {customerProfile.district}, Maharashtra - {customerProfile.pincode}
        </p>
      </div>

      {/* Family Members Profile */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={16} color="var(--color-primary)" />
            <h4 className="font-bold text-sm">Family Members Registry</h4>
          </div>
          <span className="text-xs text-muted">{customerProfile.familyMembers.length} linked</span>
        </div>

        <div className="flex flex-col gap-2">
          {customerProfile.familyMembers.map((fam, idx) => (
            <div 
              key={idx} 
              className="p-2 border rounded flex justify-between items-center text-xs"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div>
                <span className="font-semibold block">{fam.name}</span>
                <span className="text-muted">Relation: {fam.relation} • Age: {fam.age} yrs</span>
              </div>
              <span className="badge badge-info" style={{ fontSize: '10px' }}>Active</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Medicines Shortcut */}
      <div 
        className="card mb-4 p-3 card-clickable flex items-center justify-between"
        onClick={() => setCustomerView('regular')}
        style={{ background: 'var(--color-recurring-light)', borderColor: 'var(--color-recurring-border)' }}
      >
        <div className="flex items-center gap-3">
          <CalendarClock size={20} color="var(--color-recurring)" />
          <div>
            <div className="font-bold text-sm" style={{ color: 'var(--color-recurring)' }}>
              Regular Refill Plan
            </div>
            <span className="text-xs text-muted">{regularMedicines.length} scheduled formula(s)</span>
          </div>
        </div>
        <span className="text-xs font-semibold" style={{ color: 'var(--color-recurring)' }}>
          Manage →
        </span>
      </div>

      {/* Language Selector */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Languages size={16} color="var(--color-primary)" />
          <h4 className="font-bold text-sm">App Language / भाषा</h4>
        </div>
        <div className="flex gap-2">
          {languages.map(l => (
            <button
              key={l.code}
              type="button"
              className={`btn btn-sm ${language === l.code ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, fontSize: '12px' }}
              onClick={() => setLanguage(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Support & Help */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle size={16} color="var(--color-primary)" />
          <h4 className="font-bold text-sm">Rural Care Assistance</h4>
        </div>
        <p className="text-xs text-muted mb-3">
          Need help reading your doctor's handwriting or scheduling medicine refills?
        </p>
        <button
          type="button"
          className="btn btn-secondary btn-block btn-sm"
          onClick={() => alert('Dialing Village Health Coordinator Helpline: 1800-202-9900 (Toll-Free Demo)')}
        >
          <Phone size={14} color="var(--color-primary)" />
          <span>Call Dedicated Care Helpline</span>
        </button>
      </div>

      {/* Sign Out Simulation */}
      <div className="mb-6">
        <button
          type="button"
          className="btn btn-secondary btn-block text-danger"
          style={{ borderColor: 'var(--color-border)' }}
          onClick={() => setCustomerView('welcome')}
        >
          <LogOut size={16} />
          <span>Switch Account (Demo Logout)</span>
        </button>
      </div>

      <div className="text-center text-xs text-muted mb-4">
        <div className="flex items-center justify-center gap-1">
          <ShieldCheck size={14} color="var(--color-primary)" />
          <span>Seva Aushadhi Rural Healthcare Network V0.1 Prototype</span>
        </div>
      </div>
    </div>
  );
};
