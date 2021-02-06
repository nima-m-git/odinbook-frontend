const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

const imageBufferDataToString = (data) =>
  `data:image/jpeg;base64,${arrayBufferToBase64(data)}`;

const base64ToString = (base64) => `data:image/jpeg;base64,${base64}`;

export { imageBufferDataToString, base64ToString };
