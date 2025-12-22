export type AppView = 'onboarding' | 'home' | 'wallet' | 'profile' | 'scan' | 'history' | 'success' | 'declined' | 'save-funds' | 'withdraw-funds' | 'create-goal' | 'view-receipt';

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