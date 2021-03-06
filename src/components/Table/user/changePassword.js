import React, { Component } from 'react'

import {
  Button,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Table,
  Grid,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import '../table.css'
import SidebarExampleVisible from '../../Layout/SidebarExampleVisible'
import { Link } from 'react-router-dom'
import { Col, Container, Form, Row } from 'react-bootstrap'

export default class changePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      username: this.props.carBrand,
      email: this.props.logoUrl,
      password: this.props.password
    }
  }

  componentDidMount(props) {
    var pathArray = window.location.pathname.split('/')[2]
    const API_URL = fetch('http://139.162.28.184:4000/api/auth/user/'+pathArray)

    API_URL.then((res) => {
      if (res.status === 200) return res.json()
    }).then((resJson) => {
      this.setState({
        id: resJson.id,
        username: resJson.username,
        email: resJson.email,
        password : resJson.password,
      })
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    var pathArray = window.location.pathname.split('/')[2]
    event.preventDefault()
    const url = 'http://139.162.28.184:4000/api/auth/update/' + pathArray

    const data = {
      id: this.state.id,
      username: this.state.username,
      password: this.state.password,
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
     
      <Sidebar.Pushable className="top-section pusher" as={Segment}>
      <SidebarExampleVisible/>

      <Sidebar.Pusher className='four-hundred-width'>
      <div className='col-md-12'>
          
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
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.username}
                    name='username'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>passowrd</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    name='password'
                    type='text'
                    value={this.state.password}
                  />
                </Form.Group>
                <Button variant='primary' value='Add' type='submit'>
                  Update
                </Button>
              </Form>
              </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      
    )
  }

}
