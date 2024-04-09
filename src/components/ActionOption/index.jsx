// ================================== Packages Dependencies
import React from "react";
import {Card, Row, Col} from 'react-bootstrap'

const CategoryCard = function(props) {
  return (
    <Row className="justify-content-center" style={{
        height:"15%", 
        margin:0, 
        padding: "10px"}} >
        <Col xs={8}>
            <Card style={{ 
                top:"50%",
                transform: "translateY(-50%)", 
                backgroundColor: 'red' }}>
            <Card.Body>
                <Card.Title>{props.titulo}</Card.Title>
            </Card.Body>
            </Card>
        </Col>
    </Row>
    
  );
};

export default CategoryCard;
