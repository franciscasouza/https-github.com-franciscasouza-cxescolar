import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TipologiaForm from "../../components/Tipologias/TipologiaForm";

const TipologiaFormPage = () => {
  const { id } = useParams(); // Obtém o ID da URL (se existir)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tipologia, setTipologia] = useState(null);

  useEffect(() => {
    var url = "https://localhost:7165";
    if (id) {
      // Buscar os dados da tipologia para edição
      setLoading(true);
      fetch(url + `/api/tipologias/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao carregar os dados da tipologia.");
          }
          return response.json();
        })
        .then((data) => setTipologia(data))
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = (data) => {
    const method = id ? "PUT" : "POST";
    const url = id ? url + `/api/tipologias/${id}` : url + `/api/tipologias`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar os dados.");
        }
        return response.json();
      })
      .then(() => {
        navigate("/"); // Redireciona para a lista de tipologias após salvar
      })
      .catch((error) => console.error(error.message));
  };

  const handleCancel = () => {
    navigate("/"); // Redireciona para a lista de tipologias ao cancelar
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{id ? "Editar Tipologia" : "Nova Tipologia"}</h1>
      <TipologiaForm
        tipologia={tipologia}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TipologiaFormPage;
