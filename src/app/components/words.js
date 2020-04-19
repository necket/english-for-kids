import React from 'react';
import {observer} from 'mobx-react';
import Store from '~/store/store.js';

@observer class Words extends React.Component {

    sortWords(sort){
        Store.sortWords(sort);
        [...(document.querySelectorAll('.arrow'))].map(el => el.classList.remove('arrow-flip'))
    }

    sortReverse(sort){
        if(sort === Store.sort) {
            Store.allWords = Store.allWords.slice().reverse();
            document.getElementById(sort + '-arrow').classList.toggle('arrow-flip');
        }
    }

    render(){

        let words = Store.allWords.map(word => 
            <div className="col-12 col-md-6 col-xl-4" key={word.name + '-word-col'}>
                <div className="accordion__word word"> 
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
        );

        return (<>
            <div className="sort">
                <div className="sort-item">
                    Sort by:
                </div>
                <div className="sort-item" onClick={() => this.sortReverse('word')}>
                    <input type="radio" name="sort" id="word" defaultChecked={true}
                            onChange={() => this.sortWords('word')}
                    />
                    <label htmlFor="word">Words</label>
                    <img src="./dist/img/arrow.png" alt="arrow" className="arrow" id="word-arrow"
                        onMouseDown ={(e) => e.preventDefault()}
                    />
                </div>
                <div className="sort-item" onClick={() => this.sortReverse('error')}>
                    <input type="radio" name="sort" id="error"
                            onChange={() => this.sortWords('error')}
                    />
                    <label htmlFor="error">Errors</label>
                    <img src="./dist/img/arrow.png" alt="arrow" className="arrow" id="error-arrow"
                        onMouseDown ={(e) => e.preventDefault()}
                    />
                </div>
            </div>
            <div className="words">
                <div className="row">
                    {words}
                </div>
            </div>
        </>)
    }
}

export default Words;