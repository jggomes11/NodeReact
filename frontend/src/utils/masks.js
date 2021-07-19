/**
 *
 * @param {String} v - value to be reedited
 * @param {String} type type of the document
 * @returns the edited string
 */
export const addCpfCnpjMask = (v, type) => {
  let aux = v.replace(/\D/g, "");

  if (type === "CPF") {
    aux = aux.replace(/(\d{3})(\d)/, "$1.$2");
    aux = aux.replace(/(\d{3})(\d)/, "$1.$2");
    aux = aux.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else if (type === "CNPJ") {
    aux = aux.replace(/^(\d{2})(\d)/, "$1.$2");
    aux = aux.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    aux = aux.replace(/\.(\d{3})(\d)/, ".$1/$2");
    aux = aux.replace(/(\d{4})(\d)/, "$1-$2");
  } else return aux;
  return aux;
};

/**
 *
 * @param {String} v - value to be reedited
 * @returns {String}
 */
export const rmvCpfCnpjMask = (v) => {
  let aux = v.replaceAll(".", "");
  aux = aux.replace("-", "");
  aux = aux.replace("/", "");
  return aux;
};
