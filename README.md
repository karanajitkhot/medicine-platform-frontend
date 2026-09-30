# SevaAushadhi — Direct-to-Customer Medicine Platform (Frontend Prototype V0.1)

A clean, interactive, mobile-first frontend prototype designed for scheduled medicine ordering and delivery in rural and semi-urban India.

> **Phase**: Frontend Prototype V0.1 Only  
> **Status**: Localhost Interactive Demo (Mock Data Only)  
> **No Backend • No Database • No Real Payments • No GitHub Push**

---

## 🚀 How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to [http://localhost:5173/](http://localhost:5173/)

---

## 👥 Demo Role Switcher

A sticky top banner allows instantaneous switching between all 4 platform roles:

| Role | Target Persona | Key Experience |
|---|---|---|
| **👤 Customer** | Village Beneficiaries & Families | Mobile-first home, regular medicines, refill reminders, prescription upload simulation, cart, checkout, live 8-step tracking |
| **🛵 Delivery Boy** | Local Village Route Riders | Mobile-first stop sequence, tamper barcode verification, call customer, mock navigation, OTP delivery confirmation |
| **🏥 Pharmacy / Ops** | Licensed Central Hub Pharmacists | Verification queue, split-screen prescription review, inventory batch records, packing station, rider route assignment |
| **⚙️ Admin** | Central Platform Oversight | Executive metrics, demand-driven procurement planning (PO generator), user directory, regulatory audit trail |

---

## 🌐 Multilingual Readiness

Supports **English**, **हिंदी (Hindi)**, and **मराठी (Marathi)** with a one-click toggle in the header.

---

## 🛡️ Regulatory Compliance & Privacy Rules Implemented

- **No Medical Claims / No Auto-Diagnosis**: Fictional demo medicines with clear statutory disclaimers.
- **Strict Delivery Rider Privacy**: Delivery riders never see customer prescription scans or clinical diagnoses—only tamper barcode seal, village destination, and COD payment status.
- **Explicit Customer Refill Intent**: Adding items to "Regular Medicines" never auto-bills or auto-orders; an explicit confirmation step is required.
