import { toast } from 'react-hot-toast';
import { useAuthContext } from '../Provider/AuthContextProvider';
import { useEffect, useState } from 'react';
import authHelper from '../lib/authHelper';
import { Principal } from '@dfinity/principal';

function Dao() {
  const { authClient } = useAuthContext();
  const [auth, setAuth] = useState<Auth | null>(null);
  const [formOneInput, setFromOneIput] = useState('');
  const [formTwoInput, setFromTwoIput] = useState('');

  useEffect(() => {
    if (authClient) {
      const { actor, identity, principal, isAnonymousUser } =
        authHelper(authClient);
      console.log(principal.toString());
      if (isAnonymousUser) setAuth(null);
      else setAuth({ actor, identity, principal, isAnonymousUser });
    }
  }, [authClient]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>
        You need 1000 IC token to become a member
      </h1>
      <div id="manage-dao" className="dao-wrapper">
        <div className="card">
          {/* form one */}
          <h3>Enrole as DAO member</h3>
          <form id="set-doa">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              required
              value={formOneInput}
              onChange={(e) => setFromOneIput(e.target.value)}
            />
            <input
              type="button"
              value="Submit"
              onClick={() => {
                if (auth) {
                  auth.actor.setDaoMember(formOneInput);
                  setFromOneIput('');
                }
              }}
            />
          </form>
        </div>
        <div className="card">
          {/* form two */}
          <h3>Get DAO member</h3>
          <form id="get-dao">
            <label htmlFor="">Id:</label>
            <input
              type="text"
              name="id"
              required
              value={formTwoInput}
              onChange={(e) => setFromTwoIput(e.target.value)}
            />
            <input
              type="button"
              value="Submit"
              onClick={async () => {
                if (auth) {
                  const user = await auth.actor.getMembers(
                    Principal.fromText(formTwoInput),
                  );
                  setFromTwoIput('');
                  console.log(user);
                }
              }}
            />
          </form>
          <h4 id="get-dao-msg"></h4>
        </div>
        <div className="card">
          <h3>Update DAO member</h3>
          <form id="update-dao">
            <label htmlFor="">New username:</label>
            <input type="text" name="id" required />
            <input type="submit" value="Submit" />
          </form>
          <h4 id="update-dao-msg"></h4>
        </div>
        <div className="card">
          <h3>Quit DAO membership</h3>
          <form id="quit-dao">
            <input type="submit" value="Submit" />
          </form>
          <h4 id="quit-dao-msg"></h4>
        </div>
      </div>
      <div className="spacer"></div>
      <h2 style={{ textAlign: 'center' }}>Vote for game</h2>
      <div id="vote" className="vote-wrapper">
        <div className="card">
          <form>
            <div className="small-card">
              <div>Game: </div>
              <div>Votes: </div>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="card">
          <h3>poles question</h3>
          <label htmlFor="cars">Choose a car:</label>
          <select>
            <option value="-1">Choose</option>
            <option value="0">Car 1</option>
            <option value="1">Car 2</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Dao;
