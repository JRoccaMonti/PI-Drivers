import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from "../index";
import { applyFilter  } from "../../Redux/actions";

function HomePage() {

  //inicializando
  
  const drivers = useSelector(state => state.drivers);
  
  const teamOptions = useSelector(state => state.teams);
  const nationalityOptions = useSelector(state => state.nationalitys);
  
  const filteredDrivers = useSelector(state => state.filteredDrivers);
  
  //paginado

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const driversToShow = filteredDrivers.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // filtros

  const [selectedTeams, setSelectedTeams] = useState('All');
  const [selectedNationality, setSelectedNationality] = useState('All');

  const dispatch = useDispatch();

  const handleFilterChange = () => {
    console.log(filteredDrivers);
    dispatch(applyFilter(selectedTeams, selectedNationality));
  };




  return (
    <div className="landing-page">
      <p>Esta es una home page de ejemplo.</p>

      <div>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          Primera
        </button>
        <button onClick={() => handlePageChange(currentPage - 10)} disabled={currentPage - 10 < 1}>
          {currentPage - 10}
        </button>
        <button onClick={() => handlePageChange(currentPage - 5)} disabled={currentPage - 5 < 1}>
          {currentPage - 5}
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          {currentPage - 1}
        </button>
        <button onClick={() => handlePageChange(currentPage)}>
          {currentPage}
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          {currentPage + 1}
        </button>
        <button onClick={() => handlePageChange(currentPage + 5)} disabled={currentPage + 5 > totalPages}>
          {currentPage + 5}
        </button>
        <button onClick={() => handlePageChange(currentPage + 10)} disabled={currentPage + 10 > totalPages}>
          {currentPage + 10}
        </button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
          Última
        </button>
      </div>

      <div>
        <div>
          <label htmlFor="teamsSelector">Seleccionar Equipo:</label>
          <select id="teamsSelector" value={selectedTeams} onChange={(event) => setSelectedTeams(event.target.value)}>
            <option value="All">Todos</option>
            {teamOptions.map((option) => (
              <option key={option.value} value={option.text}>
                  {option.text}
              </option>
            ))}

          </select>

          <label htmlFor="nationalitySelector">Seleccionar Nacionalidad:</label>

          <select id="nationalitySelector" value={selectedNationality} onChange={(event) => setSelectedNationality(event.target.value)}>
            <option value="All">Todos</option>
            {nationalityOptions.map((option) => (
              <option key={option.value} value={option.text}>
                  {option.text}
              </option>
            ))}
            
          </select>

          <button onClick={handleFilterChange}>Aplicar Filtro</button>
        </div>
      </div>

      <div>
        {driversToShow.map((driver) => (
          <div key={driver.id}>
            <Card driver={driver}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
