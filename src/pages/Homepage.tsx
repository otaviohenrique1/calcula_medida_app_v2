import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import Traco from '../components/Traco';
import { Formik, FormikConfig, FormikHelpers, FormikState } from 'formik';
import CampoTexto from '../components/CampoTexto';
import { useState } from 'react';
import Botao from '../components/Botao';
import AppBar from '../components/AppBar';
import { FormTypes } from '../types/types';
import { SchemaValidacao, valoresIniciais } from '../utils/constantes';
import Calculadora from '../utils/Calculadora';

export default function Homepage() {
  const [resultado, setResultado] = useState<string>("*****");
  const [valorCampoA, setValorCampoA] = useState<string>("A");
  const [valorCampoB, setValorCampoB] = useState<string>("B");
  const [valorCampoC, setValorCampoC] = useState<string>("C");
  const [valorCampoD, setValorCampoD] = useState<string>("D");

  function onSubmitForm(values: FormTypes) {
    let campoA = parseFloat(values.campoA);
    let campoB = parseFloat(values.campoB);
    let campoC = parseFloat(values.campoC);
    let resultadoConta = Calculadora.CalculaMedida(campoA, campoB, campoC)
    setResultado(resultadoConta.toFixed(2));
    setValorCampoA(values.campoA);
    setValorCampoB(values.campoB);
    setValorCampoC(values.campoC);
    setValorCampoD(values.campoD);
  };

  function onResetForm(resetForm: (nextState?: Partial<FormikState<FormTypes>>) => void) {
    setResultado("*****");
    setValorCampoA("A");
    setValorCampoB("B");
    setValorCampoC("C");
    setValorCampoD("D");
    resetForm();
  }

  return (
    <View style={styles.container}>
      <AppBar />
      <Formik
        initialValues={valoresIniciais}
        onSubmit={onSubmitForm}
        validationSchema={SchemaValidacao}
      >
        {({ errors, values, handleChange, handleBlur, handleSubmit, resetForm, setFieldValue }) => {
          return (
            <View style={styles.main}>
              <View style={styles.form_group}>
                <CampoTexto
                  keyboardType='number-pad'
                  placeholder='Campo A'
                  onChangeText={handleChange('campoA')}
                  onBlur={handleBlur('campoA')}
                  value={values.campoA}
                  errors={errors.campoA}
                />
                <Traco />
                <CampoTexto
                  keyboardType='number-pad'
                  placeholder='Campo B'
                  onChangeText={handleChange('campoB')}
                  onBlur={handleBlur('campoB')}
                  value={values.campoB}
                  errors={errors.campoB}
                />
              </View>
              <View style={styles.form_group}>
                <CampoTexto
                  keyboardType='number-pad'
                  placeholder='Campo C'
                  onChangeText={handleChange('campoC')}
                  onBlur={handleBlur('campoC')}
                  value={values.campoC}
                  errors={errors.campoC}
                />
                <Traco />
                <CampoTexto
                  keyboardType='default'
                  placeholder='Campo D'
                  onChangeText={handleChange('campoD')}
                  onBlur={handleBlur('campoD')}
                  value={values.campoD}
                  errors={errors.campoD}
                />
              </View>
              <View style={styles.form_group}>
                <Botao
                  onPress={() => handleSubmit()}
                  backgroundColor="blue"
                  fontColor="white"
                  label="Calcular"
                />
                <Botao
                  onPress={() => onResetForm(resetForm)}
                  backgroundColor="red"
                  fontColor="white"
                  label="Limpar"
                />
              </View>
              <Text style={styles.label}>{valorCampoA} ----- {valorCampoB}</Text>
              <Text style={styles.label}>{valorCampoC} ----- {valorCampoD}</Text>
              <Text style={styles.label}>{valorCampoD} = ({valorCampoB}*{valorCampoC})/{valorCampoA}</Text>
              <Text style={styles.label}>{valorCampoD}={resultado}</Text>
            </View>
          );
        }}
      </Formik>
      <StatusBar style="light" backgroundColor="cadetblue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: "column",
    // justifyContent: 'center',
  },
  main: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  form_group: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 10,
    marginBottom: 16
  },
  label: {
    fontSize: 24
  }
});
