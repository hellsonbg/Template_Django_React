//HomePage.js

import React, { Component } from "react";
import FormularioDinamico from "../Formulario";


const stepsData = [
  {
    label: "Informações do Controlador",
    fields: [
      { name: "rSocNomeCont", label: "Razão Social/Nome", required: true },
      { name: "cnpj/cpfCont", label: "CNPJ/CPF", required: true, type: "number" },
      { name: "cepCont", label: "CEP", required: true, type: "number" },
      { name: "cidCont", label: "Cidade", required: true },
      { name: "estCont", label: "Estado", required: true },
      { name: "endCont", label: "Endereço", required: true },



    ],
  },
  {
    label: "Informações do Órgão/Entidade Vinculado ao Controlador",
    fields: [
      { name: "rSocNomeEnt", label: "Razão Social/Nome", required: true },
      { name: "cnpj/cpfEnt", label: "CNPJ/CPF", required: true, type: "number" },
      { name: "cepEnt", label: "CEP", required: true, type: "number" },
      { name: "cidEnt", label: "Cidade", required: true },
      { name: "estEnt", label: "Estado", required: true },
      { name: "endEnt", label: "Endereço", required: true },


    ],
  },
  {
    label: "Unidade Organizacional (UO) Responsável pela Atividade",
    fields: [
      { name: "UOSup", label: "UO Superior", required: true },
      { name: "UOGen", label: "UO Gerencial", required: true },
      { name: "UOSub", label: "UO Subordinada", required: true },
      { name: "cnpj/cpfUO", label: "CNPJ/CPF", required: true, type: "number" },
      { name: "cepUO", label: "CEP", required: true, },
      { name: "cidUO", label: "Cidade", required: true },
      { name: "estUO", label: "Estado", required: true },
      { name: "endUO", label: "Endereço", required: true },
      { name: "mailUO", label: "E-mail", required: true, type: "email" },
      { name: "telUO", label: "Telefone", required: true, type: "number" },



    ],
  },
  {
    label: "Informações do(s) Operador(es) e eventuais Suboperadores",
    repeatable: true,
    defaultItems: [
      {
        papelOP: '',
        socNomeOP: '',
        "cnpj/cpfOP": '',
        br: '',
        pais: '',
        cepOP: '',
        cidOP: '',
        estOP: '',
        endOP: ''
      }
    ],
    fields: [
      {
        name: "papelOP",
        label: "Papel",
        required: true,
        type: "select",
        placeholder:"Selecione...",
        options: [
          { value: "", label: "Selecione o papel..." },
          { value: "operador", label: "Operador" },
          { value: "suboperador", label: "Suboperador" },
        ]
      },
      { name: "socNomeOP", label: "Razão Social/Nome", required: true },
      { name: "cnpj/cpfOP", label: "CNPJ/CPF", required: true, type: "number" },
      {
        name: "brOP",
        label: "Brasileiro(a) ?",
        type: "radio",
        required: true,
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
        ],
      },
      {
        name: "paisOP",
        label: "País",
        required: true,
        dependOn: { name: "Br", value: "nao" },
      },
      { name: "cepOP", label: "CEP", required: true, type: "number", dependOn: { name: "Br", value: "sim" }, },
      { name: "cidOP", label: "Cidade", required: true },
      { name: "estOP", label: "Estado", required: true },
      { name: "endOP", label: "Endereço", required: true },
    ]
  }
  ,
];

const HomePage = () => {
  const handleSubmit = (data) => {
    console.log("Dados do formulário:", data);
    alert("Formulário finalizado com sucesso!");
  };

  return <FormularioDinamico stepsData={stepsData} onSubmit={handleSubmit} />
    ;
};

export default HomePage;