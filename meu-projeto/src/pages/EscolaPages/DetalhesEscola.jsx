import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetalhesEscola.css";

function DetalhesEscola() {
  const { id } = useParams();
  const [escola, setEscola] = useState(null);

  useEffect(() => {
    fetchEscola();
  }, []);

  const fetchEscola = async () => {
    try {
      const response = await fetch(`https://localhost:7165/api/Escolas/${id}`);
      const data = await response.json();
      setEscola(data);
    } catch (error) {
      console.error("Erro ao carregar detalhes da escola:", error);
    }
  };

  if (!escola) {
    return <p>Carregando detalhes da escola...</p>;
  }

  return (
    <>
      <div className="detalhes-escola">
        <div className="jumbotron">
          <h1 className="display-4">{escola.nome}</h1>
          <p className="lead">Região: {escola.regiao}</p>
          <hr className="my-4" />
          <p>Classificação: {escola.classificacao}</p>
          <p>ID: {escola.id}</p>
          <p>Outras informações relevantes podem ser exibidas aqui...</p>
        </div>
      </div>
    </>
  );
}

export default DetalhesEscola;
