fetch('/api/obras')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    // console.log(data);
    const obraSelector = document.getElementById('obraSelector');
    data.forEach(obra => {
        console.log(obra);
        const optionObra = document.createElement('option');
        optionObra.text = obra.obra; // Assuming "obra" is the column name in your database
        optionObra.value = obra.id; // Assuming "id" is the column name in your database
        obraSelector.appendChild(optionObra);
    });
})
.catch(error => {
    console.error('Error fetching obras: ', error);
});

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
        console.log(material);
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
        console.log(unidad);
        const optionUnidad = document.createElement('option');
        optionUnidad.text = unidad.unidad; // Assuming "unidad" is the column name in your database
        optionUnidad.value = unidad.id; // Assuming "id" is the column name in your database
        unidadSelector.appendChild(optionUnidad);
    });
})
.catch(error => {
    console.error('Error fetching unidades: ', error);
});


