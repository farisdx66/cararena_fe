import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import {
  Button,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Table,
  Grid,
  Header,
  Image
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import '../table.css'
import SidebarExampleVisible from '../../Layout/SidebarExampleVisible'

export default class brandTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
    }
  }

  componentDidMount() {
    const API_URL = fetch('http://localhost:4000/api/brand/')

    API_URL.then((res) => {
      if (res.status === 200) return res.json()
    }).then((resJson) => {
      this.setState({
        content: resJson,
      })
    })
  }

  deleteBrand(id) {
    if (window.confirm('Hapus neh?')) {
      fetch('http://localhost:4000/api/brand/' + id, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    }
  }

  render() {
    return (
      <div>
        <Sidebar.Pushable className="top-section pusher" as={Segment}>
        

          <Sidebar.Pusher>
            <div className='four-hundred-width'>
            <Header as='h2'>
              Brand Data
              <Header.Subheader>
              
              </Header.Subheader>
            </Header>
          <SidebarExampleVisible/>
              <Table celled compact definition>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='4'>
                      <Link to={'/brandForm/'}>
                        <Button
                          floated='left'
                          icon
                          labelPosition='right'
                          positive
                        >
                          <Icon name='pencil alternate' />
                          Add Data
                        </Button>
                      </Link>
                    </Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Brand Mobil</Table.HeaderCell>
                    <Table.HeaderCell>Logo Url</Table.HeaderCell>
                    <Table.HeaderCell>Log Activity</Table.HeaderCell>
                    
                    <Table.HeaderCell>Created At</Table.HeaderCell>
                    
                    <Table.HeaderCell textAlign='center'>
                      Action
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.content.length > 0 ? (
                    this.state.content.map((data) => (
                      <tr key={data.id}>
                        <Table.Cell>{data.id}</Table.Cell>
                        <Table.Cell>{data.carBrand}</Table.Cell>
                        <Table.Cell>
                        <Image src={data.logoUrl}></Image>
                        </Table.Cell>
                        <Table.Cell>{data.logActivity}</Table.Cell>
                        <Table.Cell>{data.createdAt}</Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Button
                            className='button-size'
                            color='red'
                            attached='left'
                            onClick={() => this.deleteBrand(data.id)}
                          >
                            Delete
                          </Button>
                          <Link to={'/put/' + data.id}>
                            <Button
                              className='button-size'
                              color='blue'
                              Button
                              attached='right'
                              onClick={data.id}
                            >
                              Edit
                            </Button>
                          </Link>
                        </Table.Cell>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No users</td>
                    </tr>
                  )}
                </Table.Body>
              </Table>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
