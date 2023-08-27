/// <reference types="vite/client" />
type DefaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: boolean;
    };
  };
  loginOptions: {
    identityProvider: string;
    maxTimeToLive: bigint;
  };
};
