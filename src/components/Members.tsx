import React, { useState, useEffect } from 'react';
import { backend } from '../declarations/backend';
import { Principal } from '@dfinity/principal';

function Members() {
  const [members, setMembers] = useState<
    | {
        username: string;
        id: Principal;
      }[]
    | null
  >(null);
  useEffect(() => {
    backend.getMembers().then((res) => {
      setMembers(res);
    });
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Dao members</h1>
      <div className="member-wrapper">
        {members?.map((member, index) => (
          <Card
            key={index}
            name={member.username}
            shortPrincipal={member.id.toString().slice(0, 5)}
          />
        ))}
      </div>
    </>
  );
}

export default Members;

function Card({
  name,
  shortPrincipal,
}: {
  name: string;
  shortPrincipal: string;
}) {
  return (
    <div className="card">
      <div className="image-wrapper">
        <img
          src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${name}`}
          alt="avator"
        />
      </div>
      <h3>Name: {name}</h3>
      <p>Wallet: {shortPrincipal}</p>
    </div>
  );
}
