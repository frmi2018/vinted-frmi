import React from "react";

const MemberLine = ({ data, lineActive, setLineActive }) => {
  const handleEmailChange = (e) => {
    setLineActive(2);
  };

  const handleEmailSave = (e) => {
    setLineActive(0);
  };

  return (
    <tr className="text-center align-middle">
      <td>Email</td>
      <td>
        {lineActive === 2 ? (
          <input
            type="text"
            className="form-control"
            placeholder={data.account.email}
          />
        ) : (
          <span>{data.account.email}</span>
        )}
      </td>
      <td>
        {lineActive === 2 ? (
          <button className="btn btn-primary" onClick={() => handleEmailSave()}>
            Sauver
          </button>
        ) : (
          <button
            className="btn btn-warning"
            onClick={() => handleEmailChange()}
          >
            Modifier
          </button>
        )}
      </td>
    </tr>
  );
};

export default MemberLine;
