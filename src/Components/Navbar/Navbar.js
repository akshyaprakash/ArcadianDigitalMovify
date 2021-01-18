import React, { Component } from 'react';
import Logo from './Logo';
import { MenuOutlined, CloseOutlined} from '@ant-design/icons';

class Navbar extends Component {
    state = {
        toggle: false
    }
    menuToggle = () => {
        this.setState({toggle: !this.state.toggle})
    }
    render(){
        const {toggle} = this.state;
    return (
        <>
           <header>
               <Logo />
               <ul className = {toggle ? "toggle" : ""}>
                   <li>
                       <a href="/">Home</a>
                   </li>
                   <li>
                       <a href="/">Blog</a>
                   </li>
                   <li>
                       <a href="/">Contact</a>
                   </li>
                   <li>
                       <a href="/">About</a>
                   </li>
                   <li>
                       <a href="/">Login/Register</a>
                   </li>
                   <li className="close" onClick={this.menuToggle}><CloseOutlined /></li>
               </ul>
               <div className="menu" onClick={this.menuToggle}><MenuOutlined /></div>
           </header>
        </>
    )
    }
}

export default Navbar

