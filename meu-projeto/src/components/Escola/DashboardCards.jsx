import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DashboardCards.css";
import DashboardCards from "../../components/Escola/DashboardCards";
import PropTypes from "prop-types";

function DetalhesEscola() {
  const { id } = useParams();
  const [escola] = useState({
    nome: "Escola Exemplo",
    regiao: "Centro",
    classificacao: "A+",
    id: id,
    numEstudantes: 1500,
    numProfessores: 80,
    numFuncionarios: 50,
    receitaTotal: "1,200,000",
  });

  useEffect(() => {
    // Simulação de delay para imitar a chamada da API
    setTimeout(() => {
      console.log("Dados fictícios carregados!");
    }, 1000);
  }, []);

  return (
    <>
      <div className="detalhes-escola">
        <div className="jumbotron">
          <h1 className="display-4">{escola.nome}</h1>
          <p className="lead">Região: {escola.regiao}</p>
          <hr className="my-4" />
          <p>Classificação: {escola.classificacao}</p>
          <p>ID: {escola.id}</p>
        </div>

        {/* Passamos os dados fictícios para o Dashboard */}
        <DashboardCards
          numEstudantes={escola.numEstudantes}
          numProfessores={escola.numProfessores}
          numFuncionarios={escola.numFuncionarios}
          receitaTotal={escola.receitaTotal}
        />
      </div>
    </>
  );
}

DashboardCards.propTypes = {
  numEstudantes: PropTypes.number.isRequired,
  numProfessores: PropTypes.number.isRequired,
};
export default DetalhesEscola;
