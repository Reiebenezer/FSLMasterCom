import { Stack } from 'expo-router';
import React from "react";

export default function Layout() {
  return <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' }}}>
    <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name='index' />
    <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name='level/[level]' />
    <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name='tutorial' />
    <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name='level/summary' />
    <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name='levels' />
    <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name='reset-confirmation' />
    <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name='avatars' />
  </Stack>
}