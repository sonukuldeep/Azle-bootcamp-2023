import { toast } from 'react-hot-toast';
import { useAuthContext } from '../Provider/AuthContextProvider';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import authHelper from '../lib/authHelper';
import { Principal } from '@dfinity/principal';
import Popup from './Popup';
import { AuthClient } from '@dfinity/auth-client';
import { backend } from '../declarations/backend';

function Dao() {
  const { authClient } = useAuthContext();
  const [formOneInput, setFromOneIput] = useState('');
  const [formTwoInput, setFromTwoIput] = useState('');
  const [formThreeInput, setFromThreeIput] = useState('');
  const [formFiveInput, setFromFiveIput] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [poles, setPoles] = useState<Poles | null>(null);
  const [poleStatus, setPoleStatus] = useState<PoleStatus[] | null>(null);

  async function handleFormOne() {
    if (authClient) {
      const { actor, isAnonymousUser } = authHelper(authClient);
      if (!isAnonymousUser) {
        try {
          const res = await actor.setDaoMember(formOneInput);
          setFromOneIput('');
          if (res === 'success') toast.success('Added successfully!');
          else toast('Error');
        } catch (error: any) {
          if (error.name === 'AgentHTTPResponseError')
            toast.error('Login expired!');
          else toast.error('Error occured!');
        }
      } else toast.error('Are you logged in?');
    }
  }
  async function handleFormTwo() {
    if (authClient) {
      const { actor, isAnonymousUser } = authHelper(authClient);
      if (!isAnonymousUser) {
        try {
          const user = (await actor.getMember(
            Principal.fromText(formTwoInput),
          )) as string;
          setFromTwoIput('');
          toast('username ' + user);
        } catch (error: any) {
          if (error.name === 'AgentHTTPResponseError')
            toast.error('Login expired!');
          else toast.error('Error occured!');
        }
      } else toast.error('Are you logged in?');
    }
  }

  async function handleFormThree() {
    if (authClient) {
      const { actor, isAnonymousUser } = authHelper(authClient);
      if (!isAnonymousUser) {
        try {
          const res = await actor.updateDaoUserName(formThreeInput);
          setFromThreeIput('');
          toast.success(res);
        } catch (error: any) {
          if (error.name === 'AgentHTTPResponseError')
            toast.error('Login expired!');
          else toast.error('Error occured!');
        }
      } else toast.error('Are you logged in?');
    }
  }

  function handleFormFour() {
    setIsPopupVisible((pre) => !pre);
  }

  async function handleFormFive() {
    if (authClient) {
      const { actor, isAnonymousUser } = authHelper(authClient);
      if (!isAnonymousUser) {
        try {
          if (!poles?.options.includes(formFiveInput)) return;
          await actor.voteForGame(formFiveInput);
          toast.success('Success');
          backend.votingStatus().then((res) => setPoleStatus(res));
        } catch (error: any) {
          if (error.name === 'AgentHTTPResponseError')
            toast.error('Login expired!');
          else toast.error('Error occured!');
        }
      } else toast.error('Are you logged in?');
    }
  }

  useEffect(() => {
    backend.currentPole().then((res) => {
      setPoles(res);
    });
    backend.votingStatus().then((res) => setPoleStatus(res));
  }, []);
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Vote for game</h1>
      <div id="vote" className="vote-wrapper">
        <div className="card">
          {/* form five */}
          <h3>Vote for next game</h3>
          <form>
            <label htmlFor="game">{poles?.question}</label>
            <div className="space5"></div>
            <select
              onChange={(e) => setFromFiveIput(e.target.value)}
              value={formFiveInput}
            >
              <option value="-1">Choose</option>
              {poles?.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input onClick={handleFormFive} type="button" value="Submit" />
          </form>
        </div>
        <div className="card">
          {/* form six */}
          <h3>Poles question</h3>
          <form>
            <div className="small-card">
              {poleStatus?.map((pole, index) => (
                <div key={index} className="tiny-card">
                  <div>Game: {pole.game}</div>
                  <div>Votes: {pole.noOfVotes}</div>
                </div>
              ))}
            </div>
            <div className="space5"></div>
            <input
              type="button"
              value="Refresh"
              onClick={() =>
                backend.votingStatus().then((res) => setPoleStatus(res))
              }
            />
          </form>
        </div>
      </div>
      <div className="spacer"></div>
      <h2 style={{ textAlign: 'center' }}>
        You need 1000 IC token to become a member
      </h2>
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
                if (formOneInput !== '') handleFormOne();
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
                if (formTwoInput !== '') handleFormTwo();
              }}
            />
          </form>
        </div>
        <div className="card">
          {/* form three */}
          <h3>Update DAO member</h3>
          <form id="update-dao">
            <label htmlFor="">New username:</label>
            <input
              type="text"
              name="id"
              required
              value={formThreeInput}
              onChange={(e) => setFromThreeIput(e.target.value)}
            />
            <input
              type="button"
              value="Submit"
              onClick={() => {
                if (formThreeInput !== '') handleFormThree();
              }}
            />
          </form>
          <h4 id="update-dao-msg"></h4>
        </div>
        <div className="card">
          {/* form four */}
          <h3>Quit DAO membership</h3>
          <form id="quit-dao">
            <input type="button" value="Submit" onClick={handleFormFour} />
          </form>
          <h4 id="quit-dao-msg"></h4>
        </div>
      </div>

      <Popup
        isVisible={isPopupVisible}
        children={
          <PopupContent
            authClient={authClient}
            setIsPopupVisible={setIsPopupVisible}
          />
        }
      />
    </>
  );
}

export default Dao;

function PopupContent({
  setIsPopupVisible,
  authClient,
}: {
  setIsPopupVisible: Dispatch<SetStateAction<boolean>>;
  authClient: AuthClient | null;
}) {
  async function handleDelete() {
    if (!authClient) return;
    const { isAnonymousUser, actor } = authHelper(authClient);
    if (!isAnonymousUser) {
      try {
        const res = await actor.exitFromDao();
        if (res === 'success') toast('We will miss you!');
        else toast.error('Something went wrong');
        setIsPopupVisible((pre) => !pre);
      } catch (error: any) {
        if (error.name === 'AgentHTTPResponseError')
          toast.error('Login expired!');
        else toast.error('Error occured!');
      }
    } else toast.error('Are you logged in?');
  }
  return (
    <div className="popup-wrapper">
      <h2>Are you sure?</h2>
      <div>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => setIsPopupVisible((pre) => !pre)}>No</button>
      </div>
    </div>
  );
}
