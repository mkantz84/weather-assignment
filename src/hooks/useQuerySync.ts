import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useQuerySync(params: Record<string, string>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current values from URL
  const current: Record<string, string> = {};
  Object.keys(params).forEach((key) => {
    const value = searchParams.get(key);
    if (value !== null) current[key] = value;
  });

  // Update URL when params change
  useEffect(() => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    router.replace(`?${urlParams.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(params));

  return current;
}
