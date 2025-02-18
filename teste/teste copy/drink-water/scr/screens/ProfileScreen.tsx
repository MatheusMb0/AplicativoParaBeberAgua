import { Avatar, Box, Button, Divider, Input, Slider, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../contexts/UserContext';
import { usePersistState } from '../hooks/usePersistState';

interface ProfileScreenProps {
}

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [initializing, setInitializing] = useState(true);
  const [goal2, setGoal2] = usePersistState(2, "@goal2");
  const { goal,  user, setGoal,createAccountOnFirebase, forgotPassword, login, logout } = useContext(UserContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

 



  return (
    <SafeAreaView>
      <TextField
        onChangeText={(value) => {
          setEmail(value);
        }}
        placeholder="Email"
      />

      <TextField
        onChangeText={(value) => {
          setPassword(value);
        }}
        type="password"
        placeholder="Senha"
      />

      <Button
        onPress={() => {
        createAccountOnFirebase({
          email,
          password,
        });
        }}
      >
        Criar Conta
      </Button>

      <Button
        onPress={() => {
        login({
          email,
          password,
        });
        }}
      >
        Login
      </Button>

      <Button
        onPress={() => {
        forgotPassword({
          email,
        });
        }}
      >
        Recuperar Senha
      </Button>

    
      <Button onPress={logout} >logout</Button>

      <Avatar 
        bg="purple.500" 
        alignSelf="center" 
        size="2xl" 
        source={{
          uri: user?.photoURL || undefined
        }}
      >
        {user?.displayName?.substring(0, 1)}
      </Avatar>
      <Text fontSize="2x1" textAlign="center" mt={4}>
        {user?.displayName || user?.email}
      </Text>


      <Input
    defaultValue={user?.displayName}
    onChangeText={(value) => {
        setUser({
            name: value,
            photo: String(user?.photo),
        });
    }}
    placeholder="Default Input"
/>



      <Divider my={20} />

      <Box mx={20}>
        <Text fontSize="xl" textAlign="center" mt={4}>
          Meta de água
        </Text>
        <Text fontSize="xl" textAlign="center" mt={4}>
          {goal}ml
        </Text>
        <Slider 
          defaultValue={goal}
          value={goal}
          onChange={(value) => setGoal(value)}
          minValue={0} 
          maxValue={4000} 
          step={100}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Box>
    </SafeAreaView>
  );
};