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

interface ICircleCollisionProps {
  x: number;
  y: number;
  radius: number;
  id: string;
}
interface IRectangleCollisionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}
interface IPowerUpEventProps extends Event {
  detail?: {
    power: {
      type?: string;
      number: number;
    };
  };
}
