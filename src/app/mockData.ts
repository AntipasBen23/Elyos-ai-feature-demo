import { Campaign, Customer, SuggestedCampaign, CustomerCampaignStatus } from './types';

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: 'cust_001',
    name: 'Sarah Mitchell',
    phone: '+44 7700 900123',
    email: 'sarah.mitchell@email.com',
    address: '42 Oak Street, London SW1A 1AA',
    lastService: '2024-03-15',
    nextServiceDue: '2025-03-15',
    serviceType: 'Boiler Annual Service',
    preferredChannel: 'sms',
    lifetimeValue: 2850
  },
  {
    id: 'cust_002',
    name: 'James Robertson',
    phone: '+44 7700 900456',
    email: 'j.robertson@email.com',
    address: '156 High Street, Manchester M1 1AD',
    lastService: '2024-02-20',
    nextServiceDue: '2025-02-20',
    serviceType: 'Boiler Annual Service',
    preferredChannel: 'whatsapp',
    lifetimeValue: 3200
  },
  {
    id: 'cust_003',
    name: 'Emma Thompson',
    phone: '+44 7700 900789',
    email: 'emma.t@email.com',
    address: '89 Park Lane, Birmingham B1 1BB',
    lastService: '2024-03-10',
    nextServiceDue: '2025-03-10',
    serviceType: 'Boiler Annual Service',
    preferredChannel: 'email',
    lifetimeValue: 1950
  },
  {
    id: 'cust_004',
    name: 'David Williams',
    phone: '+44 7700 900321',
    email: 'david.w@email.com',
    address: '23 Church Road, Leeds LS1 1UR',
    lastService: '2024-03-05',
    nextServiceDue: '2025-03-05',
    serviceType: 'Boiler Annual Service',
    preferredChannel: 'voice',
    lifetimeValue: 4100
  },
  {
    id: 'cust_005',
    name: 'Sophie Anderson',
    phone: '+44 7700 900654',
    email: 'sophie.a@email.com',
    address: '67 Bridge Street, Liverpool L1 1JQ',
    lastService: '2024-03-12',
    nextServiceDue: '2025-03-12',
    serviceType: 'Boiler Annual Service',
    preferredChannel: 'sms',
    lifetimeValue: 2300
  }
];

// Generate 495 more mock customers to make 500 total
for (let i = 6; i <= 500; i++) {
  const channels = ['sms', 'whatsapp', 'email', 'voice'] as const;
  mockCustomers.push({
    id: `cust_${String(i).padStart(3, '0')}`,
    name: `Customer ${i}`,
    phone: `+44 7700 ${String(900000 + i).slice(-6)}`,
    email: `customer${i}@email.com`,
    address: `${i} Sample Street, London W1A 1AA`,
    lastService: '2024-03-01',
    nextServiceDue: '2025-03-01',
    serviceType: 'Boiler Annual Service',
    preferredChannel: channels[i % 4],
    lifetimeValue: Math.floor(Math.random() * 3000) + 1500
  });
}

// Mock Campaign
export const mockCampaign: Campaign = {
  id: 'camp_001',
  name: 'March Boiler Service Reminders',
  description: 'Annual boiler service reminders for customers due in March 2025',
  status: 'ready',
  targetCustomers: 500,
  channels: ['sms', 'whatsapp', 'email', 'voice'],
  createdAt: '2025-01-20T10:00:00Z',
  scheduledFor: '2025-01-20T14:00:00Z',
  estimatedRevenue: 24500,
  actualRevenue: 0,
  messages: {
    sms: "Hi {{name}}, your boiler service at {{address}} is due on {{date}}. Can I book you in? Reply YES to confirm.",
    whatsapp: "Hi {{name}}! 👋\n\nYour annual boiler service is due. We can book you in for {{date}} at {{time}}.\n\nReply to confirm!",
    email: "Dear {{name}},\n\nThis is a friendly reminder that your annual boiler service at {{address}} is due.\n\nBook now to ensure your heating stays efficient and safe.",
    voice: "Hello {{name}}, this is Elyos AI calling about your boiler service due at {{address}}. Press 1 to book an appointment."
  }
};

// Suggested Campaigns
export const suggestedCampaigns: SuggestedCampaign[] = [
  {
    id: 'sug_001',
    title: 'Winter Heating Check Campaign',
    description: 'Proactive heating system checks before cold weather',
    reason: 'Cold snap predicted for next week. 230 customers haven\'t had winter checks.',
    targetCount: 230,
    estimatedRevenue: 11500,
    urgency: 'high',
    icon: '❄️'
  },
  {
    id: 'sug_002',
    title: 'Dormant Customer Reactivation',
    description: 'Win back customers who haven\'t used services in 18+ months',
    reason: '145 customers inactive. Average reactivation value: £850.',
    targetCount: 145,
    estimatedRevenue: 12325,
    urgency: 'medium',
    icon: '🔄'
  },
  {
    id: 'sug_003',
    title: 'Smart Thermostat Upgrade Offer',
    description: 'Upsell smart thermostats to recent service customers',
    reason: '89 customers serviced in last 30 days. High conversion rate on upsells.',
    targetCount: 89,
    estimatedRevenue: 8900,
    urgency: 'low',
    icon: '🌡️'
  }
];

// Generate initial customer statuses for campaign
export const generateInitialCustomerStatuses = (): CustomerCampaignStatus[] => {
  return mockCustomers.map(customer => ({
    customerId: customer.id,
    status: 'pending',
    channel: customer.preferredChannel,
    message: mockCampaign.messages[customer.preferredChannel] || ''
      .replace('{{name}}', customer.name)
      .replace('{{address}}', customer.address)
      .replace('{{date}}', customer.nextServiceDue)
      .replace('{{time}}', '2:00 PM')
  }));
};

// Simulate realistic campaign results
export const simulateCampaignResults = (total: number) => {
  const delivered = Math.floor(total * 0.96); // 96% delivery rate
  const opened = Math.floor(delivered * 0.71); // 71% open rate
  const responded = Math.floor(opened * 0.36); // 36% response rate
  const booked = Math.floor(responded * 0.61); // 61% booking rate from responses
  const failed = total - delivered;
  const revenue = booked * 49; // £49 average per booking
  const conversionRate = (booked / total) * 100;

  return {
    delivered,
    opened,
    responded,
    booked,
    failed,
    revenue,
    conversionRate: parseFloat(conversionRate.toFixed(2))
  };
};