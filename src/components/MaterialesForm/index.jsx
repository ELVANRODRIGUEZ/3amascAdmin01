// ================================== Packages Dependencies
import React from "react";
import { useState, useEffect } from "react";
import {Card, Row, Col, Form, Button} from 'react-bootstrap'

const MaterialesForm = function(props) {
    const [obras, setObras] = useState([]); // State to store fetched data
    const [materiales, setMateriales] = useState([]); // State to store fetched data
    const [unidades, setUnidades] = useState([]); // State to store fetched data

    const host = process.env.HEROKU_HOSTNAME || "http://localhost:3300";
    console.log('here')
    useEffect(() => {
        fetch(`/api/obras`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setObras(data); // Update state with fetched data
            })
            .catch(error => {
                console.error('Error fetching obras: ', error);
            })
        fetch(`/api/materiales`)
            .then(response => {
                // console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMateriales(data); // Update state with fetched data
            })
            .catch(error => {
                console.error('Error fetching materiales: ', error);
            })
        fetch(`/api/unidades`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUnidades(data); // Update state with fetched data
            })
            .catch(error => {
                console.error('Error fetching unidades: ', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: "85%" }}>
                <Form.Select aria-label="Default select example" style={{ width: "55%" }}>
                    <option>Obra</option>
                    {obras.map(obra => (
                        <option key={obra.id} value={obra.id}>{obra.obra}</option>
                    ))}
                </Form.Select>
                <Form.Select aria-label="Default select example" style={{ width: "85%" }}>
                    <option>Material</option>
                    {materiales.map(material => (
                        <option key={material.id} value={material.id}>{material.material}</option>
                    ))}
                </Form.Select>
                <Form.Select aria-label="Default select example" style={{ width: "25%" }}>
                    <option>Unidad</option>
                    {unidades.map(unidad => (
                        <option key={unidad.id} value={unidad.id}>{unidad.unidad}</option>
                    ))}
                </Form.Select>
                <Form.Control as="textarea" rows={2} placeholder="Especificaciones" style={{ width: "85%" }} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Ingresar
            </Button>
        </Form>

    );
};

export default MaterialesForm;
