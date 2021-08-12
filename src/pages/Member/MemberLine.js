import React from "react";

const MemberLine = ({ data, lineActive, setLineActive }) => {
  const handleUsernameChange = (e) => {
    setLineActive(1);
  };

  const handleUsernameSave = (e) => {
    setLineActive(0);
  };

  return (
    <tr className="text-center align-middle">
      <td width="80">UserName</td>
      <td>
        {lineActive === 1 ? (
          <input
            type="text"
            className="form-control"
            placeholder={data.account.username}
          />
        ) : (
          <span>{data.account.username}</span>
        )}
      </td>
      <td width="80">
        {lineActive === 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => handleUsernameSave()}
          >
            Sauver
          </button>
        ) : (
          <button
            className="btn btn-warning"
            onClick={() => handleUsernameChange()}
          >
            Modifier
          </button>
        )}
      </td>
    </tr>
  );
};

export default MemberLine;
