import React from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import Store from '~/store/store.js';

@observer class Menu extends React.Component {


    switchCategory(category){
        if(Store.cards['custom-game'] !== undefined) Store.removeCustomGame();
        Store.switchCategory(category);
        Store.switchMenu();
        window.scrollTo(0, 0);
    }

    render(){

        let active = Store.menu ? ' menu-active' : '';
        let play = Store.play ? ' menu-play' : '';

        let links = Store.links.map(el => {
            return (
                <li key={el.id}>
                    <Link to={'/card'} onClick={() => this.switchCategory(el.id)} className="menu-link">
                        {el.name}
                    </Link>
                </li>
            )
        });

        return(
            <div className={'menu' + play + active}>
                <ul>
                    <li>
                        <Link to={'/'} onClick={() => this.switchCategory(null)} className="menu-link">
                            Main page
                        </Link>
                    </li>
                    <li>
                        <Link to={'/stat'} onClick={() => this.switchCategory(null)} className="menu-link">
                            Statistics
                        </Link>
                    </li>
                    {links}
                </ul>
            </div>
        )
    }
}

export default Menu;