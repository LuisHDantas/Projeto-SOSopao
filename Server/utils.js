// Transforma DATEONLY em DD/MM/YYYY
function parseDateFromDB(dateString) {
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
        throw new Error('Formato de data inválido. Esperado YYYY-MM-DD.');
    }

    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}/${month}/${year}`;
}