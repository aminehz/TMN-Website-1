import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Breadcrumb, BreadcrumbItem, Badge } from "shards-react";
import { Link } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

const EventsManagement = () => {

  const [events, setEvents] = useState([])

    const fetchData = () => {
      fetch("http://localhost:3000/api/event/allEvents")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setEvents(data)
        })
    }
  
    useEffect(() => {
      fetchData()
    }, [])
  
    return (

  <Container fluid className="main-content-container px-4">

    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Events list" subtitle="Events Management" className="text-sm-left" />
    </Row>
    
    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>Events Management</BreadcrumbItem>
    </Breadcrumb>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">Events list</h6>
            <Link to="/new-event">
              <Button outline theme="primary" className="mb-2 mr-1" style={{float: "right"}}>
                Add Event
              </Button>
            </Link>
          </CardHeader>
          <CardBody className="bg-dark p-0 pb-3">
            <table className="table table-dark mb-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="border-0">
                    Title
                  </th>
                  <th scope="col" className="border-0">
                    Date
                  </th>
                  <th scope="col" className="border-0">
                    Hour
                  </th>
                  <th scope="col" className="border-0">
                    Location
                  </th>
                  <th scope="col" className="border-0">
                    Posted by
                  </th>
                  <th scope="col" className="border-0">
                    Status
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {events &&
                events.map((event, _id) =>(
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.hour}</td>
                  <td>{event.location}</td>
                  <td>{event.eventPoster}</td>
                  <td>
                  <Badge theme={(() => {
                        switch (event.status) {
                          case "aproved":   return "success";
                          case "rejected":  return "danger";
                          default :         return "warning";
                        }
                    })()}>{event.status}
                  </Badge>
                  </td>
                  <td>
                    <Link to={`/event-details/${event._id}`}>
                        <Button outline size="sm" theme="info" className="mb-2 mr-1">
                        Info
                        </Button>
                    </Link>
                  </td>
                </tr>
                ))}    
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    
  </Container>
    );
  }

  export default EventsManagement;