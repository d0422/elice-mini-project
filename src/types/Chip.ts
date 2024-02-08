export type ChipType = 'price';
export type ChipValue = PriceChipValue;

export type PriceChipValue = 'free' | 'paid';

export interface ChipsParams {
  is_free: boolean;
  enroll_type: 0 | 4;
}

export interface ChipInformation {
  value: ChipValue;
  title: string;
  params: ChipsParams;
}
