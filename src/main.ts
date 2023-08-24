import './index.scss';
import { backend } from './declarations/backend';
const button = document.querySelector('button') as HTMLButtonElement;
const caller = document.getElementById('caller') as HTMLAnchorElement;
const form = document.getElementById('form') as HTMLFormElement;

button.addEventListener('click', async () => {
  button.setAttribute('disabled', 'true');
  const whoami = await backend.whoami();
  const user = whoami;
  console.log(user.toText());
  caller.innerText = user.toText();
  button.removeAttribute('disabled');
});

form.addEventListener('submit', (e) => {
  daoMembers(e);
});
const daoMembers = async (e: SubmitEvent) => {
  // backend.updateDAO()
  e.preventDefault();
  console.log(e.target[0].value);
  console.log(e.target[1].value);
};
