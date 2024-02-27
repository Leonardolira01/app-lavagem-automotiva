// AgendamentoForm.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, StyleProp, ViewStyle } from 'react-native';
import { Agendamento } from './ListaAgendamentos';
import { parse, isDate } from 'date-fns';


interface AgendamentoFormProps {
  onAgendamento: (novoAgendamento: { placa: string, data: string, horario: string, tipoLavagem: string }) => void;
  agendamentos: Agendamento[];
  setAgendamentos: (agendamento: Agendamento[]) => void;
  style?: StyleProp<ViewStyle>;
}

const AgendamentoForm: React.FC<AgendamentoFormProps> = ({ agendamentos, setAgendamentos, onAgendamento }) => {
  const [placa, setPlaca] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [tipoLavagem, setTipoLavagem] = useState('');

  const validarPlacaMercosul = (placa: string): boolean => {
    const regexPlacaMercosul = /^[a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2}$/;
    return regexPlacaMercosul.test(placa);
  };

  const validarDuplicidade = () => {
    const horarioOcupado = agendamentos.some(agendamento => {
      return agendamento.data === data && agendamento.horario === horario;
    });

    return !horarioOcupado;
  }

  const handleAgendar = () => {
    if (!validarPlacaMercosul(placa)) {
      Alert.alert(
        'Placa Inválida',
        'Por favor, insira uma placa válida no formato ABC1D34.',
      );
      return;
    }

    const [hora, minuto] = horario.split(':').map(Number);
  const horaSelecionada = hora + minuto / 60;

  if (horaSelecionada < 10 || horaSelecionada >= 18) {
    Alert.alert('Horário Indisponível', 'Horário fora do expediente de atendimento. Por favor, escolha outro horário.');
    return;
  }

    if (hora === 12 && minuto >= 0 && minuto <= 59) {
      Alert.alert('Horário Indisponível', 'Pausa para o almoço. Por favor, escolha outro horário!');
      return;
    }

    if (!validarDuplicidade()) {
      Alert.alert('Horário Indisponível', 'Horário já agendado. Por favor, escolha outro!');
      return;
    }

    const duracao = tipoLavagem === 'Simples' ? 30 : 45;
    console.log('Duração da lavagem:', duracao);

    const novoAgendamento = { placa, data, horario, tipoLavagem };
    const dataConvert = parse(data, 'dd/MM/yyyy', new Date())
    console.log('data convertida aqui', dataConvert)
    const novosAgendamentos = [...agendamentos, novoAgendamento].sort((a, b): any => {
      const dataA = parse(a.data, 'dd/MM/yyyy', new Date()).getTime()
      const dataB = parse(b.data, 'dd/MM/yyyy', new Date()).getTime()
      return dataA - dataB
    });

    onAgendamento(novoAgendamento);
    setAgendamentos(novosAgendamentos);
    setPlaca('');
    setData('');
    setHorario('');
    setTipoLavagem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Placa:</Text>
      <TextInput
        style={styles.input}
        value={placa}
        onChangeText={setPlaca}
        placeholder="ABC1D23"
      />
      <Text style={styles.label}>Data:</Text>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setData}
        placeholder="DD/MM/AAAA"
      />
      <Text style={styles.label}>Horário:</Text>
      <TextInput
        style={styles.input}
        value={horario}
        onChangeText={setHorario}
        placeholder="HH:MM"
      />
      <Text style={styles.label}>Tipo de Lavagem:</Text>
      <TextInput
        style={styles.input}
        value={tipoLavagem}
        onChangeText={setTipoLavagem}
        placeholder="Simples ou Completa"
      />
      <Button title="Agendar" onPress={handleAgendar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AgendamentoForm;
