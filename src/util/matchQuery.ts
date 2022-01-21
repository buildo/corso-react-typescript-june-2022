import { UseQueryResult } from "react-query";

export function matchQuery<E, D, RL, RE, RS>(
  useQueryResult: UseQueryResult<D, E>,
  matches: {
    loading: () => RL;
    error: (error: E, loading: boolean) => RE;
    success: (data: D, loading: boolean) => RS;
  }
): RL | RE | RS {
  switch (useQueryResult.status) {
    case "loading":
    case "idle":
      return matches.loading();
    case "success":
      return matches.success(useQueryResult.data, useQueryResult.isFetching);
    case "error":
      return matches.error(useQueryResult.error, useQueryResult.isFetching);
  }
}
