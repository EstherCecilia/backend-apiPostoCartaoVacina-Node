function trataRequest(request) {
  let valores = Object.keys(request);
  let newRequest = {};

  valores.forEach((key) => {
    if (request[key] !== undefined) {
      newRequest = { ...newRequest, [key]: request[key] };
    }
  });

  return newRequest;
}

module.exports = trataRequest;
