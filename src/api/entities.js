import { supabase } from '@/integrations/supabase/client';

// Helper to get current user
export const User = {
  me: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
  signUp: async (credentials) => {
    return await supabase.auth.signUp(credentials);
  },
  signIn: async (credentials) => {
    return await supabase.auth.signInWithPassword(credentials);
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  }
};

// Stock entity
export const Stock = {
  list: async () => {
    const { data, error } = await supabase.from('stocks').select('*');
    if (error) throw error;
    return data;
  },
  get: async (id) => {
    const { data, error } = await supabase.from('stocks').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (stock) => {
    const { data, error } = await supabase.from('stocks').insert(stock).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('stocks').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  delete: async (id) => {
    const { error } = await supabase.from('stocks').delete().eq('id', id);
    if (error) throw error;
  }
};

// ChatRoom entity
export const ChatRoom = {
  list: async () => {
    const { data, error } = await supabase.from('chat_rooms').select('*');
    if (error) throw error;
    return data;
  },
  get: async (id) => {
    const { data, error } = await supabase.from('chat_rooms').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (room) => {
    const { data, error } = await supabase.from('chat_rooms').insert(room).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('chat_rooms').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  delete: async (id) => {
    const { error } = await supabase.from('chat_rooms').delete().eq('id', id);
    if (error) throw error;
  }
};

// Message entity
export const Message = {
  list: async (roomId) => {
    const { data, error } = await supabase.from('chat_messages').select('*').eq('room_id', roomId).order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  },
  create: async (message) => {
    const { data, error } = await supabase.from('chat_messages').insert(message).select().single();
    if (error) throw error;
    return data;
  }
};

// Poll entity
export const Poll = {
  list: async () => {
    const { data, error } = await supabase.from('polls').select('*');
    if (error) throw error;
    return data;
  },
  get: async (id) => {
    const { data, error } = await supabase.from('polls').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (poll) => {
    const { data, error } = await supabase.from('polls').insert(poll).select().single();
    if (error) throw error;
    return data;
  }
};

// PollVote entity
export const PollVote = {
  list: async (pollId) => {
    const { data, error } = await supabase.from('poll_votes').select('*').eq('poll_id', pollId);
    if (error) throw error;
    return data;
  },
  create: async (vote) => {
    const { data, error } = await supabase.from('poll_votes').insert(vote).select().single();
    if (error) throw error;
    return data;
  }
};

// Subscription entity
export const Subscription = {
  list: async () => {
    const { data, error } = await supabase.from('subscriptions').select('*');
    if (error) throw error;
    return data;
  },
  get: async (id) => {
    const { data, error } = await supabase.from('subscriptions').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (subscription) => {
    const { data, error } = await supabase.from('subscriptions').insert(subscription).select().single();
    if (error) throw error;
    return data;
  }
};

// Event entity
export const Event = {
  list: async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;
    return data;
  },
  get: async (id) => {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (event) => {
    const { data, error } = await supabase.from('events').insert(event).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('events').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
};

// EventAttendee entity
export const EventAttendee = {
  list: async (eventId) => {
    const { data, error } = await supabase.from('event_attendees').select('*').eq('event_id', eventId);
    if (error) throw error;
    return data;
  },
  create: async (attendee) => {
    const { data, error } = await supabase.from('event_attendees').insert(attendee).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('event_attendees').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
};

// EventTicket entity (alias for EventAttendee)
export const EventTicket = EventAttendee;

// Notification entity
export const Notification = {
  list: async () => {
    const user = await User.me();
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  create: async (notification) => {
    const { data, error } = await supabase.from('notifications').insert(notification).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('notifications').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
};

// RefundRequest entity
export const RefundRequest = {
  list: async () => {
    const { data, error } = await supabase.from('refund_requests').select('*');
    if (error) throw error;
    return data;
  },
  create: async (request) => {
    const { data, error } = await supabase.from('refund_requests').insert(request).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('refund_requests').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
};

// Feedback entity
export const Feedback = {
  list: async () => {
    const { data, error } = await supabase.from('feedback').select('*');
    if (error) throw error;
    return data;
  },
  create: async (feedback) => {
    const { data, error } = await supabase.from('feedback').insert(feedback).select().single();
    if (error) throw error;
    return data;
  }
};

// Review entity
export const Review = {
  list: async (entityType, entityId) => {
    let query = supabase.from('reviews').select('*');
    if (entityType) query = query.eq('entity_type', entityType);
    if (entityId) query = query.eq('entity_id', entityId);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  create: async (review) => {
    const { data, error } = await supabase.from('reviews').insert(review).select().single();
    if (error) throw error;
    return data;
  }
};

// Placeholder entities (return empty arrays for now)
const createPlaceholderEntity = (name) => ({
  list: async () => [],
  get: async () => null,
  create: async () => ({ id: crypto.randomUUID() }),
  update: async () => ({}),
  delete: async () => {}
});

export const Pledge = createPlaceholderEntity('Pledge');
export const FinInfluencer = createPlaceholderEntity('FinInfluencer');
export const InfluencerPost = createPlaceholderEntity('InfluencerPost');
export const News = createPlaceholderEntity('News');
export const Meeting = createPlaceholderEntity('Meeting');
export const StockPrice = createPlaceholderEntity('StockPrice');
export const ChatPoll = createPlaceholderEntity('ChatPoll');
export const ChatPollVote = createPlaceholderEntity('ChatPollVote');
export const TrustScoreLog = createPlaceholderEntity('TrustScoreLog');
export const ModerationLog = createPlaceholderEntity('ModerationLog');
export const Referral = createPlaceholderEntity('Referral');
export const ReferralBadge = createPlaceholderEntity('ReferralBadge');
export const ContactInquiry = createPlaceholderEntity('ContactInquiry');
export const NotificationSetting = createPlaceholderEntity('NotificationSetting');
export const Course = createPlaceholderEntity('Course');
export const CourseEnrollment = createPlaceholderEntity('CourseEnrollment');
export const RevenueTransaction = createPlaceholderEntity('RevenueTransaction');
export const Advisor = createPlaceholderEntity('Advisor');
export const AdvisorPlan = createPlaceholderEntity('AdvisorPlan');
export const AdvisorSubscription = createPlaceholderEntity('AdvisorSubscription');
export const AdvisorPost = createPlaceholderEntity('AdvisorPost');
export const CommissionTracking = createPlaceholderEntity('CommissionTracking');
export const PlatformSetting = createPlaceholderEntity('PlatformSetting');
export const AdvisorReview = createPlaceholderEntity('AdvisorReview');
export const Watchlist = createPlaceholderEntity('Watchlist');
export const UserInvestment = createPlaceholderEntity('UserInvestment');
export const AlertSetting = createPlaceholderEntity('AlertSetting');
export const StockTransaction = createPlaceholderEntity('StockTransaction');
export const Expense = createPlaceholderEntity('Expense');
export const FinancialAuditLog = createPlaceholderEntity('FinancialAuditLog');
export const Role = createPlaceholderEntity('Role');
export const AlertConfiguration = createPlaceholderEntity('AlertConfiguration');
export const AlertLog = createPlaceholderEntity('AlertLog');
export const SubscriptionPlan = createPlaceholderEntity('SubscriptionPlan');
export const PromoCode = createPlaceholderEntity('PromoCode');
export const SubscriptionTransaction = createPlaceholderEntity('SubscriptionTransaction');
export const EntityConfig = createPlaceholderEntity('EntityConfig');
export const Educator = createPlaceholderEntity('Educator');
export const Permission = createPlaceholderEntity('Permission');
export const RolePermission = createPlaceholderEntity('RolePermission');
export const AuditLog = createPlaceholderEntity('AuditLog');
export const RoleTemplate = createPlaceholderEntity('RoleTemplate');
export const RoleTemplatePermission = createPlaceholderEntity('RoleTemplatePermission');
export const PayoutRequest = createPlaceholderEntity('PayoutRequest');
export const AdvisorRecommendation = createPlaceholderEntity('AdvisorRecommendation');
export const UserInvite = createPlaceholderEntity('UserInvite');
export const EventCommissionTracking = createPlaceholderEntity('EventCommissionTracking');
export const CommissionSettings = createPlaceholderEntity('CommissionSettings');
export const PledgeSession = createPlaceholderEntity('PledgeSession');
export const UserDematAccount = createPlaceholderEntity('UserDematAccount');
export const PledgePayment = createPlaceholderEntity('PledgePayment');
export const PledgeExecutionRecord = createPlaceholderEntity('PledgeExecutionRecord');
export const PledgeAuditLog = createPlaceholderEntity('PledgeAuditLog');
export const PledgeAccessRequest = createPlaceholderEntity('PledgeAccessRequest');
export const Vendor = createPlaceholderEntity('Vendor');
export const AdCampaign = createPlaceholderEntity('AdCampaign');
export const AdImpression = createPlaceholderEntity('AdImpression');
export const AdClick = createPlaceholderEntity('AdClick');
export const AdTransaction = createPlaceholderEntity('AdTransaction');
export const CampaignBilling = createPlaceholderEntity('CampaignBilling');
export const FundPlan = createPlaceholderEntity('FundPlan');
export const InvestorRequest = createPlaceholderEntity('InvestorRequest');
export const Investor = createPlaceholderEntity('Investor');
export const FundWallet = createPlaceholderEntity('FundWallet');
export const FundAllocation = createPlaceholderEntity('FundAllocation');
export const FundTransaction = createPlaceholderEntity('FundTransaction');
export const FundInvoice = createPlaceholderEntity('FundInvoice');
export const FundPayoutRequest = createPlaceholderEntity('FundPayoutRequest');
export const FundAdmin = createPlaceholderEntity('FundAdmin');
export const FundNotification = createPlaceholderEntity('FundNotification');
export const FundWithdrawalRequest = createPlaceholderEntity('FundWithdrawalRequest');
export const InvestmentRequest = createPlaceholderEntity('InvestmentRequest');
export const InvestmentAllocation = createPlaceholderEntity('InvestmentAllocation');
export const ProfitPayoutSchedule = createPlaceholderEntity('ProfitPayoutSchedule');
export const InvestorProfitPayout = createPlaceholderEntity('InvestorProfitPayout');
export const FeatureConfig = createPlaceholderEntity('FeatureConfig');
export const ModuleApprovalRequest = createPlaceholderEntity('ModuleApprovalRequest');
export const EventOrganizer = createPlaceholderEntity('EventOrganizer');
export const PledgeOrder = createPlaceholderEntity('PledgeOrder');
export const MessageReaction = createPlaceholderEntity('MessageReaction');
export const TypingIndicator = createPlaceholderEntity('TypingIndicator');
