import React, { ReactNode, useEffect, useState } from 'react';

export default function Popup({
  children,
  isVisible,
}: {
  children: ReactNode;
  isVisible: boolean;
}) {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    setModal((pre) => !pre);
  }, [isVisible]);

  return (
    <div className={`modal ${modal ? 'modal-show' : 'modal-hide'}`}>
      {/* <!-- This is the background overlay --> */}
      <div className="modal-content">
        {/* <!-- This is the actual modal/popup box --> */}
        <span className="modal-close" onClick={() => setModal(false)}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
