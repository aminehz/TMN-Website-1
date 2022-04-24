import React, {useEffect, useState} from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, CardBody, Card, CardFooter, Button } from "shards-react";
import { Link, useHistory, useParams } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

const EventDetails = () => {

  let {id}=useParams()
  
  const history = useHistory();
  
  const [data, setData] = useState('')

    const fetchData = () => {
      fetch(`http://localhost:3000/api/event/allEvents/${id}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setData(data)
        })
    }
  
    useEffect(() => {
      fetchData()  
    }, [])

    const handleDelete= (id) => {
      fetch(`http://localhost:3000/api/event/deleteEvents/${id}` , {
          method: 'DELETE'
      }).then(() => {
          console.log("deleted");
          history.go(-1);
      })
    }

  return(
  
  <Container fluid className="main-content-container px-4">

    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Event details" subtitle="Events Management" className="text-sm-left" />
    </Row>
    
    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/Events-management">Events Management</Link>
    </BreadcrumbItem>
    { data && (
    <BreadcrumbItem active>{data.title}</BreadcrumbItem>
    )}
    </Breadcrumb>

    {/* Default Dark Table */}
    <Row>
      <Col>
      <Row>
          { data && (
            <Col lg="12" key={data._id}>
              <Card small className="card-post mb-4">
                <CardBody>
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text text-muted">{data.details}</p>
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="card-post__author d-flex">
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                      <div className="text-fiord-blue">Posted by</div>
                        {data.eventPoster}
                      </span>
                      <small className="text-muted">{data.date}</small>
                    </div>
                  </div>
                  <div className="my-auto ml-auto">
                    <Button pill size="sm" theme="danger" className="mb-2 mr-1" onClick={ () => handleDelete(data._id)} >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  </Container>
  )
          
}

export default EventDetails;