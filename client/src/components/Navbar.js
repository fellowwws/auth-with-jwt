import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/authProvider";

export default function () {
  const { user, authState, logOut } = useContext(AuthContext);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  if (authState === "loading") return null;

  return (
    <Navbar color='light' light expand='sm'>
      <NavbarBrand href='/'>Authmaster2000</NavbarBrand>

      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className='w-100 mr-auto' navbar>
          <NavItem className='flex-grow-1'>
            <NavLink href='https://github.com/fellowwws'>GitHub</NavLink>
          </NavItem>
          {user && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user ? user.name.first : "User"}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem disabled>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      logOut();
                      history.push("/");
                    }
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}
