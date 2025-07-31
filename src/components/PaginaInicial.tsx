import React, { useState } from 'react';
import { enviarCSVParaGOM } from '../service/gomService';

const PaginaInicial: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [k, setK] = useState(3);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resultado, setResultado] = useState<any>(null);

  const handleUpload = async () => {
    if (!arquivo) {
      alert("Selecione um arquivo CSV");
      return;
    }

    try {
      const dados = await enviarCSVParaGOM(arquivo, k);
      setResultado(dados);
    } catch (err) {
      console.error(err);
      alert("Erro ao processar o arquivo");
    }
  };

  return (
    <div>
      <h1>Página Inicial</h1>
      <input type="file" accept=".csv" onChange={e => setArquivo(e.target.files?.[0] || null)} />
      <input type="number" value={k} min={2} max={10} onChange={e => setK(Number(e.target.value))} />
      <button onClick={handleUpload}>Enviar</button>

      {resultado && (
        <div style={{ marginTop: '20px' }}>
          <h2>Resultado:</h2>
          <pre>{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaginaInicial;
