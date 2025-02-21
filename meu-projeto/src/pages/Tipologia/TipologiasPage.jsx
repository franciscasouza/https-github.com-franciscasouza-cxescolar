import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TipologiaForm = ({ tipologia, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    classificacao: "",
    dataCriacao: new Date().toISOString().slice(0, 10),
    valorAporte: "",
    indiceCorrecao: "",
    indiceRepasse: "",
  });

  useEffect(() => {
    if (tipologia) {
      console.log("Carregando tipologia:", tipologia); // Log para depuração
      setFormData({
        classificacao: tipologia.classificacao || "",
        dataCriacao: tipologia.dataCriacao
          ? new Date(tipologia.dataCriacao).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        valorAporte: tipologia.valorAporte || "",
        indiceCorrecao: tipologia.indiceCorrecao || "",
        indiceRepasse: tipologia.indiceRepasse || "",
      });
    } else {
      setFormData({
        classificacao: "",
        dataCriacao: new Date().toISOString().slice(0, 10),
        valorAporte: "",
        indiceCorrecao: "",
        indiceRepasse: "",
      });
    }
  }, [tipologia]); // Executa sempre que `tipologia` mudar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.classificacao || !formData.valorAporte) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Classificação:
          <input
            type="text"
            name="classificacao"
            value={formData.classificacao}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Data de Criação:
          <input
            type="date"
            name="dataCriacao"
            value={formData.dataCriacao}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Valor do Aporte:
          <input
            type="number"
            name="valorAporte"
            value={formData.valorAporte}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Índice de Correção:
          <input
            type="number"
            name="indiceCorrecao"
            value={formData.indiceCorrecao}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Índice de Repasse:
          <input
            type="number"
            name="indiceRepasse"
            value={formData.indiceRepasse}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

TipologiaForm.propTypes = {
  tipologia: PropTypes.shape({
    classificacao: PropTypes.string,
    dataCriacao: PropTypes.string,
    valorAporte: PropTypes.number,
    indiceCorrecao: PropTypes.number,
    indiceRepasse: PropTypes.number,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

TipologiaForm.defaultProps = {
  tipologia: null,
};

export default TipologiaForm;
