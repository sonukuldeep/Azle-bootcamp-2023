import React, { useState } from 'react';
import { useAuthContext } from '../Provider/AuthContextProvider';
import authHelper from '../lib/authHelper';
import { toast } from 'react-hot-toast';
import { Principal } from '@dfinity/principal';

function Fosset() {
  const { authClient } = useAuthContext();
  const [toAddress, settoAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [coupon, setCoupon] = useState('');

  async function checkBalance() {
    if (authClient) {
      const { actor, isAnonymousUser, principal } = authHelper(authClient);
      if (!isAnonymousUser) {
        try {
          const res = await actor.getBalance(principal);
          toast('Current balance ' + res.toString());
        } catch (error: any) {
          if (error.name === 'AgentHTTPResponseError')
            toast.error('Login expired!');
          else toast.error('Error occured!');
        }
      } else toast.error('Are you logged in?');
    }
  }
  async function claimToken() {
    if (authClient) {
      const { actor, isAnonymousUser } = authHelper(authClient);
      if (!isAnonymousUser) {
        try {
          const res = await actor.gimmeGimme();
          toast.success(res);
        } catch (error: any) {
          if (error.name === 'AgentHTTPResponseError')
            toast.error('Login expired!');
          else toast.error('Error occured!');
        }
      } else toast.error('Are you logged in?');
    }
  }
  async function handleTransfer() {
    if (authClient) {
      const { actor, isAnonymousUser } = authHelper(authClient);
      if (!isAnonymousUser) {
        try {
          const transferAmount = Number.isNaN(amount) ? 0 : Number(amount);
          const res = await actor.transfer(
            Principal.fromText(toAddress),
            Number(transferAmount),
          );
          settoAddress('');
          toast.success(res);
        } catch (error: any) {
          if (error.name === 'AgentHTTPResponseError')
            toast.error('Login expired!');
          else toast.error('Error occured!');
        }
      } else toast.error('Are you logged in?');
    }
  }

  async function callFosset() {
    if (authClient) {
      const { actor, isAnonymousUser } = authHelper(authClient);
      if (!isAnonymousUser) {
        try {
          const res = await actor.fosset(coupon);
          setCoupon('');
          toast.success(res);
        } catch (error: any) {
          if (error.name === 'AgentHTTPResponseError')
            toast.error('Login expired!');
          else toast.error('Error occured!');
        }
      } else toast.error('Are you logged in?');
    }
  }
  return (
    <div className="fosset-wrapper">
      <h1 style={{ textAlign: 'center' }}>Fosset</h1>
      <div className="btns">
        <button onClick={checkBalance}>Check balance</button>
        <button onClick={claimToken}>Claim TGS token</button>
      </div>
      <div className="fosset-cards">
        <div className="transfer-form">
          <div className="card">
            {/* transform form */}
            <h3>Transfer tokens</h3>
            <form id="set-doa">
              <label htmlFor="username">To:</label>
              <input
                type="text"
                name="username"
                required
                value={toAddress}
                onChange={(e) => settoAddress(e.target.value)}
              />
              <label htmlFor="username">Amount:</label>
              <input
                type="text"
                name="username"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input type="button" value="Submit" onClick={handleTransfer} />
            </form>
          </div>
        </div>
        <div className="fosset-form">
          <div className="card">
            {/* fosset form */}
            <h3>Claim from fosset</h3>
            <form id="set-doa">
              <label htmlFor="username">Coupon code:</label>
              <input
                type="text"
                name="username"
                required
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <input type="button" value="Submit" onClick={callFosset} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fosset;
