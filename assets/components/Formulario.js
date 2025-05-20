// FormularioDinamico.jsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Fade,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Checkbox,
  IconButton
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0, resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

const validarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
};

const FormularioDinamico = ({ stepsData, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(() => {
    const initialValues = {};

    stepsData.forEach(step => {
      if (step.repeatable) {
        initialValues[step.label] = step.defaultItems || [{}];
      } else {
        step.fields.forEach(field => {
          initialValues[field.name] = "";
        });
      }
    });

    return initialValues;
  });
  const [errors, setErrors] = useState({});

  const currentStep = stepsData[activeStep];

  const handleNext = () => {
    const currentFields = currentStep.fields.filter(f =>
      !f.dependOn || formValues[f.dependOn.name] === f.dependOn.value
    );

    const newErrors = {};
    if (currentStep.repeatable) {
      (formValues[currentStep.label] || []).forEach((group, idx) => {
        currentFields.forEach(field => {
          if (field.required && !group[field.name]) {
            newErrors[`${currentStep.label}-${idx}-${field.name}`] = "Campo obrigatório";
          }
        });
      });
    } else {
      currentFields.forEach(field => {
        if (field.required && !formValues[field.name]) {
          newErrors[field.name] = "Campo obrigatório";
        }
      });
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (activeStep === stepsData.length - 1) {
      onSubmit(formValues);
    } else {
      setActiveStep(s => s + 1);
    }
  };

  const handleBack = () => setActiveStep(s => s - 1);

  const handleChange = (name, value, groupIdx = null) => {
    setFormValues(prev => {
      const updated = { ...prev };
      if (groupIdx !== null) {
        const groupArray = [...(updated[currentStep.label] || [])];
        groupArray[groupIdx] = { ...groupArray[groupIdx], [name]: value };
        updated[currentStep.label] = groupArray;
      } else {
        updated[name] = value;
      }
      return updated;
    });

    setErrors(e => ({ ...e, [groupIdx !== null ? `${currentStep.label}-${groupIdx}-${name}` : name]: undefined }));
  };

  const addGroup = () => {
    setFormValues(prev => ({
      ...prev,
      [currentStep.label]: [...(prev[currentStep.label] || []), {}]
    }));
  };

  const removeGroup = (idx) => {
    setFormValues(prev => {
      const updatedGroups = [...(prev[currentStep.label] || [])];
      updatedGroups.splice(idx, 1);
      return { ...prev, [currentStep.label]: updatedGroups };
    });
  };

  const progress = ((activeStep + 1) / stepsData.length) * 100;

  const renderField = (field, value, groupIdx = null) => {
    const errorKey = groupIdx !== null ? `${currentStep.label}-${groupIdx}-${field.name}` : field.name;
    const val = value || "";
    if (field.dependOn) {
      const dependValue = groupIdx !== null
        ? (formValues[currentStep.label]?.[groupIdx]?.[field.dependOn.name])
        : formValues[field.dependOn.name];

      if (dependValue !== field.dependOn.value) {
        return null;
      }
    }
    const validatorFn = field.validate || getValidationForField(field.name);

    if (validatorFn) {
      const isValid = validatorFn(val);
      if (!isValid) {
        newErrors[errorKey] = `Valor inválido para ${field.label}`;
      }
    }


    const commonProps = {
      key: errorKey,
      label: field.label,
      value: val,
      error: !!errors[errorKey],
      helperText: errors[errorKey],
      onChange: e => handleChange(field.name, e.target.value, groupIdx),
      fullWidth: true,
      sx: { my: 1 },
      placeholder: field.placeholder || "",
      helperText: errors[errorKey] || field.description || "",
    };

    switch (field.type) {
      case "textarea":
        return <TextField {...commonProps} multiline rows={4} />;
      case "select":
        return (
          <FormControl fullWidth key={errorKey} sx={{ my: 1 }}>
            <FormLabel>{field.label}</FormLabel>
            <Select
              value={val}
              onChange={e => handleChange(field.name, e.target.value, groupIdx)}
              error={!!errors[errorKey]}
            >
              {field.options.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
            {errors[errorKey] && (
              <Typography color="error" variant="caption">
                {errors[errorKey]}
              </Typography>
            )}
          </FormControl>
        );
      case "radio":
        return (
          <FormControl key={errorKey} component="fieldset" sx={{ my: 1 }}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup style={{ flexDirection: "row" }}
              value={val}
              onChange={e => handleChange(field.name, e.target.value, groupIdx)}
            >
              {field.options.map(opt => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.label}
                />
              ))}
            </RadioGroup>
            {errors[errorKey] && (
              <Typography color="error" variant="caption">
                {errors[errorKey]}
              </Typography>
            )}
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControlLabel
            key={errorKey}
            control={
              <Checkbox
                checked={!!val}
                onChange={e => handleChange(field.name, e.target.checked, groupIdx)}
              />
            }
            label={field.label}
            sx={{ my: 1 }}
          />
        );
      default:
        return (
          <TextField
            {...commonProps}
            type={field.type || "text"}
            sx={{
              ...commonProps.sx,
              ...(field.type === "number" && {
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }),
            }}
          />
        );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", p: 2 }}>
      <Paper elevation={4} sx={{ width: "80%", height: "80%", display: "flex", flexDirection: "column", borderRadius: 3, p: 4 }}>
        <Box sx={{ width: "100%", mb: 3 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          <Typography variant="caption" sx={{ mt: 1, textAlign: "right" }}>{`${Math.round(progress)}% concluído`}</Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {stepsData.map((step, idx) => (
            <Step key={step.label} completed={idx < activeStep}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Fade in>
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>{currentStep.label}</Typography>

            {currentStep.repeatable ? (
              <>
                {(formValues[currentStep.label] || []).map((group, idx) => (
                  <Box key={idx} sx={{ mb: 3, p: 2, pr: "5vw", border: "1px solid #ccc", borderRadius: 2, position: "relative", }}>
                    {currentStep.fields.map(field => renderField(field, group[field.name], idx))}
                    <IconButton
                      onClick={() => removeGroup(idx)}
                      size="medium"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1, // garante que fique acima do conteúdo sem sobrepor
                        backgroundColor: "white",
                        color: "error.main",
                        border: "1px solid",
                        borderColor: "error.main",
                        "&:hover": {
                          backgroundColor: "error.light",
                          color: "white",
                        },
                      }}
                      aria-label="Remover"
                    >
                      <DeleteIcon />
                    </IconButton>

                  </Box>
                ))}
                <Button onClick={addGroup} variant="outlined" sx={{ mt: 1 }}>
                  Adicionar Novo Operador/Suboperador
                </Button>
              </>
            ) : (
              currentStep.fields.map(field => renderField(field, formValues[field.name]))
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                Voltar
              </Button>
              <Button onClick={handleNext} variant="contained">
                {activeStep === stepsData.length - 1 ? "Finalizar" : "Próximo"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
};

export default FormularioDinamico;
