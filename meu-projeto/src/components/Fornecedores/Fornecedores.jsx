import { useState, useEffect } from "react";
import FornecedorForm from "../../components/Fornecedores/FornecedorForm";
import "./Modal.css";

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);

  // Fetch de fornecedores na API
  useEffect(() => {
    fetch("https://localhost:7165/api/Fornecedor")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar os Fornecedores");
        return response.json();
      })
      .then((data) => {
        setFornecedores(data); // Atualiza o estado com os dados recebidos
      })
      .catch((error) => console.error(error.message));
  }, []);

  // Função para salvar (criar/editar) fornecedor
  const handleSave = (data) => {
    const method = data.id ? "PUT" : "POST"; // PUT para editar, POST para criar
    const url = data.id
      ? `https://localhost:7165/api/Fornecedor/${data.id}` // Atualização
      : "https://localhost:7165/api/Fornecedor"; // Criação

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            console.error("Erro no servidor:", error);
            throw new Error("Erro ao salvar fornecedor");
          });
        }
        return response.json();
      })
      .then((savedFornecedor) => {
        if (data.id) {
          // Atualiza o fornecedor na lista
          setFornecedores((prev) =>
            prev.map((item) =>
              item.id === savedFornecedor.id ? savedFornecedor : item
            )
          );
        } else {
          // Adiciona um novo fornecedor à lista
          setFornecedores((prev) => [...prev, savedFornecedor]);
        }

        // Fecha o modal e limpa o estado selecionado
        setShowModal(false);
        setSelectedFornecedor(null);
      })
      .catch((error) => console.error(error.message));
  };

  // Função para abrir o modal de edição
  const handleEdit = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setShowModal(true);
  };

  // Função para cancelar edição/criação
  const handleCancel = () => {
    setShowModal(false);
    setSelectedFornecedor(null);
  };
  // Função pra formatar o CNPJ
  const formatCNPJ = (cnpj) => {
    if (!cnpj) return "CNPJ não disponível";
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  };

  // Função para formatar o telefone
  const formatTelefone = (telefone) => {
    if (!telefone) return "Telefone não disponível";
    const telefoneLimpo = telefone.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (telefoneLimpo.length === 11) {
      // Formato com 9 dígitos
      return telefoneLimpo.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (telefoneLimpo.length === 10) {
      // Formato com 8 dígitos
      return telefoneLimpo.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    }

    return telefone; // Retorna como está se não for um formato válido
  };

  return (
    <div className="tabela-escolas-container">
      <h1>Gerenciar Fornecedores</h1>
      <button
        className="btn-detalhes"
        onClick={() => {
          setSelectedFornecedor(null); // Define como novo fornecedor
          setShowModal(true); // Abre o modal
        }}
      >
        Novo Fornecedor
      </button>
      <table className="tabela-escolas" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>CNPJ</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Localização</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                Nenhum fornecedor encontrado.
              </td>
            </tr>
          ) : (
            fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{formatCNPJ(fornecedor.cnpj) || "CNPJ não disponível"}</td>
                <td>{fornecedor.nome || "Nome não disponível"}</td>
                <td>{fornecedor.contato || "Contato não disponível"}</td>
                <td>
                  {fornecedor.localizacao || "Localização não disponível"}
                </td>
                <td>
                  {formatTelefone(
                    fornecedor.telefone || "Telefone não disponível"
                  )}
                </td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => handleEdit(fornecedor)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal de Criação/Edição */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>
                {selectedFornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
              </h2>
           
            </div>
            <div className="modal-body">
              <FornecedorForm
                fornecedor={selectedFornecedor}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fornecedores;
