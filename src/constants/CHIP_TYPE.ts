import { ChipInformation, ChipType, ChipValue } from '@/types/Chip';

export const CHIPS: Record<ChipType, Record<ChipValue, ChipInformation>> = {
  price: {
    free: {
      value: 'free',
      title: '무료',
      params: {
        is_free: true,
        enroll_type: 0,
      },
    },
    paid: {
      value: 'paid',
      title: '유료',
      params: {
        is_free: false,
        enroll_type: 0,
      },
    },
  },
};

export const CHIPS_ARRAY = Object.keys(CHIPS) as ChipType[];
