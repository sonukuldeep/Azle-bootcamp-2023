import './index.scss';
import { backend } from './declarations/backend';
import { Principal } from '@dfinity/principal';

// variables
const navButtons = document.querySelector('nav')?.querySelectorAll('button');
const button = navButtons?.item(4) as HTMLButtonElement;
const setDaoForm = document.getElementById('set-doa') as HTMLFormElement;
const getDaoForm = document.getElementById('get-dao') as HTMLFormElement;
const updateDaoForm = document.getElementById('update-dao') as HTMLFormElement;
const quitDaoForm = document.getElementById('quit-dao') as HTMLFormElement;

let loggedIn = false;
let user = '';
const avatorUrl = 'https://api.dicebear.com/6.x/pixel-art/svg?seed=';

// navbar related
for (const node of navButtons!) {
  const idToToggle = node.getAttribute('data-id');
  if (idToToggle === '') continue;
  node.addEventListener('click', () => {
    const element = document.getElementById(idToToggle!);
    document
      .querySelectorAll('.wrapper')
      .forEach((wrap) => wrap.classList.remove('visible'));
    element?.classList.toggle('visible');
  });
}

// login btn
button.addEventListener('click', async () => {
  button.setAttribute('disabled', 'true');
  const whoami = await backend.whoami();
  const user = whoami;
  button.innerText = user.toText();
  button.removeAttribute('disabled');
  loggedIn = true;
});

// add members to dao
setDaoForm.addEventListener('submit', (e) => {
  setDaoMembers(e);
});
const setDaoMembers = async (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  if (formElement) {
    const username = formElement[0] as HTMLInputElement;
    if (username.value == '') return;

    backend.setDaoMember(username.value);
  }
};

// get members of dao
getDaoForm.addEventListener('submit', (e) => {
  getDaoMember(e);
});
const getDaoMember = async (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  if (formElement) {
    const id = formElement[0] as HTMLInputElement;
    if (!Principal.from(id.value)._isPrincipal) return;

    const username = await backend.getMembers(Principal.from(id.value));
    const setLabel = document.getElementById(
      'get-dao-msg',
    ) as HTMLHeadingElement;
    setLabel.innerText = 'username: ' + username;
    username !== 'Not found' ? (user = username) : '';
  }
};

backend.currentPole().then((poles) => {
  const options = poles.options.reduce((acc, choice) => {
    return (acc += `<option value="${choice}">${choice.toUpperCase()}</option>`);
  }, '');

  const tm = `
  <h3>${poles.question}</h3>
  <label for="cars">Choose a car:</label>
  <select>
  <option value="-1">Choose</option>
  ${options}
  </select> 
  `;
  class SelectTemplate extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = tm;
    }
  }
  customElements.define('select-template', SelectTemplate);

  const submitBtn = document.querySelector('#vote form');
  submitBtn?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (formElement) {
      const data = formElement[0] as HTMLInputElement;
      if (data.value == '-1') return;
      backend.voteForGame(data.value);
    }
  });
});

backend.votingStatus().then((votes) => {
  const vote = votes.reduce((acc, choice) => {
    return (acc += `
    <div class="small-card">
    <div>Game: ${choice.game}</div>
    <div>Votes: ${choice.noOfVotes}</div>
    </div>`);
  }, '');

  const tm = `
  <h3>Current votes per game</h3>
  ${vote}
  `;
  class VoteTemplate extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = tm;
    }
  }
  customElements.define('vote-template', VoteTemplate);
});

updateDaoForm.addEventListener('submit', async (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  if (formElement) {
    const data = formElement[0] as HTMLInputElement;
    if (data.value == '') return;
    const res = await backend.updateDaoUserName(data.value);
    if (res === 'success') {
      const msg = document.querySelector('#update-dao-msg') as HTMLElement;
      msg.innerText = res;
    }
  }
});

quitDaoForm.addEventListener('submit', async (e: SubmitEvent) => {
  e.preventDefault();
  const res = await backend.exitFromDao();
  if (res === 'success') {
    const msg = document.querySelector('#quit-dao-msg') as HTMLElement;
    msg.innerText = res;
  }
});
