import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Language, 
  Medicine, 
  CartItem, 
  RegularMedicineItem, 
  Order, 
  DeliveryBoy, 
  InventoryItem, 
  ProcurementItem, 
  CustomerProfile,
  OrderStatus,
  RxStatus
} from '../types';
import { mockMedicines } from '../data/mockMedicines';
import { initialRegularMedicines, mockCustomerProfile } from '../data/mockCustomers';
import { mockOrders } from '../data/mockOrders';
import { mockDeliveryBoys } from '../data/mockDelivery';
import { mockInventory, mockProcurementData } from '../data/mockInventory';
import { translations } from '../data/translations';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  // Navigation sub-views
  customerView: string;
  setCustomerView: (view: string) => void;
  deliveryView: string;
  setDeliveryView: (view: string) => void;
  pharmacyView: string;
  setPharmacyView: (view: string) => void;
  adminView: string;
  setAdminView: (view: string) => void;

  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  selectedMedicineId: string | null;
  setSelectedMedicineId: (id: string | null) => void;

  // Data State
  medicines: Medicine[];
  cart: CartItem[];
  regularMedicines: RegularMedicineItem[];
  orders: Order[];
  deliveryBoys: DeliveryBoy[];
  inventory: InventoryItem[];
  procurement: ProcurementItem[];
  customerProfile: CustomerProfile;

  // Cart actions
  addToCart: (medicine: Medicine, quantity?: number) => void;
  updateCartQuantity: (medicineId: string, quantity: number) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;

  // Regular Medicines actions
  addToRegularMedicines: (medicine: Medicine, frequency?: 'Monthly' | 'Bi-Monthly' | 'Every 45 Days' | 'Quarterly', quantity?: number) => void;
  removeRegularMedicine: (id: string) => void;
  toggleRegularMedicineStatus: (id: string) => void;
  confirmRefillOrder: (items: RegularMedicineItem[]) => string;

  // Order actions
  placeOrder: (paymentMethod: 'COD' | 'ONLINE_MOCK', deliverySlot: string, prescriptionUploaded: boolean) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus, extra?: Partial<Order>) => void;
  verifyPrescription: (orderId: string, approved: boolean, reason?: string) => void;
  assignOrderToDeliveryBoy: (orderId: string, riderId: string) => void;
  markOrderPacked: (orderId: string, bagBarcode: string) => void;
  confirmPickup: (orderId: string) => void;
  confirmDelivery: (orderId: string, enteredOtp: string) => boolean;

  // Inventory actions
  addInventoryStock: (medicineId: string, batchNumber: string, expiryDate: string, qty: number, purchasePrice: number) => void;

  // Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try loading from localStorage or defaults
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('seva_demo_role') as UserRole) || 'customer';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('seva_demo_lang') as Language) || 'en';
  });

  const [customerView, setCustomerView] = useState<string>('home');
  const [deliveryView, setDeliveryView] = useState<string>('dashboard');
  const [pharmacyView, setPharmacyView] = useState<string>('dashboard');
  const [adminView, setAdminView] = useState<string>('dashboard');

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('DEMO-1001');
  const [selectedMedicineId, setSelectedMedicineId] = useState<string | null>(null);

  // Entities
  const [medicines] = useState<Medicine[]>(mockMedicines);
  const [customerProfile] = useState<CustomerProfile>(mockCustomerProfile);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('seva_demo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [regularMedicines, setRegularMedicines] = useState<RegularMedicineItem[]>(() => {
    try {
      const saved = localStorage.getItem('seva_demo_regular_meds');
      return saved ? JSON.parse(saved) : initialRegularMedicines;
    } catch {
      return initialRegularMedicines;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('seva_demo_orders');
      return saved ? JSON.parse(saved) : mockOrders;
    } catch {
      return mockOrders;
    }
  });

  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>(() => {
    try {
      const saved = localStorage.getItem('seva_demo_delivery_boys');
      return saved ? JSON.parse(saved) : mockDeliveryBoys;
    } catch {
      return mockDeliveryBoys;
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('seva_demo_inventory');
      return saved ? JSON.parse(saved) : mockInventory;
    } catch {
      return mockInventory;
    }
  });

  const [procurement] = useState<ProcurementItem[]>(mockProcurementData);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('seva_demo_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('seva_demo_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('seva_demo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('seva_demo_regular_meds', JSON.stringify(regularMedicines));
  }, [regularMedicines]);

  useEffect(() => {
    localStorage.setItem('seva_demo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('seva_demo_delivery_boys', JSON.stringify(deliveryBoys));
  }, [deliveryBoys]);

  useEffect(() => {
    localStorage.setItem('seva_demo_inventory', JSON.stringify(inventory));
  }, [inventory]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  // Cart operations
  const addToCart = (medicine: Medicine, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { medicine, quantity }];
    });
  };

  const updateCartQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => prev.filter(item => item.medicine.id !== medicineId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Regular Medicines operations
  const addToRegularMedicines = (
    medicine: Medicine,
    frequency: 'Monthly' | 'Bi-Monthly' | 'Every 45 Days' | 'Quarterly' = 'Monthly',
    quantity: number = 1
  ) => {
    setRegularMedicines(prev => {
      const exists = prev.find(item => item.medicineId === medicine.id);
      if (exists) {
        return prev.map(item =>
          item.medicineId === medicine.id
            ? { ...item, quantity: item.quantity + quantity, frequency }
            : item
        );
      }
      const newItem: RegularMedicineItem = {
        id: `reg-${Date.now().toString().slice(-4)}`,
        medicineId: medicine.id,
        medicineName: medicine.name,
        strength: medicine.strength,
        packSize: medicine.packSize,
        quantity,
        frequency,
        expectedRefillDate: '10 Nov 2026',
        status: 'Active',
        customerPrice: medicine.customerPrice,
        requiresPrescription: medicine.requiresPrescription
      };
      return [...prev, newItem];
    });
  };

  const removeRegularMedicine = (id: string) => {
    setRegularMedicines(prev => prev.filter(item => item.id !== id));
  };

  const toggleRegularMedicineStatus = (id: string) => {
    setRegularMedicines(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'Active' ? 'Paused' : 'Active' }
          : item
      )
    );
  };

  // Confirm Refill creates a new order explicitly confirming the customer's intent
  const confirmRefillOrder = (items: RegularMedicineItem[]): string => {
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = items.reduce((acc, curr) => acc + curr.customerPrice * curr.quantity, 0);
    const totalMrp = Math.round(totalAmount * 1.3);
    const requiresRx = items.some(i => i.requiresPrescription);

    const newOrder: Order = {
      id: newOrderId,
      customerId: customerProfile.id,
      customerName: customerProfile.name,
      customerPhone: customerProfile.phone,
      deliveryAddress: {
        village: customerProfile.village,
        landmark: customerProfile.landmark,
        taluka: customerProfile.taluka,
        district: customerProfile.district,
        pincode: customerProfile.pincode
      },
      items: items.map(i => ({
        medicineId: i.medicineId,
        name: i.medicineName,
        strength: i.strength,
        packSize: i.packSize,
        quantity: i.quantity,
        price: i.customerPrice,
        requiresPrescription: i.requiresPrescription
      })),
      itemCount: items.length,
      totalMrp,
      totalSavings: totalMrp - totalAmount,
      totalAmount,
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      orderDate: 'Today, Just Now',
      deliverySlot: 'Tomorrow Scheduled Morning (Village Route)',
      status: 'PLACED',
      rxStatus: requiresRx ? 'APPROVED' : 'NOT_REQUIRED',
      prescriptionUrl: requiresRx ? 'verified_chronic_prescription.pdf' : undefined,
      otpCode: `${Math.floor(1000 + Math.random() * 9000)}`,
      timeline: [
        { status: 'PLACED', label: 'Refill Order Confirmed by Customer', timestamp: 'Just Now', completed: true },
        { status: 'RX_VERIFIED', label: 'Prescription Verified', timestamp: 'Pending', completed: false },
        { status: 'STOCK_CONFIRMED', label: 'Stock Confirmation', timestamp: 'Pending', completed: false },
        { status: 'PACKING', label: 'Packaging', timestamp: 'Pending', completed: false },
        { status: 'READY_FOR_DELIVERY', label: 'Ready for Route Dispatch', timestamp: 'Pending', completed: false },
        { status: 'ASSIGNED', label: 'Assign Rider', timestamp: 'Pending', completed: false },
        { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', timestamp: 'Pending', completed: false },
        { status: 'DELIVERED', label: 'Delivered to Doorstep', timestamp: 'Pending', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setSelectedOrderId(newOrderId);
    return newOrderId;
  };

  // Place Order from Cart
  const placeOrder = (
    paymentMethod: 'COD' | 'ONLINE_MOCK',
    deliverySlot: string,
    prescriptionUploaded: boolean
  ): string => {
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = cart.reduce((acc, curr) => acc + curr.medicine.customerPrice * curr.quantity, 0);
    const totalMrp = cart.reduce((acc, curr) => acc + curr.medicine.mrp * curr.quantity, 0);
    const requiresRx = cart.some(item => item.medicine.requiresPrescription);

    const newOrder: Order = {
      id: newOrderId,
      customerId: customerProfile.id,
      customerName: customerProfile.name,
      customerPhone: customerProfile.phone,
      deliveryAddress: {
        village: customerProfile.village,
        landmark: customerProfile.landmark,
        taluka: customerProfile.taluka,
        district: customerProfile.district,
        pincode: customerProfile.pincode
      },
      items: cart.map(i => ({
        medicineId: i.medicine.id,
        name: i.medicine.name,
        strength: i.medicine.strength,
        packSize: i.medicine.packSize,
        quantity: i.quantity,
        price: i.medicine.customerPrice,
        requiresPrescription: i.medicine.requiresPrescription
      })),
      itemCount: cart.length,
      totalMrp,
      totalSavings: totalMrp - totalAmount,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'ONLINE_MOCK' ? 'PAID' : 'PENDING',
      orderDate: 'Today, Just Now',
      deliverySlot,
      status: 'PLACED',
      rxStatus: requiresRx ? (prescriptionUploaded ? 'PENDING_VERIFICATION' : 'PENDING_VERIFICATION') : 'NOT_REQUIRED',
      prescriptionUrl: prescriptionUploaded ? 'uploaded_rx_customer_mock.pdf' : undefined,
      otpCode: `${Math.floor(1000 + Math.random() * 9000)}`,
      timeline: [
        { status: 'PLACED', label: 'Order Placed by Customer', timestamp: 'Just Now', completed: true },
        { status: 'RX_VERIFIED', label: requiresRx ? 'Prescription Verification by Pharmacist' : 'Prescription Not Required', timestamp: 'Pending', completed: false },
        { status: 'STOCK_CONFIRMED', label: 'Stock Confirmation & Allocation', timestamp: 'Pending', completed: false },
        { status: 'PACKING', label: 'Packing at Licensed Pharmacy', timestamp: 'Pending', completed: false },
        { status: 'READY_FOR_DELIVERY', label: 'Ready for Route Dispatch', timestamp: 'Pending', completed: false },
        { status: 'ASSIGNED', label: 'Assign Rider', timestamp: 'Pending', completed: false },
        { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', timestamp: 'Pending', completed: false },
        { status: 'DELIVERED', label: 'Delivered', timestamp: 'Pending', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setSelectedOrderId(newOrderId);
    return newOrderId;
  };

  // State transitions
  const updateOrderStatus = (orderId: string, status: OrderStatus, extra?: Partial<Order>) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const updatedTimeline = ord.timeline.map(tl => {
          if (tl.status === status) {
            return { ...tl, completed: true, timestamp: 'Just Now' };
          }
          return tl;
        });

        return {
          ...ord,
          status,
          ...extra,
          timeline: updatedTimeline
        };
      })
    );
  };

  const verifyPrescription = (orderId: string, approved: boolean, reason?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const newRxStatus: RxStatus = approved ? 'APPROVED' : 'REJECTED';
        const newStatus: OrderStatus = approved ? 'RX_VERIFIED' : 'CANCELLED';

        const updatedTimeline = ord.timeline.map(tl => {
          if (tl.status === 'RX_VERIFIED') {
            return {
              ...tl,
              label: approved ? 'Prescription Verified & Approved' : `Rejected: ${reason || 'Invalid prescription'}`,
              completed: approved,
              timestamp: 'Just Now'
            };
          }
          return tl;
        });

        return {
          ...ord,
          rxStatus: newRxStatus,
          status: newStatus,
          deliveryNotes: !approved ? `Prescription clarification: ${reason}` : ord.deliveryNotes,
          timeline: updatedTimeline
        };
      })
    );
  };

  const assignOrderToDeliveryBoy = (orderId: string, riderId: string) => {
    const rider = deliveryBoys.find(r => r.id === riderId);
    if (!rider) return;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const updatedTimeline = ord.timeline.map(tl => {
          if (tl.status === 'ASSIGNED') {
            return { ...tl, completed: true, label: `Assigned to ${rider.name}`, timestamp: 'Just Now' };
          }
          return tl;
        });
        return {
          ...ord,
          status: 'ASSIGNED',
          assignedDeliveryBoyId: rider.id,
          assignedDeliveryBoyName: rider.name,
          assignedDeliveryBoyPhone: rider.phone,
          timeline: updatedTimeline
        };
      })
    );

    setDeliveryBoys(prev =>
      prev.map(r =>
        r.id === riderId
          ? { ...r, activeDeliveriesCount: r.activeDeliveriesCount + 1 }
          : r
      )
    );
  };

  const markOrderPacked = (orderId: string, bagBarcode: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const updatedTimeline = ord.timeline.map(tl => {
          if (tl.status === 'PACKING') {
            return { ...tl, completed: true, label: `Packed (Seal: ${bagBarcode})`, timestamp: 'Just Now' };
          }
          if (tl.status === 'READY_FOR_DELIVERY') {
            return { ...tl, completed: true, timestamp: 'Just Now' };
          }
          return tl;
        });
        return {
          ...ord,
          status: 'READY_FOR_DELIVERY',
          tamperBagNumber: bagBarcode,
          timeline: updatedTimeline
        };
      })
    );
  };

  const confirmPickup = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const updatedTimeline = ord.timeline.map(tl => {
          if (tl.status === 'OUT_FOR_DELIVERY') {
            return { ...tl, completed: true, timestamp: 'Just Now' };
          }
          return tl;
        });
        return {
          ...ord,
          status: 'OUT_FOR_DELIVERY',
          timeline: updatedTimeline
        };
      })
    );
  };

  const confirmDelivery = (orderId: string, enteredOtp: string): boolean => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;

    // For prototype testing: accept matching OTP or demo bypass '1234' or exact code
    const isValid = !order.otpCode || enteredOtp === order.otpCode || enteredOtp === '1234';
    if (!isValid) return false;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const updatedTimeline = ord.timeline.map(tl => {
          if (tl.status === 'DELIVERED') {
            return { ...tl, completed: true, timestamp: 'Just Now' };
          }
          return tl;
        });
        return {
          ...ord,
          status: 'DELIVERED',
          paymentStatus: 'COLLECTED',
          timeline: updatedTimeline
        };
      })
    );

    // decrease rider count
    if (order.assignedDeliveryBoyId) {
      setDeliveryBoys(prev =>
        prev.map(r =>
          r.id === order.assignedDeliveryBoyId
            ? { ...r, activeDeliveriesCount: Math.max(0, r.activeDeliveriesCount - 1) }
            : r
        )
      );
    }

    return true;
  };

  const addInventoryStock = (
    medicineId: string,
    batchNumber: string,
    expiryDate: string,
    qty: number,
    purchasePrice: number
  ) => {
    const med = medicines.find(m => m.id === medicineId);
    if (!med) return;

    const newItem: InventoryItem = {
      id: `inv-${Date.now().toString().slice(-4)}`,
      medicineId,
      medicineName: `${med.name} ${med.strength}`,
      batchNumber,
      expiryDate,
      availableQuantity: qty,
      purchasePrice,
      mrp: med.mrp,
      customerPrice: med.customerPrice,
      safetyStock: 30,
      status: 'IN_STOCK'
    };

    setInventory(prev => [newItem, ...prev]);
  };

  const resetDemoData = () => {
    localStorage.clear();
    setCart([]);
    setRegularMedicines(initialRegularMedicines);
    setOrders(mockOrders);
    setDeliveryBoys(mockDeliveryBoys);
    setInventory(mockInventory);
    setSelectedOrderId('DEMO-1001');
    setSelectedMedicineId(null);
    setCustomerView('home');
    setDeliveryView('dashboard');
    setPharmacyView('dashboard');
    setAdminView('dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t,
        customerView,
        setCustomerView,
        deliveryView,
        setDeliveryView,
        pharmacyView,
        setPharmacyView,
        adminView,
        setAdminView,
        selectedOrderId,
        setSelectedOrderId,
        selectedMedicineId,
        setSelectedMedicineId,
        medicines,
        cart,
        regularMedicines,
        orders,
        deliveryBoys,
        inventory,
        procurement,
        customerProfile,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addToRegularMedicines,
        removeRegularMedicine,
        toggleRegularMedicineStatus,
        confirmRefillOrder,
        placeOrder,
        updateOrderStatus,
        verifyPrescription,
        assignOrderToDeliveryBoy,
        markOrderPacked,
        confirmPickup,
        confirmDelivery,
        addInventoryStock,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
