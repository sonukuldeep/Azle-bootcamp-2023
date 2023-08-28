// Token related stuff

import {
  $init,
  $query,
  $update,
  Principal,
  StableBTreeMap,
  ic,
  nat32,
} from 'azle';

let tokenOwners = new StableBTreeMap<string, nat32>(0, 100, 100); // key is principal nat is their balance and bool is if they've claimed from fosset or not
let symbol = 'TGS';
let tokenName = 'Tiny game studio';
const fossetRecord = new StableBTreeMap<string, nat32>(1, 100, 100);
const activeoupons = new Map<string, nat32>([
  ['1000', 1000],
  ['10', 10],
]);

$init;
export function init(canisterId: Principal): void {
  tokenOwners.insert(canisterId.toString(), 10_000_000_000);
  console.log('token created');
}

$query;
export function balanceOf(user: Principal): nat32 {
  const principal = user.toString();
  if (tokenOwners.containsKey(principal))
    return tokenOwners.get(principal).Some?.valueOf()!;
  else return 0;
}

$query;
export function getTokenName(): string {
  return tokenName;
}

$query;
export function getTokenSymbol(): string {
  return symbol;
}

$update;
export function fosset(coupon: string): string {
  if (!activeoupons.has(coupon)) return 'invalid coupon';
  const value = activeoupons.get(coupon)!;
  const from = Principal.fromText('bkyz2-fmaaa-aaaaa-qaaaq-cai');
  const res = transfer(from, ic.caller(), value);
  return res;
}

$update;
export function gimmeGimme(): string {
  if (fossetRecord.containsKey(ic.caller().toString()))
    return 'Already claimed';
  const value = activeoupons.get('10')!;
  const from = Principal.fromText('bkyz2-fmaaa-aaaaa-qaaaq-cai');
  const res = transfer(from, ic.caller(), value);
  fossetRecord.insert(ic.caller().toString(), value);
  return res;
}

$update;
export function transfer(
  from: Principal,
  to: Principal,
  amount: nat32,
): string {
  console.log(ic.id);
  if (!tokenOwners.containsKey(from.toString())) return 'insufficient balance';
  if (tokenOwners.get(from.toString()).Some?.valueOf()! < amount)
    return 'insufficient balance';
  if (!tokenOwners.containsKey(to.toString()))
    tokenOwners.insert(from.toString(), 0);
  const fromBal = tokenOwners.get(from.toString()).Some?.valueOf()! - amount;
  const toBal = tokenOwners.get(to.toString()).Some?.valueOf()! + amount;
  tokenOwners.insert(from.toString(), fromBal);
  tokenOwners.insert(to.toString(), toBal);
  return 'success';
}
