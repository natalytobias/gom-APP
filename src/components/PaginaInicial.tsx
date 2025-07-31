import React, { useState } from 'react';
import { enviarCSVParaGOM } from '../service/gomService';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  InputLabel
} from '@mui/material';

const PaginaInicial: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [k, setK] = useState(3);
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
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Processador GoM
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <InputLabel htmlFor="arquivo">Selecione um arquivo CSV</InputLabel>
          <input
            id="arquivo"
            type="file"
            accept=".csv"
            onChange={e => setArquivo(e.target.files?.[0] || null)}
          />

          <TextField
            label="Valor de K"
            type="number"
            value={k}
            onChange={e => setK(Number(e.target.value))}
            inputProps={{ min: 2, max: 10 }}
            fullWidth
          />

          <Button variant="contained" color="primary" onClick={handleUpload}>
            Enviar
          </Button>
        </Box>

        {resultado && (
          <Box mt={4}>
            <Typography variant="h6">Resultado:</Typography>
            <Paper variant="outlined" sx={{ p: 2, mt: 1, maxHeight: 300, overflow: 'auto', backgroundColor: '#f5f5f5' }}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(resultado, null, 2)}
              </pre>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PaginaInicial;
