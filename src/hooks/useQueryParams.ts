import { QueryKey } from '@/types/QueryKey';
import {
  addEachQueryValue,
  alreadyExistQueryValue,
  removeEachQueryValue,
} from '@/utils/routerQueryString';
import { useRouter } from 'next/router';

export default function useQueryParams() {
  const router = useRouter();

  const add = (key: QueryKey, value: string) => {
    const currentQueryValue = addEachQueryValue(router.query[key], value);
    router.push({
      query: {
        ...router.query,
        [key]: currentQueryValue,
      },
    });
  };

  const remove = (key: QueryKey, value: string) => {
    const currentQueryValue = removeEachQueryValue(router.query[key], value);
    if (currentQueryValue)
      router.push({
        query: {
          ...router.query,
          [key]: currentQueryValue,
        },
      });
    else {
      delete router.query[key];
      router.push(router);
    }
  };

  const clear = (key: QueryKey) => {
    delete router.query[key];
    router.push(router);
  };

  const change = (key: QueryKey, value: string) => {
    router.push({ query: { ...router.query, [key]: value } });
  };

  const getValue = (key: QueryKey) => {
    return router.query[key];
  };

  const search = (key: QueryKey, searchValue: string) => {
    return alreadyExistQueryValue(router.query[key], searchValue);
  };

  return { add, remove, clear, change, getValue, search };
}
