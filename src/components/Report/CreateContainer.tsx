import React from 'react';
import { Container } from 'react-bootstrap';
import CreateReport from './Create';
import NavbarMenu from './../Frame/Navbar/NavbarMenu';

class CreateContainer extends React.Component {
    render() {
      return <div>
                <NavbarMenu />
                <CreateReport />
          </div>;
    }
  }

  export default CreateContainer;
