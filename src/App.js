import React from "react";

import "./styles.css";
import api from "./services/api";
import { useState, useEffect } from "react";

function App() {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo Repositório ${Date.now()}`,
      url: "https://github.com/honzcha",
      techs: ["ReactJS", "CSS", "Javascript"],
    });

    // const repo = (await response).data;

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    api.delete(`repositories/${id}`);

    const repos2 = repos.filter((repo) => repo.id !== id);

    setRepos([...repos2]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
