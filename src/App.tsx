import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { Header } from './components/common/Header';

// Customer screens
import { WelcomePage } from './pages/WelcomePage';
import { CustomerHomePage } from './pages/customer/CustomerHomePage';
import { MedicineSearchPage } from './pages/customer/MedicineSearchPage';
import { RegularMedicinesPage } from './pages/customer/RegularMedicinesPage';
import { RefillReviewPage } from './pages/customer/RefillReviewPage';
import { PrescriptionUploadPage } from './pages/customer/PrescriptionUploadPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';
import { OrderHistoryPage } from './pages/customer/OrderHistoryPage';
import { CustomerProfilePage } from './pages/customer/CustomerProfilePage';
import { CustomerNav } from './components/customer/CustomerNav';

// Delivery screens
import { DeliveryDashboardPage } from './pages/delivery/DeliveryDashboardPage';
import { DeliveryDetailsPage } from './pages/delivery/DeliveryDetailsPage';
import { DeliveryHistoryPage } from './pages/delivery/DeliveryHistoryPage';

// Pharmacy screens
import { PharmacyDashboardPage } from './pages/pharmacy/PharmacyDashboardPage';
import { PharmacyOrdersPage } from './pages/pharmacy/PharmacyOrdersPage';
import { PrescriptionVerificationPage } from './pages/pharmacy/PrescriptionVerificationPage';
import { PharmacyInventoryPage } from './pages/pharmacy/PharmacyInventoryPage';
import { PharmacyPackingPage } from './pages/pharmacy/PharmacyPackingPage';
import { PharmacyAssignmentPage } from './pages/pharmacy/PharmacyAssignmentPage';

// Admin screens
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProcurementPage } from './pages/admin/AdminProcurementPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

// Icons
import { 
  LayoutDashboard, 
  ClipboardList, 
  FileCheck, 
  Boxes, 
  Package, 
  Truck, 
  ShoppingCart, 
  Users, 
  History, 
  ShieldCheck 
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    role, 
    customerView, 
    deliveryView, 
    pharmacyView, 
    setPharmacyView, 
    adminView, 
    setAdminView 
  } = useApp();

  return (
    <div className="app-container">
      {/* Global Role Switcher */}
      <RoleSwitcher />

      {/* Global Header */}
      <Header />

      <main className="main-content">
        {/* ===================================================================
            1. CUSTOMER ROLE (Mobile-First responsive container)
            =================================================================== */}
        {role === 'customer' && (
          <div className="mobile-viewport-container p-4">
            {customerView === 'welcome' && <WelcomePage />}
            {customerView === 'home' && <CustomerHomePage />}
            {customerView === 'search' && <MedicineSearchPage />}
            {customerView === 'regular' && <RegularMedicinesPage />}
            {customerView === 'refill' && <RefillReviewPage />}
            {customerView === 'upload_rx' && <PrescriptionUploadPage />}
            {customerView === 'cart' && <CartPage />}
            {customerView === 'checkout' && <CheckoutPage />}
            {customerView === 'orders' && <OrderHistoryPage />}
            {customerView === 'order_details' && <OrderTrackingPage />}
            {customerView === 'profile' && <CustomerProfilePage />}

            {/* Bottom Nav visible for regular customer views */}
            {customerView !== 'welcome' && <CustomerNav />}
          </div>
        )}

        {/* ===================================================================
            2. DELIVERY BOY ROLE (Mobile-First route view)
            =================================================================== */}
        {role === 'delivery' && (
          <div className="mobile-viewport-container p-4">
            {deliveryView === 'dashboard' && <DeliveryDashboardPage />}
            {deliveryView === 'details' && <DeliveryDetailsPage />}
            {deliveryView === 'history' && <DeliveryHistoryPage />}
          </div>
        )}

        {/* ===================================================================
            3. PHARMACY / OPERATIONS ROLE (Desktop & Tablet Optimized)
            =================================================================== */}
        {role === 'pharmacy' && (
          <div className="dashboard-layout">
            <aside className="sidebar">
              <button
                type="button"
                className={`sidebar-nav-item ${pharmacyView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setPharmacyView('dashboard')}
              >
                <LayoutDashboard size={18} />
                <span>Hub Dashboard</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${pharmacyView === 'orders' ? 'active' : ''}`}
                onClick={() => setPharmacyView('orders')}
              >
                <ClipboardList size={18} />
                <span>Orders Pipeline</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${pharmacyView === 'prescriptions' ? 'active' : ''}`}
                onClick={() => setPharmacyView('prescriptions')}
              >
                <FileCheck size={18} />
                <span>Prescription Audit</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${pharmacyView === 'inventory' ? 'active' : ''}`}
                onClick={() => setPharmacyView('inventory')}
              >
                <Boxes size={18} />
                <span>Inventory & Batches</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${pharmacyView === 'packing' ? 'active' : ''}`}
                onClick={() => setPharmacyView('packing')}
              >
                <Package size={18} />
                <span>Packing Station</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${pharmacyView === 'assignment' ? 'active' : ''}`}
                onClick={() => setPharmacyView('assignment')}
              >
                <Truck size={18} />
                <span>Rider Dispatch</span>
              </button>
            </aside>

            <section className="dashboard-workspace">
              {pharmacyView === 'dashboard' && <PharmacyDashboardPage />}
              {pharmacyView === 'orders' && <PharmacyOrdersPage />}
              {pharmacyView === 'prescriptions' && <PrescriptionVerificationPage />}
              {pharmacyView === 'inventory' && <PharmacyInventoryPage />}
              {pharmacyView === 'packing' && <PharmacyPackingPage />}
              {pharmacyView === 'assignment' && <PharmacyAssignmentPage />}
            </section>
          </div>
        )}

        {/* ===================================================================
            4. ADMIN ROLE (Executive Management & Oversight)
            =================================================================== */}
        {role === 'admin' && (
          <div className="dashboard-layout">
            <aside className="sidebar">
              <button
                type="button"
                className={`sidebar-nav-item ${adminView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setAdminView('dashboard')}
              >
                <LayoutDashboard size={18} />
                <span>Overview</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${adminView === 'procurement' ? 'active' : ''}`}
                onClick={() => setAdminView('procurement')}
              >
                <ShoppingCart size={18} />
                <span>Procurement (Demand)</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${adminView === 'orders' ? 'active' : ''}`}
                onClick={() => setAdminView('orders')}
              >
                <ClipboardList size={18} />
                <span>Central Orders</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${adminView === 'inventory' ? 'active' : ''}`}
                onClick={() => setAdminView('inventory')}
              >
                <Boxes size={18} />
                <span>Stock Oversight</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${adminView === 'users' ? 'active' : ''}`}
                onClick={() => setAdminView('users')}
              >
                <Users size={18} />
                <span>Users & Fleet</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-item ${adminView === 'audit_logs' ? 'active' : ''}`}
                onClick={() => setAdminView('audit_logs')}
              >
                <ShieldCheck size={18} />
                <span>Audit Trail Logs</span>
              </button>
            </aside>

            <section className="dashboard-workspace">
              {adminView === 'dashboard' && <AdminDashboardPage />}
              {adminView === 'procurement' && <AdminProcurementPage />}
              {adminView === 'orders' && <PharmacyOrdersPage />}
              {adminView === 'inventory' && <PharmacyInventoryPage />}
              {adminView === 'users' && <AdminUsersPage />}
              {adminView === 'audit_logs' && <AdminAuditLogsPage />}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
