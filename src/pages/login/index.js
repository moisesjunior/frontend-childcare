import React from "react";
import { withRouter } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import api from "../../services/api";
import { login } from "../../services/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const handleSignIn = async e => {
    e.preventDefault();
    const { usr_email, usr_password } = this.state;
    if (!usr_email || !usr_password) {
        this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
        
        try {
            const response = await api.post("/login", { usr_email, usr_password });
            login(response.data.token);
            this.props.history.push("/app");
        } catch (err) {
            this.setState({
            error:
                err.response.data.mensagem
            });
        }
    }
};
function Login() {
    return (
        <div>
            <Container>
                <Row>
                    <Figure className="center">
                        <Figure.Image
                            src="../../assets/logo.png" width="200px" height="150px" alt=""
                        />
                    </Figure>
                </Row>
            </Container>
            <Container className="center">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>E-mail address</Form.Label>
                            <Form.Control className="col-md-5" type="email" placeholder="Enter e-mail address" required/>
                        </Form.Group>
                    </Form.Row>
                    <Row>   
                        <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="col-md-5" type="password" placeholder="Password" required/>
                        </Form.Group>
                    </Row>    
                    <Row>
                        <Button className="col-md-5 btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">
                            Sign in
                        </Button>
                    </Row>
                    <Row>
                        <Alert.Link className="small" href="/">Forgot password?</Alert.Link>
                    </Row>
                </Form>
            </Container>
        </div>
    )
};
export default withRouter(Login);