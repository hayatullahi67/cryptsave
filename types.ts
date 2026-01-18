export type AppView = 'onboarding' | 'login' | 'signup' | 'home' | 'wallet' | 'profile' | 'settings' | 'scan' | 'history' | 'success' | 'declined' | 'save-funds' | 'withdraw-funds' | 'create-goal' | 'view-receipt' | 'buy-airtime' | 'buy-data' | 'transfer-funds' | 'exchange' | 'p2p-chat' | 'buy-electricity' | 'buy-tv' | 'apply-card' | 'buy-giftcard' | 'conversion' | 'about-us';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'reward';
  title: string;
  date: string;
  amount: string;
  icon: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  remaining: string;
  icon: 'home' | 'car' | 'gift' | 'travel' | 'tech' | 'health';
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}