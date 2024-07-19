import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import UpdateForm from './components/UpdateForm';
import '/src/App.css'
import '/src/styles/ContactForm.css'
import '/src/styles/ContactItem.css'
import '/src/styles/ContactList.css'
import '/src/styles/CreactContact.css'
import '/src/styles/Header.css'
import '/src/styles/Home.css'
import '/src/styles/Sidebar.css'
import '/src/styles/UpdateForm.css'

function App() {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Sidebar />
          <Col md={{ span: 8, offset: 2 }} className="main-content w-100 m-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateContact />} />
              <Route path="/update/:id" element={<UpdateForm />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
