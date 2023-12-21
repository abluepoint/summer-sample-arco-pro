import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

export type Share = () => void;
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const shareCtx = createContext<Share>(() => {});
export const setShareCtx = createContext<Dispatch<SetStateAction<Share>>>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
);

export const useShare = () => useContext(shareCtx);

export const useSetShare = () => useContext(setShareCtx);

export const ShareProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [share, setShare] = useState<Share>(() => {});

  return (
    <shareCtx.Provider value={share}>
      <setShareCtx.Provider value={setShare}>{children}</setShareCtx.Provider>
    </shareCtx.Provider>
  );
};
