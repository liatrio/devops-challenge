import React, { Component } from 'react';    
import logo from '../logo.png';    
import { Menu, Container, Image, Dropdown } from 'semantic-ui-react';    
    
class MainMenu extends Component {    
  render() {    
    return (    
      <Menu fixed='top' inverted>    
        <Container>    
          <Menu.Item    
            header    
            as='a'
            href='/'
          >    
            <Image    
              size='mini'    
              src={logo}    
              style={{ marginRight: '1.5em' }}    
            />    
            DevOps Challenge
          </Menu.Item>    
          <Dropdown item simple text='Help'>    
            <Dropdown.Menu>    
              <Dropdown.Item
                as='a'
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/join">
                Sign Up for GitHub
              </Dropdown.Item>    
              <Dropdown.Item
                as='a'
                target="_blank"
                rel="noopener noreferrer"
                href="https://help.github.com/articles/fork-a-repo/#fork-an-example-repository">
                How to Fork a Repository on GitHub
              </Dropdown.Item>    
              <Dropdown.Item
                as='a'
                target="_blank"
                rel="noopener noreferrer"
                href="https://help.github.com/articles/adding-a-file-to-a-repository/">
                How to Add a File to a Repository on GitHub
              </Dropdown.Item>    
              <Dropdown.Item
                as='a'
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.travis-ci.com/user/getting-started/">
                Getting Started with Travis CI
              </Dropdown.Item>    
              <Dropdown.Item
                as='a'
                target="_blank"
                rel="noopener noreferrer"
                href="https://help.github.com/articles/editing-files-in-your-repository/">
                How to Edit a File in a Repository on GitHub
              </Dropdown.Item>    
            </Dropdown.Menu>    
          </Dropdown>    
        </Container>    
      </Menu>    
    );    
  }    
}    
    
export default MainMenu;  
