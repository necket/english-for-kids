import React from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import Store from '~/store/store.js';
import Accordion from './accordion.js'
import Words from './words.js'

@observer class Categories extends React.Component {

    tab = 1;

    customGame(){
        Store.cards['custom-game'] = Store.getAllWords('error').slice(0, 8);
        Store.switchCategory('custom-game');
        window.scrollTo(0, 0);
    }
    
    toggleTabs(id){
        [...(document.querySelectorAll('.tab'))].map(
            el => 
            el.dataset.tab === id ? 
            el.classList.add('tab-active') :
            el.classList.remove('tab-active')
        );
        [...(document.querySelectorAll('.tab-content'))].map(
            el => 
            el.dataset.content === id ? 
            el.classList.add('tab-content-active') :
            el.classList.remove('tab-content-active')
        );
    }

    render(){
        return (<>
            <div className="row mt-3">
                <div className="col-6">
                    <div className={'tab tab-active'} onClick={() => this.toggleTabs('1')} data-tab='1'>
                        <h5>Categories</h5>
                    </div>
                </div>
                <div className="col-6">
                    <div className={'tab'} onClick={() => this.toggleTabs('2')} data-tab='2'>
                        <h5>All words</h5>
                    </div>
                </div>
            </div>
            <div className={'tab-content tab-content-active'} data-content='1'>
                <Accordion></Accordion>
            </div>
            <div className={'tab-content'} data-content='2'>
                <Words></Words>
            </div>
            <div className="row mt-5 justify-content-center">
                <Link className="col-6" to={'/card'}
                    onClick={() => this.customGame()}
                >
                    <div className="difficult__btn">
                        Repeat difficult words
                    </div>
                </Link>
            </div>
            <div className="stats-footer">
                <div className="text-center">To reset statistics press button below two times</div>
                <div className="accordion__btn" onDoubleClick={() => Store.resetStats()}></div>
            </div>
        </>)
    }
}

export default Categories;