// Home.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Agendar"
        onPress={() => navigation.navigate('AgendamentoForm')}
      />
      <Button
        title="Ver Agendamentos"
        onPress={() => navigation.navigate('ListaAgendamentos')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
