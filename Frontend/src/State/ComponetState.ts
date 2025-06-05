import { atom } from "recoil"


export const UserDetails = atom({
    key : "UserDetails",
    default : {}
})

export const IsAuthicated = atom({
    key : "Auth",
    default : false
})

export const UserMoodEntry = atom({
    key : "moodentry",
    default : []
})

export const AllUser = atom({
    key : "alluser",
    default : []
})

export const IsLoading = atom({
    key : "loading",
    default : true
})