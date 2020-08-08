import React, {createContext, useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
export const ApiContext = createContext()

const ApiContextProvider = (props) => {

  const token = props.cookies.get('current-token')
  const [profile, setProfile] = useState([])
  const [profiles, setProfiles] = useState([])
  const [editedProfile, setEditedProfile] = useState({id: '', nickName: ''})
  const [askList, setAskList] = useState([])
  const [askListFull, setAskListFull] = useState([])
  const [inbox, setInbox] = useState([])
  const [cover, setCover]= useState([])

  const apiBaseUrl = 'http://localhost:8000'
  const apiHeader = token => ({ 'Authorization': `Token ${token}` })

  useEffect(() => {
    const getMyProfile = async() => {
      try {
        const resMyProfile = await axios.get(`${apiBaseUrl}/api/user/myprofile/`, apiHeader(token))
        const myProfile = resMyProfile.data[0]
        const resApproval = await axios.get(`${apiBaseUrl}/api/user/approval/`, apiHeader(token))
        if (myProfile) {
          setProfile(myProfile)
          setEditedProfile({id: myProfile.id, nickName: myProfile.nickName})
          setAskList(resApproval.data.filter(ask => myProfile.userPro === ask.askTo))
          setAskListFull(resApproval.data)
        }
      } catch (e) {
        console.log(e.message)
      }
    }

    const getProfile = async() => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/user/profile/`, apiHeader(token))
        setProfiles(res.data)
      } catch (e) {
        console.log(e.message)
      }
    }

    const getInbox = async() => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/dm/inbox/`, apiHeader(token))
        setInbox(res.data)
      } catch (e) {
        console.log(e.message)
      }
    }

    getMyProfile()
    getProfile()
    getInbox()
  }, [token, profile.id])

  const createProfile = async() => {
    const headers = {
      ...apiHeader(token),
      'Content-Type': 'application/json'
    }
    const createData = new FormData()
    createData.append('nickName', editedProfile.nickName)
    cover.name && createData.append('img', cover, cover.name)
    try {
      const res = await axios.post(`${apiBaseUrl}/api/user/myprofile/`, createData, headers)
      const profile = res.data
      setProfile(profile)
      setEditedProfile({id: profile.id, nickName: profile.nickName})
    } catch (e) {
      console.log(e.message)
    }
  }

  const deleteProfile = async() => {
    const headers = {
      ...apiHeader(token),
      'Content-Type': 'application/json'
    }
    try {
      await axios.delete(`${apiBaseUrl}/api/user/profile/${profile.id}/`, headers)
      setProfiles(profiles.filter(dev => dev.id !== profile.id))
      setProfile([])
      setEditedProfile({id: '', nickName: ''})
      setCover([])
      setAskList([])
    } catch (e) {
      console.log(e.message)
    }
  }

  const editProfile = async() => {
    const headers = {
      ...apiHeader(token),
      'Content-Type': 'application/json'
    }
    const editData = new FormData()
    editData.append('nickName', editedProfile.nickName)
    cover.name && editData.append('img', cover, cover.name)
    try {
      const res = await axios.put(`${apiBaseUrl}/api/user/profile/${profile.id}/`, editData, headers)
      setProfile(res.data)
    } catch (e) {
      console.log(e.message)
    }
  }

  const requestFriend = async(askData) => {
    const headers = {
      ...apiHeader(token),
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post(`${apiBaseUrl}/api/user/approval/`, askData, headers)
      setAskListFull([...askData, res.data])
    } catch (e) {
      console.log(e.message)
    }
  }

  const sendDirectMessage = async(dm) => {
    const headers = {
      ...apiHeader(token),
      'Content-Type': 'application/json'
    }
    try {
      await axios.post(`${apiBaseUrl}/api/dm/message/`, dm, headers)
    } catch (e) {
      console.log(e.message)
    }
  }

  const approveFriendRequest = async(uploadDataAsk, ask) => {
    const headers = {
      ...apiHeader(token),
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.put(`${apiBaseUrl}/api/user/approval/${ask.id}`, uploadDataAsk, headers)
      setAskList(askList.map(item => (item.id === ask.id ? res.data:item)))

      const newDataAsk = new FormData()
      newDataAsk.append('askTo', ask.askFrom)
      newDataAsk.append('approved', true)

      const newDataAskPut = new FormData()
      newDataAskPut.append('askTo', ask.askFrom)
      newDataAskPut.append('askFrom', ask.askTo)
      newDataAskPut.append('approved', true)

      const resp = askListFull.filter(item=> {return (item.askFrom === profile.userPro && item.askTo === ask.askFrom)})
      if (resp) {
        await axios.post(`${apiBaseUrl}/api/user/approval/`, newDataAsk , headers)
      } else {
        await axios.put(`${apiBaseUrl}/api/user/approval/${resp[0].id}/`, newDataAskPut, headers)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <ApiContext.Provider value={{
      profile,
      profiles,
      cover,
      setCover,
      askList,
      askListFull,
      inbox,
      requestFriend,
      createProfile,
      deleteProfile,
      editProfile,
      approveFriendRequest,
      sendDirectMessage,
      editedProfile,
      setEditedProfile,
    }}>
      {props.children}
    </ApiContext.Provider>
  )
}

export default withCookies(ApiContextProvider)
