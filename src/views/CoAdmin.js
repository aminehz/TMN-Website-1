import React, { useEffect, useState } from "react";
import {Link, useHistory,} from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Breadcrumb, BreadcrumbItem, } from "shards-react";
import PageTitle from "../components/common/PageTitle";

const Tables = () => {
  const [coadmins, setCoadmins] = useState([])

  const history = useHistory();

  const fetchData = () => {
    fetch("http://localhost:3000/api/coadmin/allCoadmins/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCoadmins(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete= (id) => {
    fetch(`http://localhost:3000/api/coadmin/deleteCoadmin/${id}` , {
        method: 'DELETE'
    }).then(() => {
        console.log("deleted");
        history.go(0);
    })
  }

  return(
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Co-Admins" subtitle="Co-Admins Management" className="text-sm-left" />
    </Row>

    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>Co-Admins</BreadcrumbItem>
    </Breadcrumb>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">Active Co-Admins</h6>
            <Link to="/new-co-admin">
              <Button outline theme="primary" className="mb-2 mr-1" style={{float: "right"}}>
                Add Co-Admin
              </Button>
            </Link>
          </CardHeader>
          <CardBody className="bg-dark p-0 pb-3">
            <table className="table table-dark mb-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="border-0">
                    First Name
                  </th>
                  <th scope="col" className="border-0">
                    Last Name
                  </th>
                  <th scope="col" className="border-0">
                    E-mail
                  </th>
                  <th scope="col" className="border-0">
                    City
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {coadmins &&
                coadmins.map((coadmin, _id) => (
                <tr key={coadmin._id}>
                  <td>{coadmin.name}</td>
                  <td>{coadmin.lastName}</td>
                  <td>{coadmin.email}</td>
                  <td>{coadmin.city}</td>
                  <td>
                    <Button outline type="button" size="sm" theme="danger" className="mb-2 mr-1" onClick={ () => handleDelete(coadmin._id)}>
                      Delete
                    </Button>
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
  )
};
export default Tables;
