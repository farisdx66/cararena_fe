import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap'
export default class editSpecification extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      kapasistasMesin: this.props.kapasistasMesin,
      jmlSilinder: this.props.jmlSilinder,
    }
  }

  componentDidMount(props) {
    var pathArray = window.location.pathname.split('/')[2]
    console.log(pathArray)
    const API_URL = fetch('http://localhost:4000/api/specification/' + pathArray)

    API_URL.then((res) => {
      if (res.status === 200) return res.json()
    }).then((resJson) => {
      this.setState({
        id: resJson.id,
        kapasistasMesin: resJson.kapasistasMesin,
        jmlSilinder: resJson.jmlSilinder,
      })
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    var pathArray = window.location.pathname.split('/')[2]
    event.preventDefault()
    const url = 'http://localhost:4000/api/specification/' + pathArray

    const data = {
      id: this.state.id,
      kapasistasMesin: this.state.kapasistasMesin,
      jmlSilinder: this.state.jmlSilinder,
    }
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => console.log('Success:', response))
  }
  render() {
    return (
      <Container fluid>

        <Row>
          <div className='col-md-12'>
            <Col md={{ span: 7, offset: 3 }}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Id</Form.Label>
                  <Form.Control
                    placeholder='Id'
                    value={this.state.id}
                    disabled
                    name='id'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Brand Mobil</Form.Label>
                  <Form.Control
                    placeholder='kapasistasMesin'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.kapasistasMesin}
                    name='kapasistasMesin'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>jmlSilinder</Form.Label>
                  <Form.Control
                    placeholder='jmlSilinder'
                    onChange={this.handleChange}
                    name='logoUrl'
                    type='text'
                    value={this.state.jmlSilinder}
                  />
                </Form.Group>
                <Button variant='primary' value='Add' type='submit'>
                  Update
                </Button>
              </Form>
            </Col>
          </div>
        </Row>
      </Container>
    )
  }
}
