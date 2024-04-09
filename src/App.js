import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container,Row,Col,Card} from 'react-bootstrap'
import CategoryCard from './components/ActionOption';
import MaterialesForm from './components/MaterialesForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 className="text-center">ADMINISTRACIÓN DE OBRA</h3>
      </header>
      <Container fluid style={{
          height: "100vh", 
          margin:0, 
          padding: 0}}>
        <Row fluid className="h-100" style={{
          margin:0
        }}>
          <Col xs={12} md={3} style={{height: "100%",backgroundColor: '#EAEAEA' }}>
            <CategoryCard titulo="PEDIDOS"/>
            <CategoryCard titulo="GASTOS"/>
            <CategoryCard titulo="INGRESOS"/>
          </Col>
          <Col xs={12} md={9} style={{height: "100%",  padding:"20px", paddingTop:"5%", backgroundColor: '#FAFAFA' }}>
            <MaterialesForm/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
