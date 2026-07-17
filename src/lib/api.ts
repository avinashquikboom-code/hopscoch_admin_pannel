/**
 * Shared API utility for admin panel.
 * All API calls use this helper — never hardcode data in pages.
 */

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.fciseller.com';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const api = {
  // Dashboard
  dashboard: {
    getStats: () => apiRequest<any>('/api/admin/dashboard'),
  },

  // Profile
  profile: {
    get: () => apiRequest<any>('/api/admin/profile'),
    update: (body: Record<string, any>) =>
      apiRequest<any>('/api/admin/profile', { method: 'PUT', body: JSON.stringify(body) }),
  },

  // Orders
  orders: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/orders${qs}`);
    },
    getById: (id: string) => apiRequest<any>(`/api/orders/${id}`),
    cancel: (id: string) =>
      apiRequest<any>(`/api/orders/${id}/cancel`, { method: 'PATCH' }),
  },

  // Products
  products: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/products${qs}`);
    },
    getById: (id: string) => apiRequest<any>(`/api/products/${id}`),
  },

  // Categories
  categories: {
    getAll: () => apiRequest<any>('/api/categories'),
    getById: (id: string) => apiRequest<any>(`/api/categories/${id}`),
  },

  // Inventory
  inventory: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/inventory${qs}`);
    },
    getLowStock: () => apiRequest<any>('/api/inventory/alerts/low-stock'),
    getMovements: () => apiRequest<any>('/api/inventory/movements'),
    updateThreshold: (body: Record<string, any>) =>
      apiRequest<any>('/api/inventory/threshold', { method: 'PATCH', body: JSON.stringify(body) }),
    createMovement: (body: Record<string, any>) =>
      apiRequest<any>('/api/inventory/movements', { method: 'POST', body: JSON.stringify(body) }),
  },

  // Customers
  customers: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/users${qs}`);
    },
    getById: (id: string) => apiRequest<any>(`/api/users/${id}`),
  },

  // Returns
  returns: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/returns${qs}`);
    },
    getById: (id: string) => apiRequest<any>(`/api/returns/${id}`),
    updateStatus: (id: string, status: string) =>
      apiRequest<any>(`/api/returns/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  },

  // Reviews
  reviews: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/reviews${qs}`);
    },
    approve: (id: string) =>
      apiRequest<any>(`/api/reviews/${id}/approve`, { method: 'PATCH' }),
    reject: (id: string) =>
      apiRequest<any>(`/api/reviews/${id}/reject`, { method: 'PATCH' }),
  },

  // Coupons
  coupons: {
    getAll: () => apiRequest<any>('/api/coupons'),
    create: (body: Record<string, any>) =>
      apiRequest<any>('/api/coupons', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Record<string, any>) =>
      apiRequest<any>(`/api/coupons/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id: string) =>
      apiRequest<any>(`/api/coupons/${id}`, { method: 'DELETE' }),
  },

  // Payments
  payments: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/payments${qs}`);
    },
    refunds: {
      getAll: () => apiRequest<any>('/api/payments/refunds'),
    },
  },

  // Reports
  reports: {
    getSales: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/reports/sales${qs}`);
    },
    getInventory: () => apiRequest<any>('/api/reports/inventory'),
    getCustomers: () => apiRequest<any>('/api/reports/customers'),
    getOrders: () => apiRequest<any>('/api/reports/orders'),
    getDashboard: () => apiRequest<any>('/api/reports/dashboard'),
  },

  // Shipping
  shipping: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiRequest<any>(`/api/shipments${qs}`);
    },
  },

  // Settings
  settings: {
    get: () => apiRequest<any>('/api/settings'),
    update: (body: Record<string, any>) =>
      apiRequest<any>('/api/settings', { method: 'PUT', body: JSON.stringify(body) }),
  },

  // Notifications
  notifications: {
    getAll: () => apiRequest<any>('/api/notifications'),
    markRead: (id: string) =>
      apiRequest<any>(`/api/notifications/${id}/read`, { method: 'PATCH' }),
    markAllRead: () =>
      apiRequest<any>('/api/notifications/read-all', { method: 'PATCH' }),
  },

  // Activity logs
  activityLogs: {
    getAll: () => apiRequest<any>('/api/admin/activity-logs'),
  },
};

export default api;
