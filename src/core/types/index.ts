// Core Types for AURA COUTURE Admin Panel

export type UserRole = 'admin' | 'manager' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  barcode?: string;
  price: number;
  mrp: number;
  discount?: number;
  discountType?: 'percentage' | 'flat';
  stock: number;
  lowStockThreshold: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  brandId: string;
  categoryId: string;
  subCategoryId?: string;
  collectionIds: string[];
  tags: string[];
  keywords: string[];
  specifications: Record<string, string>;
  colors: string[];
  sizes: string[];
  variants: ProductVariant[];
  images: ProductImage[];
  thumbnail: string;
  status: 'active' | 'inactive' | 'draft';
  isFeatured: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  seo: SEO;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  color?: string;
  size?: string;
  image?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isThumbnail: boolean;
  order: number;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
  order: number;
  isVisible: boolean;
  seo: SEO;
  createdAt: Date;
  updatedAt: Date;
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo: string;
  banner?: string;
  website?: string;
  status: 'active' | 'inactive';
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  type: 'summer' | 'winter' | 'festival' | 'luxury' | 'featured' | 'custom';
  productIds: string[];
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  order: number;
  seo: SEO;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: Customer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  timeline: OrderTimeline[];
  couponCode?: string;
  couponDiscount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export interface OrderTimeline {
  id: string;
  status: OrderStatus;
  note?: string;
  createdAt: Date;
  createdBy: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

// Customer Types
export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[];
  orders: Order[];
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  status: 'active' | 'inactive' | 'blocked';
  lastOrderDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Coupon Types
export type CouponType = 'percentage' | 'flat';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minimumOrder?: number;
  maximumDiscount?: number;
  expiryDate: Date;
  usageLimit?: number;
  usedCount: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customer?: Customer;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected';
  isVerified: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Banner Types
export type BannerType = 'home' | 'offer' | 'slider' | 'popup';

export interface Banner {
  id: string;
  title: string;
  image: string;
  mobileImage?: string;
  link?: string;
  type: BannerType;
  position: number;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Types
export type NotificationType = 'offer' | 'coupon' | 'order' | 'general';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  targetUsers?: string[];
  sendToAll: boolean;
  imageUrl?: string;
  link?: string;
  isSent: boolean;
  sentAt?: Date;
  createdAt: Date;
}

// Content Types
export interface Content {
  id: string;
  type: 'about' | 'privacy' | 'terms' | 'faq' | 'contact' | 'help';
  title: string;
  content: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Settings Types
export interface GeneralSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  logo: string;
  favicon: string;
  currency: string;
  language: string;
  timezone: string;
}

export interface TaxSettings {
  taxEnabled: boolean;
  taxRate: number;
  taxIncluded: boolean;
}

export interface ShippingSettings {
  freeShippingThreshold: number;
  shippingRates: ShippingRate[];
}

export interface ShippingRate {
  id: string;
  name: string;
  rate: number;
  countries: string[];
}

export interface PaymentSettings {
  enabledMethods: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  isActive: boolean;
}

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
}

// Language Types
export interface Language {
  id: string;
  code: string;
  name: string;
  flag: string;
  isDefault: boolean;
  isEnabled: boolean;
  translations: Record<string, string>;
}

// Currency Types
export interface Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number;
  isDefault: boolean;
  isEnabled: boolean;
}

// Visual Search Types
export interface VisualSearch {
  id: string;
  productId: string;
  imageUrl: string;
  metadata: AIMetadata;
  similarProducts: string[];
  createdAt: Date;
}

export interface AIMetadata {
  colors: string[];
  patterns: string[];
  style: string[];
  category: string;
  confidence: number;
}

// Report Types
export type ReportType = 'sales' | 'customer' | 'order' | 'product' | 'inventory';

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  data: any;
  filters: ReportFilters;
  generatedAt: Date;
}

export interface ReportFilters {
  startDate?: Date;
  endDate?: Date;
  category?: string;
  brand?: string;
}

// Dashboard Types
export interface DashboardStats {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
  pendingOrders: number;
  cancelledOrders: number;
  deliveredOrders: number;
  lowStock: number;
  todaySales: number;
  monthlySales: number;
  yearlySales: number;
  visitors: number;
}

export interface SalesAnalytics {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  image: string;
  sales: number;
  revenue: number;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Table Types
export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
}

export interface TableFilters {
  search?: string;
  status?: string;
  [key: string]: any;
}
