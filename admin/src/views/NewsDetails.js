import React, {useEffect, useState} from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, CardBody, Card, CardFooter, Button } from "shards-react";
import { Link, useHistory, useParams } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import ReactHtmlParser from 'react-html-parser';

const NewsDetails = () => {

  let {id}=useParams()
  const history = useHistory();
  
  const [data, setData] = useState('')

    const fetchData = () => {
      fetch(`http://localhost:3000/api/news/oneNews/${id}`)
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
      fetch(`http://localhost:3000/api/news/deleteNews/${id}` , {
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
      <PageTitle sm="4" title="News details" subtitle="News Management" className="text-sm-left" />
    </Row>
    
    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/News-management">News Management</Link>
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
            <Col lg="12" md="12" sm="12" className="mb-4">
              <Card small className="card-post h-100">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(data:image/png;base64,${data.newsImages})`, height: 400, objectFit: 'contain' }}
                />
                <CardBody>
                  <h5 className="card-title">
                    <p className="text-fiord-blue">
                      {data.title}
                    </p>
                  </h5>
                  <p className="card-text">{ReactHtmlParser(data.content)}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                  <span className="d-inline-block">
                    Written By
                    <p className="text-fiord-blue">
                      {data.author}
                    </p>
                  </span>
                  <br/>
                  <span className="d-inline-block">
                    Created At
                    <p className="text-fiord-blue">
                      {data.createdAt.substring(0,20)}
                    </p>
                  </span>
                  <div className="my-auto ml-auto">
                    <Button pill  theme="danger" className="mb-2 mr-1" onClick={ () => handleDelete(data._id)} >
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

export default NewsDetails;