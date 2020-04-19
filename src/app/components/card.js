import React from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';
import Store from '~/store/store.js';

@observer class Card extends React.Component {

    redirect = false;

    rotateCard(el) {
        document.querySelector(`#${el}-flip`).classList.add('flip-active');
        Store.stats[el].clicks++;
        Store.updateStats();
    }

    unrotateCard(el) {
        let target = `#${el}-flip`;
        document.querySelector(target).classList.remove('flip-active');
    }

    speech(el) {
        if(el !== undefined) document.querySelector('#speech').src = `./dist/sound/words/${el}.mp3`;
    }

    sound(el) {
        document.querySelector('#sound').src = `./dist/sound/${el}.mp3`;
    }

    game = () => {
        let words = Store.cards[Store.category]
        .map(el => ({ value: el.name, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort).map((el) => el.value);
        
        Store.game.start = true;
        Store.game.words = words;
        Store.game.current = words[0];
        
        this.speech(Store.game.current);
    }

    resetGame(){
        Store.resetGame();
    }

    answer(el){
        let active = JSON.parse(document.querySelector(`#${el}-img`).dataset.active);
        if(Store.game.level !== Store.game.words.length && active){
            Store.stats[Store.game.current].attemps++;
            Store.updateStats();
            if(el === Store.game.current){
                this.sound('correct');
                document.querySelector(`#${el}-img`).dataset.active = false;
                document.querySelector(`#${el}-flip`).style.filter = 'opacity(50%)';
                Store.game.rating.push(1);
                Store.game.level++;
                Store.game.current = Store.game.words[Store.game.level];
                if(Store.game.level !== Store.game.words.length) {
                    window.setTimeout(() => {
                        Store.game.words !== null ? this.speech(Store.game.words[Store.game.level]) : () => {}
                    }, 1000);
                }else{
                    document.querySelector('.repeat').classList.remove('repeat-play');
                    window.setTimeout(() => {
                        Store.game.errors === 0 ? this.sound('success') : this.sound('failure');
                        Store.game.finish = true;
                        window.setTimeout(() => {
                            document.querySelector('#checkbox').checked = false;
                            Store.switchPlay();
                            this.resetGame();
                            Store.category = null;
                        }, 3000);
                    }, 1000)
                };
            }else{
                Store.stats[Store.game.current].errors++;
                Store.updateStats();
                this.sound('error');
                Store.game.rating.push(0);
                Store.game.errors++;
            }
        }
    }

    render(){
        let bottom = Store.play ? ' bottom-play' : '';
        let img = Store.play ? ' img-play' : '';

        let cards = Store.cards[Store.category] !== null && Store.cards[Store.category] !== undefined ? 
        Store.cards[Store.category].map(el => {
            return (
                <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={el.name}> 
                    <div className="card" onMouseLeave={() => this.unrotateCard(el.name)}>
                        <div className="flip" id={el.name + '-flip'}>
                            <div className="front">
                                <img src={`./dist/img/cards/${el.name}.jpg`} alt={el.name} className={'img-fluid' + img}
                                    id={el.name + '-img'}
                                    data-active={true} 
                                    onClick={() => !Store.play ? this.speech(el.name) : Store.game.start ? this.answer(el.name) : () => {}}
                                    onMouseDown ={(e) => e.preventDefault()}
                                />
                                <div className={'bottom' + bottom}>
                                    <p>{el.name}</p>
                                    <div className="rotate" onClick={() => this.rotateCard(el.name)}>
                                        <img src="./dist/img/rotate.png" alt="rotate" className="img-fluid"/>
                                    </div>
                                </div>
                            </div>
                            <div className="back">
                                <img src={`./dist/img/cards/${el.name}.jpg`} alt={el.name} className="img-fluid"
                                    onClick={() => this.speech(el.name)}
                                    onMouseDown ={(e) => e.preventDefault()}
                                />
                                <div className="bottom">
                                    <p>{el.tran}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }) : <Redirect to={'/'} />;

        let rating = Store.game.rating.slice().reverse().map((el, i) => el === 1 ? 
                      <div className="star-win" key={i}></div> : 
                      <div className="star-lose" key={i}></div>);

        let btn = Store.play && !Store.game.start ? ' btn-play' : '';
        let repeat = Store.play && Store.game.start ? ' repeat-play' : '';
        let finish = Store.game.finish ? ' finish-finish' : '';
        let finishImg = Store.game.errors === 0 ? 'success' : 'failure';

        return (<>
            <div className="row">
                <div className="col-12">
                    <div className="rating">
                        {rating}
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                {cards}
            </div>
            <div className="row justify-content-center">
                <div className="buttons col-12 col-md-6 col-lg-4">
                    <div className={'btn' + btn} onClick={this.game}>Start game</div>
                    <div className={'repeat' + repeat} onClick={() => this.speech(Store.game.current)}></div>
                </div>
            </div>
            <audio id="speech" src="" autoPlay></audio>
            <audio id="sound" src="" autoPlay></audio>
            <div className={'finish' + finish}>
                <p>{Store.game.errors === 0 ? 'You win!' : Store.game.errors + ' errors'}</p>
                <img src={'./dist/img/' + finishImg + '.jpg'} alt="finish" className="img-fluid" onMouseDown ={(e) => e.preventDefault()}/>
            </div>
        </>)
    }
}

export default Card;