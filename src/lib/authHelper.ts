import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { canisterId, idlFactory, createActor } from '../declarations/backend';

export default function authHelper(authClient: AuthClient) {
  const identity = authClient.getIdentity();
  const principal = identity.getPrincipal();
  const isAnonymousUser = principal.toString() === '2vxsx-fae';
  //   const actor = Actor.createActor(idlFactory, {
  //     agent: new HttpAgent({
  //       identity,
  //     }),
  //     canisterId,
  //   });
  const actor = createActor(canisterId as string, {
    agentOptions: {
      identity,
    },
  });
  return { identity, principal, actor, isAnonymousUser };
}
