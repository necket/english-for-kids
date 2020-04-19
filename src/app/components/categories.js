import React from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import Store from '~/store/store.js'

@observer class Categories extends React.Component {

    switchCategory(category){
        if(Store.cards['custom-game'] !== undefined) Store.removeCustomGame();
        Store.switchCategory(category);
        window.scrollTo(0, 0);
    }

    render(){
        let play = Store.play ? ' category-play' : '';
        let categories = Store.links.map(el => {
            return (
                <div key={el.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <Link to={'/card'} className={'category' + play} onClick={() => this.switchCategory(el.id)}>
                        <img src={'./dist/img/categories/' + el.id + '.jpg'} alt={el.id} className="img-fluid" 
                            onMouseDown ={(e) => e.preventDefault()}
                        />
                        <p>{el.name}</p>
                    </Link>
                </div>
            )
        })

        return(
            <div className="row justify-content-center">
                {categories}
            </div>
        )
    }
}

export default Categories;