const getKilobyteSize = ({str}) => {
  const byteLength = new Blob([str]).size;
  const kilobytes = (byteLength / 1024).toFixed(2);
  return `${kilobytes}KB`;
};

export { getKilobyteSize }