import React from 'react';
import {RiUserReceivedLine} from 'react-icons/ri';
 
const InboxDM = ({dm, profile}) => {
  return (
    <li className="list-item">
      {profile && <h4>{dm.message}</h4>}
      {profile && <h4><RiUserReceivedLine className="badge"/>{profile.nickName}</h4>}
    </li>
  )
}

export default InboxDM