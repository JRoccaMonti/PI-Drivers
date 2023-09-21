// validations.js

function validateField(name, value) {
    let errorMessage = '';
    const textRegex = /^[A-Za-z\s]+$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  
    switch (name) {
        case 'name':
            if (!textRegex.test(value)) {
            errorMessage = 'El nombre solo debe contener letras.';
            }
        break;
        case 'lastname':
            if (!textRegex.test(value)) {
            errorMessage = 'El apellido solo debe contener letras.';
            }
        break;
        case 'nationality':
            if (value === '' || value === 'Not select') {
            errorMessage = 'Debes seleccionar una nacionalidad válida.';
            }
        break;
        case 'birthdate':
            if (!dateRegex.test(value)) {
               errorMessage = 'Debes seleccionar una fecha válida.'; 
            }            
            const birthdate = new Date(value);
            const currentDate = new Date();
            const ageDifferenceInMilliseconds = currentDate - birthdate;
            const ageInYears = Math.floor(ageDifferenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));

            if (ageInYears < 18) {
                errorMessage = 'Debes ser mayor de 18 años para registrarte.';
            }
        break;
        case 'description':
            if (value.length === 0 ) {
                errorMessage = 'La descripcion no puede estar vacia';
            };
            if (value.length > 255 ) {
                errorMessage = 'La descripcion no puede superar los 255 caracteres';
            };
        break;
        case 'teamId':
            if (value.length === 0) {
                errorMessage = 'Debes seleccionar al menos un equipo.';
            }
        break;
        
      default:
        break;
    }
  
    return errorMessage;
};
export default validateField;
