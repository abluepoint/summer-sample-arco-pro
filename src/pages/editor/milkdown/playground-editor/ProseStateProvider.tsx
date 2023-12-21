import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = Record<string, any>;

export const proseStateCtx = createContext<Json>({});
export const setProseStateCtx = createContext<Dispatch<SetStateAction<Json>>>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
);

export const useProseState = () => useContext(proseStateCtx);

export const useSetProseState = () => useContext(setProseStateCtx);

export const ProseStateProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [proseState, setProseState] = useState<Json>({});
  return (
    <proseStateCtx.Provider value={proseState}>
      <setProseStateCtx.Provider value={setProseState}>
        {children}
      </setProseStateCtx.Provider>
    </proseStateCtx.Provider>
  );
};
