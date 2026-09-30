import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MedicineCard } from '../../components/customer/MedicineCard';
import { MedicineDetailsModal } from '../../components/customer/MedicineDetailsModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Medicine, MedicineCategory } from '../../types';
import { Search, Filter, ShieldAlert } from 'lucide-react';

export const MedicineSearchPage: React.FC = () => {
  const { medicines } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rxFilter, setRxFilter] = useState<'All' | 'Rx' | 'OTC'>('All');
  const [activeModalMed, setActiveModalMed] = useState<Medicine | null>(null);

  const categories: string[] = ['All', 'Diabetes', 'Blood Pressure', 'Thyroid', 'Cholesterol', 'Gastro', 'Respiratory', 'General Wellness'];

  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      const matchesSearch = 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'All' || med.category === selectedCategory;

      const matchesRx = 
        rxFilter === 'All' || 
        (rxFilter === 'Rx' && med.requiresPrescription) || 
        (rxFilter === 'OTC' && !med.requiresPrescription);

      return matchesSearch && matchesCat && matchesRx;
    });
  }, [medicines, searchTerm, selectedCategory, rxFilter]);

  return (
    <div className="medicine-search-page">
      <div className="mb-4">
        <h2 className="font-bold text-xl mb-1">Search Medicines</h2>
        <p className="text-xs text-muted">
          Browse medicines available for licensed village dispensary fulfillment.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="form-group mb-3">
        <div className="flex gap-2">
          <div className="flex-1" style={{ position: 'relative' }}>
            <Search 
              size={18} 
              color="var(--color-text-muted)" 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '38px' }}
              placeholder="Search by medicine name, salt or brand..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="mb-3" style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '4px' }}>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '4px 12px', fontSize: '12px' }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex justify-between items-center mb-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter size={14} color="var(--color-text-muted)" />
          <span className="text-muted">Type:</span>
          {(['All', 'Rx', 'OTC'] as const).map(f => (
            <button
              key={f}
              type="button"
              className={`badge ${rxFilter === f ? 'badge-info' : 'badge-secondary'}`}
              style={{ 
                cursor: 'pointer', 
                border: 'none', 
                background: rxFilter === f ? 'var(--color-info-bg)' : '#e2e8f0',
                color: rxFilter === f ? 'var(--color-info-text)' : '#475569'
              }}
              onClick={() => setRxFilter(f)}
            >
              {f === 'Rx' ? 'Rx Only' : f === 'OTC' ? 'OTC Only' : 'All'}
            </button>
          ))}
        </div>
        <span className="text-muted">{filteredMedicines.length} found</span>
      </div>

      <div className="alert alert-warning mb-3 p-2" style={{ fontSize: '11px' }}>
        <ShieldAlert size={14} style={{ flexShrink: 0 }} />
        <span>Fictional demo medicines. Medicines are delivered only on valid registered prescription.</span>
      </div>

      {/* Results List */}
      {filteredMedicines.length === 0 ? (
        <EmptyState
          title="No Medicines Found"
          description={`We couldn't find any medicine matching "${searchTerm}". Try checking the spelling or resetting filters.`}
          actionText="Reset Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setRxFilter('All');
          }}
        />
      ) : (
        <div>
          {filteredMedicines.map(med => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onOpenDetails={m => setActiveModalMed(m)}
            />
          ))}
        </div>
      )}

      <MedicineDetailsModal
        medicine={activeModalMed}
        onClose={() => setActiveModalMed(null)}
      />
    </div>
  );
};
