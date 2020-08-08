import React, { useContext, Profiler } from 'react'
import { ApiContext } from '../context/ApiContext'
import Grid from '@material-ui/core/Grid'
import { GoMail as IconMail } from 'react-icons/go'
import { BsFillPeopleFill as IconPeople } from 'react-icons/bs'
import { AiFillHome as IconHome } from 'react-icons/ai'
import Profile from './Profile'
import ProfileManager from './ProfileManager'
import Ask from './Ask';

const Main = () => {
  const {profiles, profile, askList, askListFull, inbox} = useContext(ApiContext)
  const profilesExceptMyself = profiles.filter(prof=> {return prof.id !== profile.id})
  const listProfiles = profilesExceptMyself && (
    profilesExceptMyself.map((p)=> <Profile key={p.id} profileData={p}
    askData = {askListFull.filter(ask=>{return (p.userPro === ask.askFrom) | (p.userPro === ask.askTo)})}/>))
  return (
    <Grid container>
      <Grid item xs={4}>
        <h3 className="page-title">
          <IconPeople className="badge"/>User list
        </h3>
        <div className="app-profiles">
          {listProfiles}
        </div>
      </Grid>

      <Grid item xs={4}>
        <h3 className="page-title">
          <IconHome className="badge"/>My Profile
        </h3>
        <div className="app-details">
          <ProfileManager />
        </div>
        <h3 className="page-title title-ask">
          <IconPeople className="badge"/>Approval Friend list
        </h3>
        <div className="app-details">
          <div className="task-list">
            <ul>
              {profile.id && askList.map(ask=><Ask key={ask.id} ask={ask}
              profile={profiles.filter(p=> {return p.userPro === ask.askFrom})}/>)}
            </ul>
          </div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <h3 className="page-title">
          <IconMail className="badge"/>DM Inbox
        </h3>
        <div className="app-dms">
            <div className="task-list">
            <ul>
            </ul>
            </div>
        </div>
      </Grid>
      
    </Grid>
  )
}

export default Main
