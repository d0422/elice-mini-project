import CalendarIconSVG from '@/components/svg/CalendarIIconSVG';
import ChartIconSVG from '@/components/svg/ChartIconSVG';
import LabtopIconSVG from '@/components/svg/LabtopIconSVG';
import { SVGProps } from '@/components/svg/type';
import { FunctionComponent } from 'react';

interface CourseInfoIcons {
  [key: string]: { Icon: FunctionComponent<SVGProps>; information: string };
}

export const COURSE_INFO_ICONS: CourseInfoIcons = {
  HARD: {
    Icon: ChartIconSVG,
    information: '난이도: 미설정',
  },
  CLASS_TYPE: {
    Icon: LabtopIconSVG,
    information: '수업: 온라인',
  },
  DURATION: {
    Icon: CalendarIconSVG,
    information: '기간: 무제한',
  },
};

export const COURSE_INFO_ICONS_ARRAY = Object.values(COURSE_INFO_ICONS);
