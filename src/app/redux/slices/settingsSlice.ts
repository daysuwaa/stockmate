import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Profile = {
    name: string;
    email: string;
    avatar?: string| null;
    phone: string;
    website?: string;
    address?: string;
    hydratedFromAuth: boolean
    isProfile:boolean
}

type Preferences = {
    darkMode:"light"| "dark";
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
    avatar: null,
    phone: '',
    website: '',
    address: '',
    hydratedFromAuth:false,
    isProfile:false
 },

    preferences:{
        darkMode: "light",
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
            action: PayloadAction<Partial<Profile>>)=>{
            state.profile = {...state.profile, ...action.payload}
        },
        markProfileHydrated: (state) => {
        state.profile.hydratedFromAuth = true;
        },

        updatePreferences: (
            state, 
            action: PayloadAction<Partial<Preferences>>)=>{
            state.preferences = {...state.preferences, ...action.payload}
        },
        updateSecurity: (
            state, 
            action: PayloadAction<Partial<Security>>)=>{
            state.security = {...state.security, ...action.payload}
        },
    }
})
export const { updatePreferences, updateProfile, updateSecurity, markProfileHydrated} = settingsSlice.actions;
export default settingsSlice.reducer;