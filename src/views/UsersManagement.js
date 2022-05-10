import React, { useEffect, useState} from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Breadcrumb, BreadcrumbItem } from "shards-react";
import { Link, useHistory } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

const Tables = () => {

  const [users, setUsers] = useState([])

  const history = useHistory();

  const fetchData = () => {
    fetch("http://localhost:3000/api/users/allusers")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete= (id) => {
    fetch(`http://localhost:3000/api/users/allusers/${id}` , {
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
      <PageTitle sm="4" title="Users" subtitle="Users management" className="text-sm-left" />
    </Row>

    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>Users</BreadcrumbItem>
    </Breadcrumb>
    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">Users list</h6>
          </CardHeader>
          <CardBody className="bg-dark p-0 pb-3">
            <table className="table table-dark mb-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="border-0">
                    First Name
                  </th>
                  <th scope="col" className="border-0">
                    E-mail
                  </th>
                  <th scope="col" className="border-0">
                    City
                  </th>
                  <th scope="col" className="border-0">
                    
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {users &&
                users.map((user, _id) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.city}</td>
                  <td></td>
                  <td>
                    <Button outline size="sm" theme="danger" className="mb-2 mr-1" onClick={ () => handleDelete(user._id)}>
                      Delete
                    </Button></td>
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
