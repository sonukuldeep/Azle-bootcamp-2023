import {
  $query,
  Principal,
  Record,
  ic,
  Vec,
  $update,
  nat,
  nat32,
  $init,
  StableBTreeMap,
  Opt,
  match,
} from 'azle';
//types
type DAO_DB = Record<{ id: Principal; username: string }>;
type Proposal = Record<{ question: string; options: Vec<string> }>;
type Votes = Record<{
  game: string;
  noOfVotes: number;
}>;

// variables
const daoMembers = new StableBTreeMap<Principal, string>(0, 1000, 100);
const currentGame = 'puzzle';
const proposal: Proposal = {
  question: 'What game should we develop next?',
  options: ['Puzzle game', 'Open world', 'RPG'],
};
const votes: Votes[] = proposal.options.map((game) => ({ game, noOfVotes: 0 }));

// functions
$query;
export function whoami(): Principal {
  return ic.caller();
}

// principal to principal comparison does not work for some unknown reason
// but if we convert both to string it works
// i have chck this countless times
$update;
export function setDaoMember(member: string): string {
  const id = ic.caller();
  if (daoMembers.containsKey(id) || id.isAnonymous()) return 'failed';
  console.log(id.toString());
  daoMembers.insert(id, member);
  return 'success';
}

$query;
export function getMember(principal: Principal): string {
  const member = daoMembers.get(principal);
  return match(member, {
    Some: (val) => val,
    None: () => 'Not found',
  });
}

$query;
export function getMembers(): Vec<DAO_DB> {
  const members = Array.from(daoMembers.items(), ([id, username]) => ({
    id,
    username,
  }));
  return members;
}

$update;
export function updateDaoUserName(username: string): string {
  const caller = ic.caller();
  if (!daoMembers.containsKey(caller)) {
    return 'Not found';
  }
  daoMembers.insert(caller, username);
  return 'success';
}

$update;
export function exitFromDao(): string {
  const caller = ic.caller();
  const res = daoMembers.remove(caller);
  return res ? 'success' : 'failed';
}

$query;
export function currentPole(): Proposal {
  return proposal;
}

$update;
export function voteForGame(game: string): void {
  // check if call is dao member else return
  const index = votes.findIndex((option) => option.game === game);
  if (index === -1) return;
  votes[index].noOfVotes++;
}

$query;
export function votingStatus(): Vec<Votes> {
  return votes;
}

$query;
export function loadGame(): string {
  return currentGame;
}
//
//
//
//
// token related
let tokenOwners = new StableBTreeMap<Principal, nat32>(1, 1000, 100);
let symbol = 'TGS';
let tokenName = 'Tiny game studio';
const fossetRecord = new StableBTreeMap<Principal, nat32>(2, 1000, 100);
const activeoupons = new Map<string, nat32>([
  ['1000', 1000],
  ['10', 10],
  ['eqquw', 20],
  ['gzszk', 30],
  ['vktch', 40],
  ['jwkdq', 50],
  ['lmjzh', 60],
  ['vmere', 70],
  ['ogcdr', 80],
  ['ylphu', 90],
  ['ztsax', 100],
  ['beumm', 110],
]);

$query;
export function getBalance(principal: Principal): number {
  const current = tokenOwners.get(principal);
  return match(current, {
    Some: (val) => val,
    None: () => 0,
  });
}

$init;
export function init(): void {
  tokenOwners.insert(ic.id(), 1_000_000_000);
  console.log('token created');
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
  const from = ic.id();
  const res = transfer_hidden(from, ic.caller(), value);
  return res;
}

$update;
export function gimmeGimme(): string {
  if (fossetRecord.containsKey(ic.caller())) return 'Already claimed';
  const value = activeoupons.get('10')!;
  const from = ic.id();
  fossetRecord.insert(ic.caller(), value);
  const res = transfer_hidden(from, ic.caller(), value);
  return res;
}

$update;
export function transfer(to: Principal, amount: nat32): string {
  const from = ic.caller();
  if (!tokenOwners.containsKey(from)) return 'insufficient balance';
  if (getBalance(from) < amount) return 'insufficient balance';
  if (!tokenOwners.containsKey(to)) tokenOwners.insert(to, 0);
  const fromBal = getBalance(from) - amount;
  const toBal = getBalance(to) + amount;
  tokenOwners.insert(from, fromBal);
  tokenOwners.insert(to, toBal);
  return 'success';
}

function transfer_hidden(
  from: Principal,
  to: Principal,
  amount: nat32,
): string {
  if (!tokenOwners.containsKey(from)) return 'insufficient balance';
  if (getBalance(from) < amount) return 'insufficient balance';
  if (!tokenOwners.containsKey(to)) tokenOwners.insert(to, 0);
  const fromBal = getBalance(from) - amount;
  const toBal = getBalance(to) + amount;
  tokenOwners.insert(from, fromBal);
  tokenOwners.insert(to, toBal);
  return 'success';
}
