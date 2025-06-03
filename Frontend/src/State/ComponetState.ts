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