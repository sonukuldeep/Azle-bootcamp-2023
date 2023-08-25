import './index.scss';
import { backend } from './declarations/backend';
const navButtons = document.querySelector('nav')?.querySelectorAll('button');

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

const button = navButtons?.item(4) as HTMLButtonElement;
const setDaoForm = document.getElementById('form-set-doa') as HTMLFormElement;
const getDaoForm = document.getElementById('form-get-dao') as HTMLFormElement;
let loggedIn = false;
button.addEventListener('click', async () => {
  button.setAttribute('disabled', 'true');
  const whoami = await backend.whoami();
  const user = whoami;
  console.log(user.toText());
  button.innerText = user.toText();
  button.removeAttribute('disabled');
  loggedIn = true;
});

setDaoForm.addEventListener('submit', (e) => {
  setDaoMembers(e);
});
const setDaoMembers = async (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  if (formElement) {
    const id = formElement[0] as HTMLInputElement;
    const username = formElement[1] as HTMLInputElement;
    if (id.value == '' || username.value == '') return;

    backend.setDaoMember({
      id: id.value,
      username: username.value,
    });
  }
};

getDaoForm.addEventListener('submit', (e) => {
  getDaoMember(e);
});
const getDaoMember = async (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  if (formElement) {
    const id = formElement[0] as HTMLInputElement;
    if (id.value == '') return;

    const username = await backend.getMembers(id.value);
    const setLabel = document.getElementById(
      'get-dao-member',
    ) as HTMLHeadingElement;
    setLabel.innerText = 'username: ' + username;
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
