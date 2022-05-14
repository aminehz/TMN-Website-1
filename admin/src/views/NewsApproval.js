import React, { useEffect, useState} from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Breadcrumb, BreadcrumbItem, Badge, Button } from "shards-react";
import { Link } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

const NewsManagement = () => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

    const fetchData = () => {
      fetch("http://localhost:3000/api/news/allNews")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setData(data)
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
      <PageTitle sm="4" title="News list" subtitle="News Management" className="text-sm-left" />
    </Row>

    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>News Management</BreadcrumbItem>
    </Breadcrumb>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">News list</h6>
            <Link to="/new-news">
              <Button outline theme="primary" className="mb-2 mr-1" style={{float: "right"}}>
                Add News
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
              { isLoading && <td>Loading news ...</td> }
              {data &&
                data.map((news, _id) =>(
                <tr key={news._id}>
                  <td>{news.title}</td>
                  <td>{news.category ? news.category.title : ""}</td>
                  <td>{news.author}</td>
                  <td>
                  <Badge theme={(() => {
                        switch (news.status) {
                          case "aproved":   return "success";
                          case "rejected":  return "danger";
                          default :         return "warning";
                        }
                    })()}>{news.status}</Badge>
                  </td>
                  <td>
                    <Button outline size="sm" theme="success" className="mb-2 mr-1" hidden={(() => {
                      switch (news.status) {
                        case "approved":    return true;
                        case "rejected":    return true;
                        default :           return false;
                      }
                    })()}>
                        Approve
                    </Button>
                    <Button outline size="sm" theme="danger" className="mb-2 mr-1" hidden={(() => {
                      switch (news.status) {
                        case "approved":    return true;
                        case "rejected":    return true;
                        default :           return false;
                      }
                    })()}>
                        Reject
                    </Button>
                    <Link to={`/news-details/${news._id}`}>
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


export default NewsManagement;