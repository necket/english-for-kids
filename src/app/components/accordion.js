import React from 'react';
import {observer} from 'mobx-react';
import Store from '~/store/store.js';

@observer class Accordion extends React.Component {

    openAll = false;

    switchOpenAll = () => {
        this.openAll ? this.openAll = false : this.openAll = true;
    }

    openCategory(category){
        this.openAll ?
        document.querySelector(`#${category}`).classList.toggle('active') :
        [...(document.querySelectorAll('.accordion__item'))].map(
            el => el.id !== category ? 
            el.classList.remove('active') : 
            el.classList.toggle('active')
        );
       
    }

    render(){

        let play = Store.play ? ' accordion-play' : ''

        let accordion = [];
        for(let category in Store.cards){
            let words = Store.cards[category].map(word => 
                <div className="col-12 col-md-6 col-xl-4" key={word.name + '-accordion-col'}>
                    <div className="accordion__word" key={word.name}> 
                        <p><strong>{word.name}</strong> - {word.tran}</p>
                        <div className="accordion__percent">
                            {
                                Store.stats[word.name].attemps === 0 ? 0 :
                                Math.round(Store.stats[word.name].errors / Store.stats[word.name].attemps * 100)
                            }%
                        </div>
                        <div className="accordion__stats">
                            <span>clicks: {Store.stats[word.name].clicks}</span>
                            <span>attemps: {Store.stats[word.name].attemps}</span>
                            <span>errors: {Store.stats[word.name].errors}</span>
                        </div>
                    </div>
                </div>
            )
            accordion.push(
                <li className="accordion__item" key={category} id={category}>
                    <div className={'accordion__title' + play} onClick={() => this.openCategory(category)}>
                        <h3>{category}</h3>
                        <span className="accordion__icon"></span>
                    </div>
                    <div className="accordion__content">
                        <div className="row">
                            {words}
                        </div>
                    </div>
                </li>
            )
        }

        return (<>
            <ul className="accordion__items">
                {accordion}
            </ul>
            <div className="accordion__checkbox">
                <input type="checkbox" name="openall" id="openall"
                        defaultChecked={this.openAll}
                        onChange={() => this.switchOpenAll()}
                />
                <label htmlFor="openall" className="ml-1">
                    open all categories together
                </label>
            </div>
        </>)
    }
}

export default Accordion;