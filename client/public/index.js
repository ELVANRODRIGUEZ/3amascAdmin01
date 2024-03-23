fetch('/api/obras')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const obraSelector = document.getElementById('obraSelector');
    data.forEach(obra => {
        console.log(obra);
        const option = document.createElement('option');
        option.text = obra.obra; // Assuming "obra" is the column name in your database
        option.value = obra.id; // Assuming "id" is the column name in your database
        obraSelector.appendChild(option);
    });
})
.catch(error => {
    console.error('Error fetching obras: ', error);
});
