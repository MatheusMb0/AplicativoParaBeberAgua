import React, { createContext, useEffect, useState } from 'react';
import { IUser } from '../types/UserInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePersistState } from '../hooks/usePersistState';

interface IUserContext {
    user?: IUser;
    goal: number;
    setGoal: (value: number) => Promise<void>;
    setUser: (value:IUser)=>Promise<void>
}

const GOAL = 2000;
const USER = {
    name: 'Matheus Mb',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b293307ixlib-rb-1.2.16ixid=MnwxMjA3'
}

export const UserContext = createContext<IUserContext>({
    goal: GOAL,
    setGoal: () => Promise.resolve(),
    setUser: () => Promise.resolve(),
    user: USER,

});

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = usePersistState<IUser>(USER,"@user");  
    const [goal, setGoal] = usePersistState<number>(GOAL, 'goalKey'); // Corrigido aqui

    return (
        <UserContext.Provider value={{ goal, user, setGoal,setUser }}>
            {children}
        </UserContext.Provider>
    );
};