export const validarCNPJ = (value) => {
  value=value.replace(/\D/g,"")
  value=value.replace(/^(\d{2})(\d)/,"$1.$2")
  value=value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
  value=value.replace(/\.(\d{3})(\d)/,".$1/$2")
  value=value.replace(/(\d{4})(\d)/,"$1-$2")
  return value
}

export const valiadarCPF = (value) => {
  value=value.replace(/\D/g,"")
  value=value.replace(/(\d{3})(\d)/,"$1.$2")
  value=value.replace(/(\d{3})(\d)/,"$1.$2")
  value=value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
  return value
}

export const celular = (value) => {

var value = value.replace(/\D/g, "");
value = value.replace(/^0/, "");
if (value.length > 10) {
  value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
} else if (value.length > 5) {
  value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
} else if (value.length > 2) {
  value = value.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
} else {
  value = value.replace(/^(\d*)/, "($1");
}
return value;
}

export const telefone = (value) => {
  var value = value.replace(/\D/g, "");
value = value.replace(/^0/, "");
if (value.length > 10) {
  value = value.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3");
} else if (value.length > 6) {
  value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
} else if (value.length > 2) {
  value = value.replace(/^(\d\d)(\d{0,4})/, "($1) $2");
} else {
  value = value.replace(/^(\d*)/, "($1");
}
  return value;
}

export const zipCodeMask = (value) => {
if (!value) return "";
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    return value
}

export const numeroFormato = (value) => {
  if (!value) return "";
      value = value.replace(/\D/g, '')
      return value
}

export const sizes = [
  { media: '(max-width: 640px)', size: '100vw' },
  { media: '(max-width: 768px)', size: '80vw' },
  { media: '(max-width: 1024px)', size: '70vw' },
  { media: '(min-width: 1025px)', size: '50vw' },
];