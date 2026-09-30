import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UploadCloud, 
  Camera, 
  FileText, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowLeft,
  FileCheck
} from 'lucide-react';

export const PrescriptionUploadPage: React.FC = () => {
  const { setCustomerView } = useApp();
  const [uploadedMockFile, setUploadedMockFile] = useState<{
    name: string;
    date: string;
    doctor: string;
    status: 'Verified Valid' | 'Pending Review';
  } | null>({
    name: 'Prescription_Satara_Oct2026.pdf',
    date: '24 Sep 2026',
    doctor: 'Dr. A. Kulkarni, MBBS (Satara Civil Hospital)',
    status: 'Verified Valid'
  });

  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  const handleSimulateUpload = (type: string) => {
    const fileName = type === 'camera' ? 'Camera_Rx_Capture_01.jpg' : 'Prescription_Clinic_Satara.pdf';
    setUploadedMockFile({
      name: fileName,
      date: 'Today',
      doctor: 'Dr. V. Deshmukh, MD Medicine',
      status: 'Pending Review'
    });
    setUploadSuccessMessage(`Simulated ${type === 'camera' ? 'camera capture' : 'file upload'} attached successfully!`);
    setTimeout(() => setUploadSuccessMessage(null), 3000);
  };

  return (
    <div className="prescription-upload-page">
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setCustomerView('home')}
          style={{ padding: '6px' }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="font-bold text-xl">Prescription Upload</h2>
          <span className="text-xs text-muted">Mandatory for Schedule H/Rx medicines</span>
        </div>
      </div>

      {/* Legal & Regulatory Notice */}
      <div className="alert alert-warning mb-4">
        <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span className="text-xs">
          <strong>Regulatory Notice:</strong> Prescription will be carefully reviewed by our licensed registered pharmacist prior to packaging. Only valid registered doctor prescriptions are accepted.
        </span>
      </div>

      {uploadSuccessMessage && (
        <div className="alert alert-success mb-3 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{uploadSuccessMessage}</span>
        </div>
      )}

      {/* Upload Action Options */}
      <div className="card mb-4 text-center p-6" style={{ border: '2px dashed var(--color-border)' }}>
        <div className="flex justify-center mb-3">
          <div 
            style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              background: 'var(--color-primary-light)', 
              color: 'var(--color-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <UploadCloud size={32} />
          </div>
        </div>

        <h3 className="font-bold text-base mb-1">Attach Doctor's Prescription</h3>
        <p className="text-xs text-muted mb-4" style={{ maxWidth: '320px', margin: '0 auto 1rem' }}>
          Take a clear photo of physical prescription or upload PDF document (Demo Simulation).
        </p>

        <div className="flex flex-col gap-2" style={{ maxWidth: '280px', margin: '0 auto' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSimulateUpload('camera')}
          >
            <Camera size={16} />
            <span>Take Photo (Camera Mock)</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleSimulateUpload('file')}
          >
            <FileText size={16} />
            <span>Choose File (PDF / JPEG)</span>
          </button>
        </div>

        <div className="mt-3 text-xs text-muted">
          * Local prototype simulation only. No real medical documents are uploaded or stored.
        </div>
      </div>

      {/* Currently Attached Simulated Prescription */}
      {uploadedMockFile && (
        <div className="card mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-sm">Attached Active Prescription</h4>
            <span className="badge badge-success">{uploadedMockFile.status}</span>
          </div>

          <div className="p-3 border rounded flex items-center justify-between" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-subtle)' }}>
            <div className="flex items-center gap-3">
              <FileCheck size={28} color="var(--color-primary)" />
              <div>
                <div className="font-semibold text-sm">{uploadedMockFile.name}</div>
                <div className="text-xs text-muted">
                  Doctor: {uploadedMockFile.doctor} • Dated: {uploadedMockFile.date}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => alert('Simulated preview: Showing doctor registration stamp, Rx items, and valid validity period.')}
            >
              View
            </button>
          </div>
        </div>
      )}

      <div className="card p-3" style={{ background: '#f8fafc' }}>
        <h4 className="font-semibold text-xs text-muted uppercase tracking-wider mb-2">Prescription Guidelines</h4>
        <ul className="text-xs text-secondary" style={{ paddingLeft: '1.25rem', lineHeight: 1.6 }}>
          <li>Doctor's name, degree, and registration number must be clearly visible.</li>
          <li>Patient name, age, and consultation date must match order profile.</li>
          <li>Dispensation is strictly handled from our licensed central pharmacy.</li>
        </ul>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => setCustomerView('cart')}
        >
          <ShieldCheck size={16} />
          <span>Continue to Order Cart</span>
        </button>
      </div>
    </div>
  );
};
