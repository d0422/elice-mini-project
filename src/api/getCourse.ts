import { PAGE } from '@/constants/PAGE';
import { ChipsParams } from '@/types/Chip';
import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import axios from 'axios';

export interface GetCourseParams {
  title: string;
  chips: ChipsParams[];
  offset?: number;
}

export default async function getCourse({
  title,
  chips,
  offset,
}: GetCourseParams) {
  const result = await axios.get<OrgCourseListResponses>('/api/getCourse', {
    params: {
      filter_conditions: JSON.stringify({
        $and: [{ title: `%${title}%` }, { $or: [...chips] }],
      }),
      offset: offset || 0,
      count: PAGE.PAGE_EACH_ELEMENT_COUNT,
    },
  });

  return result.data;
}
