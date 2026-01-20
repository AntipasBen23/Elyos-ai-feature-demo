export type CampaignStatus = 'draft' | 'ready' | 'running' | 'completed' | 'paused';

export type ChannelType = 'sms' | 'whatsapp' | 'email' | 'voice';

export type CustomerStatus = 'pending' | 'sent' | 'delivered' | 'opened' | 'responded' | 'booked' | 'failed';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  lastService: string;
  nextServiceDue: string;
  serviceType: string;
  preferredChannel: ChannelType;
  lifetimeValue: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  targetCustomers: number;
  channels: ChannelType[];
  createdAt: string;
  scheduledFor: string;
  estimatedRevenue: number;
  actualRevenue: number;
  messages: {
    sms?: string;
    whatsapp?: string;
    email?: string;
    voice?: string;
  };
}

export interface CampaignMetrics {
  totalSent: number;
  delivered: number;
  opened: number;
  responded: number;
  booked: number;
  failed: number;
  revenue: number;
  conversionRate: number;
}

export interface CustomerCampaignStatus {
  customerId: string;
  status: CustomerStatus;
  channel: ChannelType;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  respondedAt?: string;
  bookedAt?: string;
  message: string;
}

export interface SuggestedCampaign {
  id: string;
  title: string;
  description: string;
  reason: string;
  targetCount: number;
  estimatedRevenue: number;
  urgency: 'high' | 'medium' | 'low';
  icon: string;
}