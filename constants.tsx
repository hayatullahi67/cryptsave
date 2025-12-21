
import { Transaction } from './types';

export const COLORS = {
  gold: '#EAB308',
  darkGold: '#A16207',
  black: '#000000',
  darkGray: '#1C1C1E',
  lightGray: '#2C2C2E',
};

// Fix: Explicitly typing MOCK_TRANSACTIONS as Transaction[] to ensure the 'type' property 
// is correctly inferred as a union of specific literals instead of a generic string.
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    title: 'Apple Pay Deposit',
    date: '30 Sep, 09:09 AM',
    amount: '+482.09',
    icon: 'apple',
  },
  {
    id: '2',
    type: 'withdrawal',
    title: 'Savings withdrawal',
    date: '02 Sep, 10:09 AM',
    amount: '-234.00',
    icon: 'arrow-up',
  },
  {
    id: '3',
    type: 'deposit',
    title: 'Referral Reward',
    date: '28 Aug, 04:30 PM',
    amount: '+50.00',
    icon: 'gift',
  },
  {
    id: '4',
    type: 'deposit',
    title: 'Amazon Refund',
    date: '25 Aug, 11:20 AM',
    amount: '+120.50',
    icon: 'apple',
  },
  {
    id: '5',
    type: 'withdrawal',
    title: 'Netflix Subscription',
    date: '20 Aug, 08:00 PM',
    amount: '-15.99',
    icon: 'arrow-up',
  },
  {
    id: '6',
    type: 'deposit',
    title: 'Bonus Credit',
    date: '15 Aug, 02:15 PM',
    amount: '+25.00',
    icon: 'gift',
  },
  {
    id: '7',
    type: 'withdrawal',
    title: 'Starbucks Coffee',
    date: '12 Aug, 09:30 AM',
    amount: '-5.50',
    icon: 'arrow-up',
  }
];
