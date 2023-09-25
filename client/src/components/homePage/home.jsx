import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from "../index";
import { applyFilter, getDriversName ,getTeams ,getDrivers ,orderCards } from "../../Redux/actions";
import style from "./Home.module.css";

function HomePage() {
  const dispatch = useDispatch();
  

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
  
  
  const handleFilterapply = () => {
    handleFilterChange();
    handleOrderChange();
    handlePageChange(1);
  };

  useEffect(() => {
    handleFilterapply();
  }, [ ]);
  
  



  return (
    <div className={style.containerBox} >


      <div className={`${style.filter} ${menuVisible ? style.visible : ''}`}>

        <div className={style.filteTipe}>

            <label htmlFor="nameSearch">Name:</label>
            <input className={style.nameInput} type='text' id="nameSearch" value={nameSearch}  onChange={(event) => handleChange(event, 'nameSearch')}/>
          
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
            
            <label htmlFor="idFilterSelector">ID:</label>

            <select id="idFilterSelector" value={selectedIdFilter} onChange={(event) => handleChange(event, 'idFilterSelector')}>
              <option value="All">Todos</option>
              <option value="API">API</option>
              <option value="DB">DB</option>
            </select>

        </div>

        <div className={style.filterOrder}>
          <div className={style.Order}>
            <p>Order type:</p>
            <>       
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
            </> 
          </div>
          <div className={style.Order}>
            <p>Sense of Order:</p>
            <>
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
            </>
          </div>  
        </div>

      <button className={style.applyFilter} onClick={handleFilterapply}>Aplicar Filtros</button>
      </div>
          
      <div className={style.box1} onClick={() => menuVisible && setMenuVisible(false)}>
      

        <div className={style.pagBox}>
          <div className={style.menuButton} onClick={toggleMenu}>
            {/* Botón para mostrar/ocultar el menú */}
            <button>Filters</button>
          </div>
          <div className={style.pag}>
            <button className={style.pageButtonFirst} onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              {"<<"}
            </button>
            <button className={style.pageButtonTenMinus} onClick={() => handlePageChange(currentPage - 10)} disabled={currentPage - 10 < 1}>
              {currentPage - 10}
            </button>
            <button className={style.pageButtonFiveMinus} onClick={() => handlePageChange(currentPage - 5)} disabled={currentPage - 5 < 1}>
              {currentPage - 5}
            </button>
            <button className={style.pageButtonOneMinus} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              {currentPage - 1}
            </button>
            <button className={style.pageButtonCurrent} onClick={() => handlePageChange(currentPage)}>
              {currentPage}
            </button>
            <button className={style.pageButtonOnePlus} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage - 1 == totalPages -1}>
              {currentPage + 1}
            </button>
            <button className={style.pageButtonFivePlus} onClick={() => handlePageChange(currentPage + 5)} disabled={currentPage + 5 > totalPages}>
              {currentPage + 5}
            </button>
            <button className={style.pageButtonTenPlus} onClick={() => handlePageChange(currentPage + 10)} disabled={currentPage + 10 > totalPages}>
              {currentPage + 10}
            </button>
            <button className={style.pageButtonLast} onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              {">>"}
            </button>
          </div>
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


