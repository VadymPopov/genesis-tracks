import { useRouter, useSearchParams } from 'next/navigation';

export const useUpdateQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParam = (paramsToUpdate: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    for (const [name, value] of Object.entries(paramsToUpdate))
      if (value) {
        newParams.set(name, value);
      } else {
        newParams.delete(name);
      }

    router.push(`?${newParams.toString()}`);
  };

  return updateQueryParam;
};
