import { UseMutationResult } from "react-query";

export function matchMutation<E, D, RL, RE, RS, RI>(
  useMutationResult: UseMutationResult<D, E, any>,
  matches: {
    loading: () => RL;
    error: (error: E) => RE;
    success: (data: D) => RS;
    idle: () => RI;
  }
): RL | RE | RS | RI {
  switch (useMutationResult.status) {
    case "loading":
      return matches.loading();
    case "success":
      return matches.success(useMutationResult.data);
    case "error":
      return matches.error(useMutationResult.error);
    case "idle":
      return matches.idle();
  }
}
