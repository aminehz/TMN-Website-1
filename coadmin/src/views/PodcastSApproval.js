import React, { useEffect, useState} from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Breadcrumb, BreadcrumbItem, Badge} from "shards-react";
import { Link } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

const PodcastsApproval = () => {

  const [podcasts, setPodcasts] = useState([])
  const [isLoading, setIsLoading]= useState(true)

    const fetchData = () => {
      fetch("http://localhost:3000/api/podcasts/allPodcasts")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setPodcasts(data)
          setIsLoading(false)
        })
    }
  
    useEffect(() => {
      fetchData()
    }, [])

    return (
        <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Podcasts list" subtitle="Podcasts Management" className="text-sm-left" />
    </Row>

    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>Podcasts Management</BreadcrumbItem>
    </Breadcrumb>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">Podcasts list</h6>
            <Link to="/new-podcast">
              <Button outline theme="primary" className="mb-2 mr-1" style={{float: "right"}}>
                Add Podcast
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
                    Sub-Category
                  </th>
                  <th scope="col" className="border-0">
                    written by
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
              { isLoading && <td>Loading Podcasts ...</td> }
              {podcasts && 
                podcasts.map((podcast, _id) =>(
                <tr key={podcast._id}>
                  <td>{podcast.title}</td>
                  <td>{podcast.category ? podcast.category.title :""}</td>
                  <td>{podcast.author}</td>
                  <td>
                  <Badge theme={(() => {
                        switch (podcast.status) {
                          case "approved":   return "success";
                          case "rejected":   return "danger";
                          default :          return "warning";
                        }
                    })()}>{podcast.status}
                  </Badge>
                  </td>
                  <td>
                   
                    <Link to={`/podcast-details/${podcast._id}`}>
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

export default PodcastsApproval;