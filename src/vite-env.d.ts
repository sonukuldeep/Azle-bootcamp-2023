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

type Auth = {
  identity: Identity;
  principal: Principal;
  actor: ActorSubclass<_SERVICE>;
  isAnonymousUser: boolean;
};

type Poles = {
  question: string;
  options: string[];
};

type PoleStatus = {
  game: string;
  noOfVotes: number;
};
