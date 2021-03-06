import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router'

import { Button, Checkbox, Form, Sidebar, Segment, Header } from 'semantic-ui-react'
import SidebarExampleVisible from '../../Layout/SidebarExampleVisible'

export default class editGeneral extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      type: this.props.carBrand,
      hargaOtr: this.props.hargaOtr,
      logActivity: this.props.logActivity,
      brandId: this.props.logoUrl,

    }
  }

  componentDidMount(props) {
    var pathArray = window.location.pathname.split('/')[2]
    console.log(pathArray)
    const API_URL = fetch('http://localhost:4000/api/general/' + pathArray)

    API_URL.then((res) => {
      if (res.status === 200) return res.json()
    }).then((resJson) => {
      this.setState({
        id: resJson.id,
        type: resJson.type,
        hargaOtr: resJson.hargaOtr,
        logActivity: resJson.logActivity,
        brandId: resJson.brandId
      })
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    var pathArray = window.location.pathname.split('/')[2]
    event.preventDefault()
    const url = 'http://localhost:4000/api/general/' + pathArray

    const data = {
      id: this.state.id,
        type: this.state.type,
        hargaOtr: this.state.hargaOtr,
        logActivity: this.state.logActivity,
        brandId: this.state.brandId
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

  render(){
    return (
      <Sidebar.Pushable className="top-section pusher" as={Segment}>
      <SidebarExampleVisible/>
      <Sidebar.Pusher className='four-hundred-width'>
          <div className='col-md-12'>
              <Form onSubmit={this.handleSubmit}>
                <Form>
                  <label>Id</label>
                  <input
                    placeholder='Id'
                    value={this.state.id}
                    disabled
                    name='id'
                  />
                </Form>
                <Form>
                  <label>Log Activity</label>
                  <input
                  defaultValue="fall"
                  placeholder='Log Activity'
                  onChange={this.handleChange}
                  name='logActivity'
                  />
                </Form>
                <Form>
                  <label>Tipe Mobil</label>
                  <input
                    placeholder='Tipe Mobil'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.type}
                    name='type'
                  />
                </Form>
                <Form>
                  <label>Harga OTR</label>
                  <input
                    placeholder='Harga OTR'
                    onChange={this.handleChange}
                    name='hargaOtr'
                    type='text'
                    value={this.state.hargaOtr}
                  />
                </Form>
                <Form>
                  <label>BrandId</label>
                  <input
                    placeholder='brandId'
                    onChange={this.handleChange}
                    name='brandId'
                    type='text'
                    value={this.state.brandId}
                  />
                </Form>

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
