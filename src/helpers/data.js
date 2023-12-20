export const dataAtualFormatada = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
  }

  export const numeroFormatoData = (value) =>{
    if (!value) return "";
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    value = value.slice(0, 5);
    return value
  }