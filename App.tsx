// App.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AgendamentoForm from './page/AgendamentoForm';
import ListaAgendamentos from './page/ListaAgendamentos';
import { Agendamento } from './page/ListaAgendamentos';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './page/Home'

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const handleNovoAgendamento = (novoAgendamento: Agendamento) => {
    setAgendamentos([...agendamentos, novoAgendamento]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Lava Rápido Automotivo' }} />
        <Stack.Screen options={{ title: 'Agendamento' }} name="AgendamentoForm">
          {({ navigation }) => (
            <AgendamentoForm
              onAgendamento={(novoAgendamento: Agendamento) => {
                handleNovoAgendamento(novoAgendamento);
                navigation.goBack();
              }}

              agendamentos={agendamentos} setAgendamentos={setAgendamentos}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ListaAgendamentos">
          {({ navigation }) => (
            <ListaAgendamentos agendamentos={agendamentos}/>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default App;
