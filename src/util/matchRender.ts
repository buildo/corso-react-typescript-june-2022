import React from "react";

export function matchRender<
  A extends object,
  TV extends string,
  T extends keyof A
>(
  value: A,
  tagValue: TV,
  matches: {
    [k in TV]: (value: Extract<A, { [key in T]: k }>) => React.ReactNode;
  }
) {
  return matches[tagValue](value as never);
}
