import { COURSE_OBJECT_KEYS } from '@/constants/COURSE_OBJECT_KEYS';
import {
  OrgCourseData,
  OrgCourseListResponses,
} from '@/types/OrgCourseListResponse';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrgCourseListResponses>
) {
  const response = await axios.get<OrgCourseListResponses>(
    'https://api-rest.elice.io/org/academy/course/list/',
    {
      params: { ...req.query },
    }
  );

  const result = { ...response.data };
  if (result.courses.length) {
    result.courses.forEach((eachCourse) => {
      const keys = Object.keys(eachCourse);
      keys.forEach((key) => {
        if (!COURSE_OBJECT_KEYS.find((objectKey) => objectKey === key))
          delete eachCourse[key as keyof OrgCourseData];
      });
    });
  }

  res.status(200).json(result);
}
