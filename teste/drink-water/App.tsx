import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Routes} from './scr/Routes/routes';
import { UserProvider } from './scr/contexts/UserContext';

export default function App() {
  return (
    <NativeBaseProvider>
      <UserProvider>
        <StatusBar style="auto" />
        <Routes/>
        </UserProvider>    
    </NativeBaseProvider>
  );
}
