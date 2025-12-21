
export type AppView = 'onboarding' | 'home' | 'wallet' | 'profile' | 'scan' | 'history' | 'success' | 'declined';

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
  icon: 'home' | 'car' | 'gift';
}
