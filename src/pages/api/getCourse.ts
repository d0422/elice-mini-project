import { COURSE_OBJECT_KEYS } from '@/constants/COURSE_OBJECT_KEYS';
import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrgCourseListResponses>
) {
  const response = await axios.get<OrgCourseListResponses>(
    'https://api-rest.elice.io/org/academy/course/list/',
    {
      params: { ...req.query, offset: 0, count: 20 },
    }
  );

  const result = { ...response.data };
  if (result.courses.length) {
    result.courses.forEach((eachCourse) => {
      const keys = Object.keys(eachCourse);
      keys.forEach((key) => {
        if (!COURSE_OBJECT_KEYS.find((objectKey) => objectKey === key))
          delete eachCourse[key as keyof OrgCourseListResponses['courses'][0]];
      });
    });
  }

  res.status(200).json(result);
}
