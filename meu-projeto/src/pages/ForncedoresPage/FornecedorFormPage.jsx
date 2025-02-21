import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FornecedorForm from "../../components/Fornecedores/FornecedorForm";

const FornecedorFormPage = () => {
  const { id } = useParams(); // Obtém o ID da URL (se existir)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fornecedor, setFornecedor] = useState(null);
  const baseUrl = "https://localhost:7165";

  useEffect(() => {
    if (id) {
      // Buscar os dados do fornecedor para edição
      setLoading(true);
      fetch(`${baseUrl}/api/fornecedor/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao carregar os dados do fornecedor.");
          }
          return response.json();
        })
        .then((data) => setFornecedor(data))
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = (data) => {
    const method = id ? "PUT" : "POST";
    const url = id
      ? `${baseUrl}/api/Fornecedor/${id}` // Atualiza fornecedor existente
      : `${baseUrl}/api/Fornecedor`; // Cria novo fornecedor

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
        navigate("/fornecedores"); // Redireciona para a lista de fornecedores
      })
      .catch((error) => console.error(error.message));
  };

  const handleCancel = () => {
    navigate("/fornecedores"); // Redireciona para a lista de fornecedores
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{id ? "Editar Fornecedor" : "Novo Fornecedor"}</h1>
      <FornecedorForm
        fornecedor={fornecedor}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default FornecedorFormPage;
