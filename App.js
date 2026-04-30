import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RootNaviagtor from './src/view/routes/RootNaviagtor';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import store from './src/consts/redux/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import client from './src/graphql/client';

// Debug: check what each import resolves to
console.log('ApolloProvider:', ApolloProvider);
console.log('Provider:', Provider);
console.log('ToastProvider:', ToastProvider);
console.log('store:', store);
console.log('client:', client);
console.log('RootNaviagtor:', RootNaviagtor);


export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ToastProvider>
          <RootNaviagtor />
        </ToastProvider>
      </ApolloProvider>
    </Provider>
  );
}
