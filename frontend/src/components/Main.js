import React, { useContext, Profiler } from 'react'
import { ApiContext } from '../context/ApiContext'
import Grid from '@material-ui/core/Grid'
import { GoMail } from 'react-icons/go'
import { BsFillPeopleFill } from 'react-icons/bs'
import Profile from './Profile'
import ProfileManager from './ProfileManager'

const Main = () => {
  const {profiles, profile, askList, askListFull,inbox} = useContext(ApiContext)
  const profilesExceptMyself = profiles.filter(prof=> {return prof.id !== profile.id})
  const listProfiles = profilesExceptMyself && (
    profilesExceptMyself.map((p)=> <Profile key={p.id} profileData={p}
    askData = {askListFull.filter(ask=>{return (p.userPro === ask.askFrom) | (p.userPro === ask.askTo)})}/>))
  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles">
          {listProfiles}
        </div>
      </Grid>

      <Grid item xs={4}>
        <div className="app-details">
          <ProfileManager />
        </div>
        <h3 className="title-ask">
          <BsFillPeopleFill className="badge"/>Approval request list
        </h3>
        <div className="app-details">
          <div className="task-list">
          <ul>
          </ul>
          </div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <h3>
          <GoMail className="badge"/>DM Inbox
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
