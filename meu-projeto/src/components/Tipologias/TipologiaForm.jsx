import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TipologiaForm = ({ tipologia, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    classificacao: "",
    dataCriacao: new Date().toISOString(), // Data ISO completa
    valorAporte: "",
    indiceCorrecao: "",
    indiceRepasse: "",
  });

  useEffect(() => {
    if (tipologia) {
      setFormData({
        id: tipologia.id || null, // Garante que o ID é incluído
        classificacao: tipologia.classificacao || "",
        dataCriacao: tipologia.dataCriacao
          ? new Date(tipologia.dataCriacao).toISOString()
          : new Date().toISOString(),
        valorAporte: tipologia.valorAporte || "",
        indiceCorrecao: tipologia.indiceCorrecao || "",
        indiceRepasse: tipologia.indiceRepasse || "",
      });
    } else {
      setFormData({
        id: null, // Reseta o ID para novo registro
        classificacao: "",
        dataCriacao: new Date().toISOString(),
        valorAporte: "",
        indiceCorrecao: "",
        indiceRepasse: "",
      });
    }
  }, [tipologia]);

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

    // Chama o método onSave passando os dados formatados
    onSave({
      ...formData,
      valorAporte: parseFloat(formData.valorAporte),
      indiceCorrecao: parseFloat(formData.indiceCorrecao),
      indiceRepasse: parseFloat(formData.indiceRepasse),
    });

    // Fecha o modal
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
              type="datetime-local"
              name="dataCriacao"
              value={formData.dataCriacao.slice(0, 16)} // Formata para o input datetime-local
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
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

TipologiaForm.propTypes = {
  tipologia: PropTypes.shape({
    id: PropTypes.number,
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
