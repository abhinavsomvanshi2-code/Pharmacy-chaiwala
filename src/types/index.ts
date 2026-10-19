export type HealthCategory = 'all' | 'immunity' | 'digestion' | 'calm' | 'throat' | 'energy';

export interface Botanical {
  name: string;
  hindi: string;
  role: string;
}

export interface ChaiItem {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  category: HealthCategory;
  description: string;
  ayurvedicAction: string;
  dosha: string;
  price: number;
  image: string;
  spiceLevel: 1 | 2 | 3 | 4;
  caffeine: string;
  botanicals: Botanical[];
  steepTime: string;
  idealTime: string;
  popular?: boolean;
}

export type ServingStyle = 'kulhad' | 'glass' | 'flask';
export type Sweetener = 'jaggery' | 'honey' | 'stevia' | 'raw_sugar' | 'no_sugar';
export type MilkChoice = 'desi_cow' | 'buffalo' | 'oat' | 'water_decoction';
export type SpiceIntensity = 'mild' | 'regular' | 'kadak';

export interface HerbalBooster {
  id: string;
  name: string;
  hindi: string;
  benefit: string;
  price: number;
}

export interface CartItem {
  cartId: string;
  chai: ChaiItem;
  servingStyle: ServingStyle;
  sweetener: Sweetener;
  milk: MilkChoice;
  spiceIntensity: SpiceIntensity;
  boosters: HerbalBooster[];
  quantity: number;
  itemTotal: number;
}

export interface OrderFulfillment {
  type: 'takeaway' | 'table';
  pickupETA?: string;
  tableNumber?: string;
  customerName: string;
  phone: string;
  notes?: string;
}

export interface PlacedOrder {
  id: string;
  rxNumber: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  fulfillment: OrderFulfillment;
  paymentMethod: 'upi' | 'cash_counter' | 'card';
  status: 'brewing' | 'infusing' | 'poured' | 'ready';
}

export interface SymptomPreset {
  id: string;
  symptomTitle: string;
  hindiAilment: string;
  description: string;
  recommendedChaiId: string;
  recommendedBoosterId: string;
  vaidyaNotes: string;
  quickDosage: string;
}
