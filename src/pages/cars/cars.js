import React, { Component } from 'react'
import './size.css'

import {
  Button,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Table,
  Grid,
  Card,
  Image,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import SidebarExampleVisible from '../../components/Layout/SidebarExampleVisible'

export default class cars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
    }
  }

  componentDidMount() {
    const API_URL = fetch('http://139.162.28.184:4000/api/brand/cars')

    API_URL.then((res) => {
      if (res.status === 200) return res.json()
    }).then((resJson) => {
      this.setState({
        content: resJson,
      })
      console.log(this.state.content.length)
    })
  }
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <SidebarExampleVisible />

        <Sidebar.Pusher>
          <Segment basic>
            <div className='four-hundred-width'>
              <Card.Group itemsPerRow={3}>
                {this.state.content.length > 0 ? (
                  this.state.content.map((data) => (
                    <Card>
                      <Image src={data.img1} wrapped ui={false} />

                      <Card.Content>
                        <Card.Header>{data.type}</Card.Header>
                        <Card.Meta>{data.harga_otr}</Card.Meta>
                      </Card.Content>
                      <Button variant='primary'>Details</Button>
                    </Card>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No users</td>
                  </tr>
                )}
              </Card.Group>
            </div>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}
