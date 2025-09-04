import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Profile = {
    name: string;
    email: string;
    avatarUrl?: string| null;
    phone: number;
    website?: string;
    address?: string;
}

type Preferences = {
    darkMode:boolean;
    language:string;
    currency: string;
}

type Security ={
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

type SettingsState = {
    profile: Profile;
    preferences: Preferences;
    security: Security;
}

const initialState: SettingsState = {
    profile:{
    name:'',
    email: '',
    avatarUrl: null,
    phone: 0,
    website: '',
    address: '',
 },

    preferences:{
        darkMode: false,
        language:'en',
        currency:'USD',
    },

    security:{
        currentPassword:'',
        newPassword:'',
        confirmPassword:'',
    }
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        updateProfile: 
        (
            state, 
            action: PayloadAction<Profile>)=>{
            state.profile = {...state.profile, ...action.payload}
        },

        updatePreferences: (
            state, 
            action: PayloadAction<Preferences>)=>{
            state.preferences = {...state.preferences, ...action.payload}
        },
        updateSecurity: (
            state, 
            action: PayloadAction<Security>)=>{
            state.security = {...state.security, ...action.payload}
        },
    }
})
export const {updateProfile, updatePreferences, updateSecurity} = settingsSlice.actions;
export default settingsSlice.reducer;