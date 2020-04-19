import React from 'react';
import {observer} from 'mobx-react';
import Store from '~/store/store.js';

@observer class Header extends React.Component {

    switchMenu(){
        Store.switchMenu();
    }

    switchPlay(){
        Store.switchPlay();
        [...(document.querySelectorAll('.flip'))].map(el => el.style.filter = null);
    }
    
    render(){
        let active = Store.menu ? ' hamburger-active' : '';
        return(
            <div className="row p-3 mt-3 justify-content-between">
                <div className={'hamburger' + active} onClick={this.switchMenu}>
                    <span></span>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" name="checkbox" id="checkbox" onChange={this.switchPlay}/>
                </div>
            </div>
        )
    }
}

export default Header;