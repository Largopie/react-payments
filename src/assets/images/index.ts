import { default as VISA } from './visa.png';
import { default as MASTERCARD } from './mastercard.png';
import { default as DINERS } from './diners.png';
import { default as AMEX } from './amex.png';
import { default as UNIONPAY } from './unionpay.png';

export const CARD_BRAND_IMAGE = {
  visa: VISA,
  mastercard: MASTERCARD,
  diners: DINERS,
  amex: AMEX,
  unionpay: UNIONPAY,
} as const;
