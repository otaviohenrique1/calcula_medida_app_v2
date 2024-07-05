import { FormTypes } from "../types/types";
import * as Yup from 'yup';

export const valoresIniciais: FormTypes = {
  campoA: '',
  campoB: '',
  campoC: '',
  campoD: ''
};

const somenteNumeros = 'Aceita somente numeros';
const valorPositivo = 'Valor tem que ser positivo';
const campoVazio = 'Campo vazio';

export const SchemaValidacao = Yup.object().shape({
  campoA: Yup.number()
    .typeError(somenteNumeros)
    .positive(valorPositivo)
    .required(campoVazio),
  campoB: Yup.number()
    .typeError(somenteNumeros)
    .positive(valorPositivo)
    .required(campoVazio),
  campoC: Yup.number()
    .typeError(somenteNumeros)
    .positive(valorPositivo)
    .required(campoVazio),
  campoD: Yup.string()
    .required(campoVazio),
});