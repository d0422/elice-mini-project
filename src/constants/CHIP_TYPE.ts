export type ChipType = 'paid' | 'free';

interface ChipInformation {
  query: ChipType;
  title: string;
}

export const CHIPS: Record<ChipType, ChipInformation> = {
  free: {
    query: 'free',
    title: '무료',
  },
  paid: {
    query: 'paid',
    title: '유료',
  },
};

export const CHIPS_ARRAY = Object.values(CHIPS);
