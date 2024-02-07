export interface OrgCourseListResponses {
  courseCount: number;
  courses: {
    course_type: number;
    tags: string[];
    title: string;
    short_description: string;
    class_type: number;
    logo_file_url: null | string;
    enrolled_role_period: null | string;
    enrolled_role_begin_datetime: number | null;
    enrolled_role_end_datetime: number | null;
    begin_datetime: number;
    end_datetime: null | number;
    is_discounted: boolean;
    discounted_price: string;
    discounted_price_usd: string;
    discount_rate: null | any;
    price: string;
    price_usd: string;
    enroll_type: number;
    is_free: boolean;
  }[];
}
