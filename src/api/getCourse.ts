import { PAGE } from '@/constants/PAGE';
import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import axios from 'axios';

export interface ChipsParams {
  is_free: boolean;
  enroll_type: 0 | 4;
}
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
