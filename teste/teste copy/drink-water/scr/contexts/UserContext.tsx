import React, { createContext, useEffect, useState } from 'react';
import { IUser } from '../types/UserInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePersistState } from '../hooks/usePersistState';
import auth from "@react-native-firebase/auth";

interface IUserContext {
    user?: IUser | null;
    goal: number;
    setGoal: (value: number) => Promise<void>;
    setUser: (value:IUser)=>Promise<void>;

    login: (value: {email: string; password: string;}) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (value: {email: string;}) => Promise<void>;
    createAccountOnFirebase: (value: {email: string; password: string;}) => Promise<void>;
}

const GOAL = 2000;

export const UserContext = createContext<IUserContext>({
    goal: GOAL,
    user: null,
    setGoal: () => Promise.resolve(),
    setUser: () => Promise.resolve(),
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    createAccountOnFirebase: () => Promise.resolve(),
});

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = usePersistState<IUser | null>(null,"@user");  
    const [goal, setGoal] = usePersistState<number>(GOAL, 'goalKey'); // Corrigido aqui

    function onAuthStateChanged(user: IUser | null) {
        setUser(user);
      }
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

        async function createAccountOnFirebase({email,password,}: {email:string,password:string,}) {
            return await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }
      
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }
      
              console.error(error);
            });
        }
      
        async function logout() {
            return await auth().signOut(); 
        }
      
         async function login({ email,password,}: {email:string,password:string,}) {
          return await auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => {
              Alert.alert("Logged in!");
            })
            .catch((error) => {
              if(error.code === "auth/invalid-email") {
                Alert.alert("That email address is invalid");
              }
      
              Alert.alert(error);
            })
        }
      
        async function forgotPassword({ email,}: {email:string,}) {
            return await auth()
            .sendPasswordResetEmail(email)
            .then(() => {
              Alert.alert("Password reset email sent!");
            })
            .catch((error) => {
              Alert.alert(JSON.stringify(error, undefined, 2));
            })
        }

    return (
        <UserContext.Provider value={{ goal, user, setGoal,setUser,
            login,
            logout,
            forgotPassword,
            createAccountOnFirebase,
         }}>
            {children}
        </UserContext.Provider>
    );
};