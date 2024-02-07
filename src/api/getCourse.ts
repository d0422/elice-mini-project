import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import axios from 'axios';

export interface GetCourseParams {
  title: string;
  is_free?: boolean;
  enroll_type?: 0 | 4;
  offset?: number;
}

export default async function getCourse({
  title,
  is_free,
  enroll_type,
  offset,
}: GetCourseParams) {
  const result = await axios.get<OrgCourseListResponses>('/api/getCourse', {
    params: {
      filter_conditions: JSON.stringify({
        $and: [{ title: `%${title}%` }, { $or: [{ enroll_type, is_free }] }],
      }),
      offset: offset || 0,
      count: 20,
    },
  });

  return result.data;
}
