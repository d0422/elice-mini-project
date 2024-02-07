import { ChipsParams } from '@/api/getCourse';

export type ChipType = 'price';
export type ChipValue = PriceChipValue;

export type PriceChipValue = 'free' | 'paid';

interface ChipInformation {
  value: ChipValue;
  title: string;
  params: ChipsParams;
}

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
