import React, { useState } from 'react';

export default function Popup() {
  const [modal, setModal] = useState(false);

  return (
    <div className={`modal ${modal ? 'modal-show' : 'modal-hide'}`}>
      {/* <!-- This is the background overlay --> */}
      <div className="modal-content">
        {/* <!-- This is the actual modal/popup box --> */}
        <span className="modal-close" onClick={() => setModal(false)}>
          <h3>Please content here</h3>
          &times;
        </span>
      </div>
    </div>
  );
}
