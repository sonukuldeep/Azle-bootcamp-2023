import { $query, Principal, Record, ic, Vec, $update } from 'azle';

type DAO_DB = Record<{ id: Principal; username: string }>;

const daoMembers = new Map<Principal, string>();

$query;
export function whoami(): Principal {
  return ic.caller();
}

$update;
export function updateDAO(member: DAO_DB): void {
  daoMembers.set(member.id, member.username);
}

$query;
export function getMembers(principal: Principal): string {
  const response = daoMembers.has(principal)
    ? daoMembers.get(principal)
    : 'data unavailable';
  return response!;
}

$update;
export function updateUserName(username: string): string {
  const caller = whoami();
  if (!daoMembers.has(caller)) {
    return 'unauthorized';
  }
  daoMembers.set(caller, username);
  return 'success';
}
