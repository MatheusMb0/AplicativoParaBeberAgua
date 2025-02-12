import { Avatar, Box, Button, Divider, Input, Slider, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../contexts/UserContext';

interface ProfileScreenProps {
}

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { goal,  user, setGoal,setUser } = useContext(UserContext);




  return (
    <SafeAreaView>
      <Avatar 
        bg="purple.500" 
        alignSelf="center" 
        size="2xl" 
        source={{
          uri: user?.photo || undefined
        }}
      >
        {user?.name.substring(0, 1)}
      </Avatar>
      <Text fontSize="2x1" textAlign="center" mt={4}>
        {user?.name}
      </Text>


      <Input
    defaultValue={user?.name}
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