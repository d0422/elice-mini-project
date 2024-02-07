import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import axios from 'axios';

export interface GetCourseParams {
  title: string;
  is_free?: boolean;
  enroll_type?: 0 | 4;
}

export default async function getCourse({
  title,
  is_free,
  enroll_type,
}: GetCourseParams) {
  const result = await axios.get<OrgCourseListResponses>('/api/getCourse', {
    params: {
      filter_conditions: JSON.stringify({
        $and: [{ title: `%${title}%` }, { $or: [{ enroll_type, is_free }] }],
      }),
    },
  });

  return result.data;
}
