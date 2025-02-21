import PropTypes from "prop-types";
import "./TabelaEscolas.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TabelaEscolas({ escolas, onEdit }) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState(null);

  const sortedEscolas = [...escolas].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDetails = (id) => {
    navigate(`/escolas/${id}`); // Redireciona para a página de detalhes
  };

  return (
    <div className="tabela-escolas-container">
      <table className="tabela-escolas">
        <thead>
          <tr>
            <th onClick={() => handleSort("nome")}>
              Nome{" "}
              {sortConfig?.key === "nome" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("regiao")}>
              Região{" "}
              {sortConfig?.key === "regiao" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("classificacao")}>
              Classificação{" "}
              {sortConfig?.key === "classificacao" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedEscolas.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                Nenhuma escola encontrada.
              </td>
            </tr>
          ) : (
            sortedEscolas.map((escola) => (
              <tr key={escola.id}>
                <td>{escola.nome}</td>
                <td>{escola.regiao}</td>
                <td>{escola.classificacao}</td>
                <td className="acoes">
                  <button
                    className="btn-detalhes"
                    onClick={() => handleDetails(escola.id)}
                  >
                    Detalhes
                  </button>
                  <button className="btn-editar" onClick={() => onEdit(escola)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

TabelaEscolas.propTypes = {
  escolas: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TabelaEscolas;
