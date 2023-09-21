import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from "../index";
import { applyFilter, getDriversName ,getDrivers ,orderCards } from "../../Redux/actions";
import style from "./Home.module.css";

function HomePage() {

  //inicializando
  const [menuVisible, setMenuVisible] = useState(false);
  const teamOptions = useSelector(state => state.teams);
  const nationalityOptions = useSelector(state => state.nationalitys);  
  const filteredDrivers = useSelector(state => state.filteredDrivers);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Cambia el estado para mostrar u ocultar el menú
  };
  
  
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
  const dispatch = useDispatch();

  const [selectedTeams, setSelectedTeams] = useState('All');
  const [selectedNationality, setSelectedNationality] = useState('All');
  const [nameSearch, setNameSearch] = useState('');
  const [selectedIdFilter, setSelectedIdFilter] = useState('All');
  const [selectedTipoOrder, setSelectedTipoOrder] = useState('alfabetico');
  const [selectedSentidoOrder, setSelectedSentidoOrder] = useState('A');
  
  const handleOrderChange = (tipo, sentido) => {
    if (tipo == undefined || sentido == undefined) {
      tipo = 'alfabetico' ;
      sentido = 'A';
    }
    setSelectedTipoOrder(tipo);
    setSelectedSentidoOrder(sentido);    
    dispatch(orderCards(tipo, sentido));
  };

  const handleFilterChange = () => {
    dispatch(applyFilter(selectedTeams, selectedNationality, selectedIdFilter));
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    const selectorId = event.target.id; 
  
    switch (selectorId) {
      case 'teamsSelector':
        setSelectedTeams(newValue);
        break;
      case 'nationalitySelector':
        setSelectedNationality(newValue);
        break;
      case 'nameSearch':
        if (newValue.trim() === '') {
          dispatch(getDrivers());
          setNameSearch(newValue);
        } else {
          dispatch(getDriversName(newValue));
          setNameSearch(newValue);
        }
        break;
      case 'idFilterSelector':
        setSelectedIdFilter(newValue);
        break;
        
      
      default:
        break;
    } 
  };  
  
  useEffect(() => {    
    handleFilterChange();
    handleOrderChange();
    handlePageChange(1);
  }, [selectedNationality, selectedTeams , nameSearch ,  selectedIdFilter]);

  useEffect(() => {    
    handleFilterChange();
    handleOrderChange();
    handlePageChange(1);
  }, []);

  
  



  return (
    <div className={style.containerBox} >


      <div className={`${style.filter} ${menuVisible ? style.visible : ''}`}>

        <div className={style.filterOrder}>

          <label htmlFor="tipoOrderSelector">Tipo de Orden:</label>          
          <label>
            <input type="radio" name="tipoOrden" value="alfabetico" checked={selectedTipoOrder === "alfabetico"} onChange={(event) => {
                const newValue = event.target.value;
                setSelectedTipoOrder(newValue);
                handleOrderChange(newValue, selectedSentidoOrder);
              }}/>
            Alfabético
          </label>
          <label>
            <input type="radio" name="tipoOrden" value="nacimiento" checked={selectedTipoOrder === "nacimiento"} onChange={(event) => {
                const newValue = event.target.value;
                setSelectedTipoOrder(newValue);
                handleOrderChange(newValue, selectedSentidoOrder);
              }}/>
            Nacimiento
          </label>     

          <label htmlFor="sentidoOrderSelector">Sentido de Orden:</label>          
          <label>
            <input type="radio" name="sentidoOrden" value="A" checked={selectedSentidoOrder === "A"} onChange={(event) => {
                const newValue = event.target.value;
                setSelectedSentidoOrder(newValue);
                handleOrderChange(selectedTipoOrder, newValue);
              }}/>
            Ascendente
          </label>
          <label>
            <input type="radio" name="sentidoOrden" value="D" checked={selectedSentidoOrder === "D"} onChange={(event) => {
                const newValue = event.target.value;
                setSelectedSentidoOrder(newValue);
                handleOrderChange(selectedTipoOrder, newValue);
              }}/>
            Descendente
          </label>

        </div>


        <div className={style.filteTipe}>
          
            <label htmlFor="teamsSelector">Equipo:</label>
            <select id="teamsSelector" value={selectedTeams} onChange={(event) => handleChange(event, 'teamsSelector')}>
              <option value="All">Todos</option>
              {teamOptions.map((option) => (
                <option key={option.value} value={option.text}>
                    {option.text}
                </option>
              ))}
              <option value="Not Found">Not Found</option>
            </select>

            <label htmlFor="nationalitySelector">Nacionalidad:</label>
            <select id="nationalitySelector" value={selectedNationality} onChange={(event) => handleChange(event, 'nationalitySelector')}>
              <option value="All">Todos</option>
              {nationalityOptions.map((option) => (
                <option key={option.value} value={option.text}>
                    {option.text}
                </option>
              ))}
              
            </select>
            
            <input type='text' id="nameSearch" value={nameSearch}  onChange={(event) => handleChange(event, 'nameSearch')}/>
            
            <label htmlFor="idFilterSelector">ID:</label>

            <select id="idFilterSelector" value={selectedIdFilter} onChange={(event) => handleChange(event, 'idFilterSelector')}>
              <option value="All">Todos</option>
              <option value="API">API</option>
              <option value="DB">DB</option>
            </select>

        </div>
      </div>

      <div className={style.box1} onClick={() => menuVisible && setMenuVisible(false)}>
      

        <div className={style.pag}>
          <div className={style.menuButton} onClick={toggleMenu}>
            {/* Botón para mostrar/ocultar el menú */}
            <button>Mostrar Filtros</button>
          </div>

          <button  onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            {"<<"}
          </button>
          <button className={style.pageButtonTen} onClick={() => handlePageChange(currentPage - 10)} disabled={currentPage - 10 < 1}>
            {currentPage - 10}
          </button>
          <button className={style.pageButtonFive} onClick={() => handlePageChange(currentPage - 5)} disabled={currentPage - 5 < 1}>
            {currentPage - 5}
          </button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {currentPage - 1}
          </button>
          <button onClick={() => handlePageChange(currentPage)}>
            {currentPage}
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage - 1 === totalPages}>
            {currentPage + 1}
          </button>
          <button className={style.pageButtonFive} onClick={() => handlePageChange(currentPage + 5)} disabled={currentPage + 5 > totalPages}>
            {currentPage + 5}
          </button>
          <button className={style.pageButtonTen} onClick={() => handlePageChange(currentPage + 10)} disabled={currentPage + 10 > totalPages}>
            {currentPage + 10}
          </button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
            {">>"}
          </button>
        </div>

        <div className={style.card_box}>
          {driversToShow.map((driver) => (
            <div className={style.card_littlebox} key={driver.id}>
              <Card driver={driver}/>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default HomePage;


