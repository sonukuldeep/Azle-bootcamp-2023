import { Principal, ic, nat } from 'azle';

const tokenOwners = new Map<string, [nat, boolean]>(); // key is principal nat is their balance and bool is if they've claimed from fosset or not
const totalSupply = 1000000000;
let _inCirculation = 0;
const symbol = 'IC';
const activeoupons = new Map<string, nat>([
  ['1000', 1000n],
  ['1000', 1000n],
  ['1000', 1000n],
  ['1000', 1000n],
  ['1000', 1000n],
  ['1000', 1000n],
  ['10', 10n],
  ['10', 10n],
  ['10', 10n],
  ['10', 10n],
  ['10', 10n],
  ['10', 10n],
]);

export function balanceOf(user: Principal): nat {
  const principal = user.toString();
  if (tokenOwners.has(principal)) {
    return tokenOwners.get(principal)?.[0] as nat;
  } else {
    return 0n;
  }
}

export function getSymbol(): string {
  return symbol;
}

export function gimmeGimme(coupon?: string): string {
  const tokensToTransfer = 1000;
  const principal = ic.caller().toString();
  if (_inCirculation + tokensToTransfer > totalSupply)
    return 'insufficient balance';

  if (coupon) {
    // if coupon exist transfer corresponding amount to caller
    return 'success';
  } //else continue

  if (tokenOwners.has(principal) && !tokenOwners.get(principal)?.[1]) {
    //false means user has not claimed from fosset
    return 'success';
  } else {
    return 'you already claimed';
  }
}

export function transfer(): string {
  return 'success';
}
