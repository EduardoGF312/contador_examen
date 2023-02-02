import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from 'uuid';

const Cartas = () => {

    const initialState = {
        'id': '',
        'nombre': '',
        'direccion': '',
        'telefono': ''
    }

    const btnActual = useRef(null); //Para que no tenga nada


    const [datos, setDatos] = useState(initialState);
    const { nombre, direccion, telefono, id } = datos; //Decostruccion de datos
    const [informacion, setInformacion] = useState([]); //Informacion es un array
    const [isActive, setIsActive ] = useState(false);

    // useEffect(() => {
    //     btnActual.current.disabled = true;
    // }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const initialState2 = {
            'id': uuidv4(),
            'nombre': datos.nombre,
            'direccion': datos.direccion,
            'telefono': datos.telefono
        }
        let inf = informacion;
        inf.push(initialState2);
        setInformacion(inf);
        setDatos(initialState);
    }

    const handleChange = (e) => {
        setDatos({
            ...datos, [e.target.name]: e.target.value
        });
        console.log(datos);
    }

    const handleModificar = (e) => {
        const id = e.target.name.slice(1);
        setIsActive(true);

        for(const info of informacion){
            if(info.id === id) setDatos(info);
        }
    }

    const handleActualizar = (e) => {
        const id = datos.id
        let inf = informacion
        const index = inf.findIndex(i => i.id == id)
        const modifiedState = {
            'id': datos.id,
            'nombre': datos.nombre,
            'direccion': datos.direccion,
            'telefono': datos.telefono
        }
        inf[index] = modifiedState
        setInformacion(inf)
        setDatos(initialState)

        setIsActive(false)
    }
    
    const handleEliminar = (e) => {
        let nombre = e.target.name;
        nombre = nombre.slice(1);
        let inf = [];
        
        for(let i=0; i<informacion.length; i++){
            if(informacion[i].id !== nombre) {
                inf.push(informacion[i]);
            }
        }
        setInformacion(inf);
    }

    return (
        <Container>
            <Row className="row-cols-3">
                {
                    informacion.map(inf => (
                        <Col key={inf.id} className="mt-3">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{inf.nombre}</Card.Title>
                                    <Card.Text>id: {inf.id}</Card.Text>
                                    <Card.Text>Dirección: {inf.direccion}</Card.Text>
                                    <Card.Text>Telefono: {inf.telefono}</Card.Text>
                                    <Button name= { 'e' + inf.id } variant="danger" className="me-2" onClick={ handleEliminar }>Eliminar</Button>
                                    <Button name= { 'm' + inf.id } variant="info" className="ms-2" onClick={ handleModificar }>Modificación</Button>
                                </Card.Body>
                            </Card>
                        </Col>))
                }
            </Row>


            <Row>
                <Col></Col>
                <Col className="mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre: </Form.Label>
                            <Form.Control type="text" name="nombre" placeholder="Ingresa tu nombre" value={nombre} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="direccion">
                            <Form.Label>Dirección: </Form.Label>
                            <Form.Control type="text" name="direccion" placeholder="Ingresa tu dirección" value={direccion} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="telefono">
                            <Form.Label>Teléfono: </Form.Label>
                            <Form.Control type="text" name="telefono" placeholder="Ingresa tu telefono" value={telefono} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" name="btnAgregar" className="me-2">
                            Agregar
                        </Button>
                        <Button variant="primary" name={id} className={isActive ? 'ms-3 mb-5 mt-5' : 'display-none'} onClick={handleActualizar}>Actualizar</Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container >
    );
}

export default Cartas;