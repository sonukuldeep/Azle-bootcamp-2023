import { $query, Principal, Record, ic, Vec, $update } from 'azle';
//types
type DAO_DB = Record<{ id: string; username: string }>;
type Proposal = Record<{ question: string; options: Vec<string> }>; // can i specify size here
type Votes = Record<{
  game: string;
  noOfVotes: number;
}>;

// variables
const daoMembers = new Map<string, string>();
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
$update;
export function setDaoMember(member: string): void {
  const id = ic.caller().toString();
  if (daoMembers.has(id)) return;
  console.log(id);
  daoMembers.set(id, member);
}

$query;
export function getMembers(principal: Principal): string {
  if (!daoMembers.has(principal.toString())) return 'Not found';
  console.log(daoMembers);
  return daoMembers.get(principal.toString())!;
}

$update;
export function updateDaoUserName(username: string): string {
  const caller = ic.caller().toString();
  if (!daoMembers.has(caller)) {
    return 'Not found';
  }
  daoMembers.set(caller, username);
  return 'success';
}

$update;
export function exitFromDao(): string {
  const caller = ic.caller().toString();
  const res = daoMembers.delete(caller);
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
