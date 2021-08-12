import React from "react";

const MemberLine = ({ data, lineActive, setLineActive }) => {
  const handlePhoneChange = (e) => {
    setLineActive(3);
  };

  const handlePhoneSave = (e) => {
    setLineActive(0);
  };

  return (
    <tr className="text-center align-middle">
      <td>Phone</td>
      <td>
        {lineActive === 3 ? (
          <input type="phone" placeholder={data.account.phone} />
        ) : (
          <span>{data.account.phone}</span>
        )}
      </td>
      <td>
        {lineActive === 3 ? (
          <button className="btn btn-primary" onClick={() => handlePhoneSave()}>
            Sauver
          </button>
        ) : data.account.phone === undefined ? (
          <button
            className="btn btn-success"
            onClick={() => handlePhoneChange()}
          >
            Ajouter
          </button>
        ) : (
          <button
            className="btn btn-warning"
            onClick={() => handlePhoneChange()}
          >
            Modifier
          </button>
        )}
      </td>
    </tr>
  );
};

export default MemberLine;
