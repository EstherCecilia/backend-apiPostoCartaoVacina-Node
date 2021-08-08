function campoError(valores) {
  let newRequest = "";

  valores.forEach((key, index) => {
    if (key.value !== null) return;
    if (index < valores.length - 1) {
      newRequest += key.label + ", ";
      return;
    }
    newRequest += key.label;
  });

  return newRequest;
}

module.exports = campoError;
