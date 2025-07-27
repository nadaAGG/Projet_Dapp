import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const exercises = [
    {
      id: 1,
      title: "Exercice 1 - Addition",
      description: "Fonctions view et pure pour l'addition"
    },
    {
      id: 2,
      title: "Exercice 2 - Conversion Ether/Wei",
      description: "Conversion entre Ether et Wei"
    },
    {
      id: 3,
      title: "Exercice 3 - Gestion de Chaînes",
      description: "Manipulation des strings en Solidity"
    },
    {
      id: 4,
      title: "Exercice 4 - Nombre Positif",
      description: "Vérification si un nombre est positif"
    },
    {
      id: 5,
      title: "Exercice 5 - Parité",
      description: "Vérification de la parité d'un nombre"
    },
    {
      id: 6,
      title: "Exercice 6 - Tableau de Nombres",
      description: "Gestion d'un tableau dynamique"
    },
    {
      id: 7,
      title: "Exercice 7 - Héritage",
      description: "Contrat abstrait et héritage"
    },
    {
      id: 8,
      title: "Exercice 8 - Paiements",
      description: "Gestion des transactions et paiements"
    }
  ];

  return (
    <div className="home">
      <h2>Menu Principal - TP3 Solidity</h2>
      <p>Sélectionnez un exercice pour commencer :</p>
      
      <div className="exercises-grid">
        {exercises.map((exercise) => (
          <Link 
            key={exercise.id} 
            to={`/exercice${exercise.id}`} 
            className="exercise-card"
          >
            <h3>{exercise.title}</h3>
            <p>{exercise.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;