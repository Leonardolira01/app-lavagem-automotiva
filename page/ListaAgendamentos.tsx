import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export interface Agendamento {
  placa: string;
  data: string;
  horario: string;
  tipoLavagem: string;
}

interface Props {
  agendamentos: Agendamento[];
  style?: StyleProp<ViewStyle>; 
}

const AgendamentosList: React.FC<Props> = ({ agendamentos }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos</Text>
      {agendamentos.map((agendamento, index) => (
        <Text key={index}>
          {agendamento.placa} - {agendamento.data} - {agendamento.horario} - {agendamento.tipoLavagem}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AgendamentosList;
