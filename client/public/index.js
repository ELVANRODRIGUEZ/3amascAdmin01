fetch('/api/obras')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    // console.log(data);
    const obraSelector = $('#obraSelector');
    data.forEach(obra => {
        console.log(obra);
        const optionObra = $('<option>');

        // This syntax is used when using DOM elements assigned to variables using JQuery,
        // otherwise we would have used: optionObra.text = obra.obra;
        optionObra.text(obra.obra); // Assuming "obra" is the column name in the database
        optionObra.val(obra.id); // Assuming "id" is the column name in the database
        $('#obraSelector').append(optionObra);
    });
})
.catch(error => {
    console.error('Error fetching obras: ', error);
});

// **************************************** ADD EVENT LISTENERS TO DOM OBJECTS

$('#obraSelector').change(event => {
    const selectedId = event.target.value; // Get the selected obra ID from the event
    const idToSearch = 5; // Your updated name (you can get this dynamically if needed)
    const obraToChange = 'OBRA NUEVA_01'; // Your updated description (you can get this dynamically if needed)

    // Prepare the PUT request data
    const putData = {
        id: idToSearch,
        obra: obraToChange
    };

    // Make the PUT request using fetch API
    fetch(`/api/obras/${idToSearch}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(putData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Obra updated successfully:', data);
        // You can perform further actions here after successful update
    })
    .catch(error => {
        console.error('Error updating obra: ', error);
    });
});


// ****************************************

fetch('/api/materiales')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    // console.log(data);
    const unidadSelector = document.getElementById('materialSelector');
    data.forEach(material => {
        // console.log(material);
        const optionMaterial = document.createElement('option');
        optionMaterial.text = material.material; // Assuming "unidad" is the column name in your database
        optionMaterial.value = material.id; // Assuming "id" is the column name in your database
        materialSelector.appendChild(optionMaterial);
    });
})
.catch(error => {
    console.error('Error fetching materiales: ', error);
});

fetch('/api/unidades')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    // console.log(data);
    const unidadSelector = document.getElementById('unidadSelector');
    data.forEach(unidad => {
        // console.log(unidad);
        const optionUnidad = document.createElement('option');
        optionUnidad.text = unidad.unidad; // Assuming "unidad" is the column name in your database
        optionUnidad.value = unidad.id; // Assuming "id" is the column name in your database
        unidadSelector.appendChild(optionUnidad);
    });
})
.catch(error => {
    console.error('Error fetching unidades: ', error);
});


