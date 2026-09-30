import { DeliveryBoy } from '../types';

export const mockDeliveryBoys: DeliveryBoy[] = [
  {
    id: 'db-01',
    name: 'Ganesh Shinde',
    phone: '+91 97654 32109',
    assignedRoute: 'Route 4: Koregaon - Rahimatpur Belt',
    status: 'AVAILABLE',
    activeDeliveriesCount: 2,
    vehicleType: 'Hero Splendor (MH 11 BV 4021)'
  },
  {
    id: 'db-02',
    name: 'Vikram Jadhav',
    phone: '+91 98220 54321',
    assignedRoute: 'Route 2: Wai - Bhuinj Belt',
    status: 'AVAILABLE',
    activeDeliveriesCount: 0,
    vehicleType: 'Honda Shine (MH 11 CR 8842)'
  },
  {
    id: 'db-03',
    name: 'Santosh More',
    phone: '+91 94230 77651',
    assignedRoute: 'Route 7: Karad South Belt',
    status: 'ON_DELIVERY',
    activeDeliveriesCount: 4,
    vehicleType: 'Bajaj Platina (MH 11 DS 1920)'
  }
];
