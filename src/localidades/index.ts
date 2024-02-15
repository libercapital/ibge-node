import axios, { AxiosRequestConfig } from 'axios';

export const APILocalidades = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Estado {
  id: number
  sigla: string
  nome: string
  regiao: Regiao
}

export interface Regiao {
  id: number
  sigla: string
  nome: string
}

export const fetchStates = (config: AxiosRequestConfig = {}) => APILocalidades.get<Estado[]>('/estados', {
  ...config,
  params: {
    orderBy: 'nome',
    ...config?.params || {},
  },
});

export interface Municipio {
  id: number
  nome: string
  microrregiao: Microrregiao
  "regiao-imediata": RegiaoImediata
}

export interface Microrregiao {
  id: number
  nome: string
  mesorregiao: Mesorregiao
}

export interface Mesorregiao {
  id: number
  nome: string
  UF: Uf
}

export interface Uf {
  id: number
  sigla: string
  nome: string
  regiao: Regiao
}

export interface Regiao {
  id: number
  sigla: string
  nome: string
}

export interface RegiaoImediata {
  id: number
  nome: string
  "regiao-intermediaria": RegiaoIntermediaria
}

export interface RegiaoIntermediaria {
  id: number
  nome: string
  UF: Uf
}

export const fetchMunicipiosByUF = (uf: string, config: AxiosRequestConfig = {}) => APILocalidades.get<Municipio[]>(`/estados/${uf}/municipios`, {
  ...config,
  params: {
    orderBy: 'nome',
    ...config?.params || {},
  },
});
