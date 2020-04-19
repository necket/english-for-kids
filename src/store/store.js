import {observable, action} from 'mobx';

class Store{
    @observable links = [
        { name: 'Action (set A)', id: 'action-set-a' },
        { name: 'Action (set B)', id: 'action-set-b' },
        { name: 'Action (set C)', id: 'action-set-c' },
        { name: 'Adjectives', id: 'adjectives' },
        { name: 'Animal (set A)', id: 'animal-set-a' },
        { name: 'Animal (set B)', id: 'animal-set-b' },
        { name: 'Clothes', id: 'clothes' },
        { name: 'Emotions', id: 'emotions' }
    ];
    @observable cards = getCards();
    @observable menu = false;
    @observable play = false;
    @observable category = null;

    @action switchMenu(){
        this.menu ? this.menu = false : this.menu = true;
    }
    @action switchPlay(){
        this.play ? this.play = false : this.play = true;
        this.resetGame();
    }
    @action switchCategory(category){
        this.category = category;
        this.resetGame();
    }

    @action resetGame() {
        this.game = {
            play: this.play,
            start: false,
            words: null,
            current: null,
            level: 0,
            errors: 0,
            rating: [],
            finish: false
        };
        this.customGamewords = null;
    }
    @observable game = {
        play: this.play,
        start: false,
        words: null,
        current: null,
        level: 0,
        errors: 44,
        rating: [],
        finish: false
    }

    @observable stats = getStats();
    @action updateStats(){
        localStorage.setItem('english-for-kids', JSON.stringify(this.stats));
    }
    @action resetStats(){
        localStorage.removeItem('english-for-kids');
        this.stats = getStats();
        window.scrollTo(0, 0);
    }

    @observable allWords = this.getAllWords('word');
    @observable sort = 'word';
    @action sortWords(sort){
        this.allWords = this.getAllWords(sort);
        this.sort = sort;
    }
    @action getAllWords(sort){
        let allWords = [];
        for(let category in this.cards){
            let words = this.cards[category].map(el => {
                el.errors = this.stats[el.name].errors;
                return el
            });
            allWords.push(...words);
        }
        if(sort === 'word'){
            return allWords.sort((a, b) => a.name < b.name ? -1 : 1)
        }else if(sort === 'error'){
            return allWords.sort((a, b) => a.errors > b.errors ? -1 : 1)
        }
        
    }

}

export default new Store();


function getStats(){
    let words = {};
    if(localStorage.getItem('english-for-kids') === null){
        let cards = getCards();
        for(let category in cards) {
            cards[category].map(
                el => words[el.name] = { clicks: 0, attemps: 0, errors: 0}
            );
        };
    }else{
        words = JSON.parse(localStorage.getItem('english-for-kids'));
    }
    return words
}

function getCards(){
    return {
        'action-set-a': [
            { name: 'cry', tran: 'плакать'},
            { name: 'dance', tran: 'танцевать'},
            { name: 'dive', tran: 'нырять'},
            { name: 'draw', tran: 'рисовать'},
            { name: 'fishing', tran: 'ловить рыбу'},
            { name: 'fly', tran: 'летать'},
            { name: 'hug', tran: 'обнимать'},
            { name: 'jump', tran: 'прыгать'}
        ],
        'action-set-b': [
            { name: 'open', tran: 'открывать'},
            { name: 'play', tran: 'играть'},
            { name: 'point', tran: 'показывать'},
            { name: 'ride', tran: 'ездить'},
            { name: 'run', tran: 'бегать'},
            { name: 'sing', tran: 'петь'},
            { name: 'skip', tran: 'пропускать, прыгать'},
            { name: 'swim', tran: 'плавать'}
        ],
        'action-set-c': [
            { name: 'argue', tran: 'спорить'},
            { name: 'build', tran: 'строить'},
            { name: 'carry', tran: 'нести'},
            { name: 'catch', tran: 'ловить'},
            { name: 'drive', tran: 'водить'},
            { name: 'drop', tran: 'падать'},
            { name: 'pull', tran: 'тянуть'},
            { name: 'push', tran: 'толкать'}
        ],
        'animal-set-a': [
            { name: 'cat', tran: 'кот'},
            { name: 'chick', tran: 'ципленок'},
            { name: 'chicken', tran: 'курица'},
            { name: 'dog', tran: 'собака'},
            { name: 'horse', tran: 'лошадь'},
            { name: 'pig', tran: 'свинья'},
            { name: 'rabbit', tran: 'кролик'},
            { name: 'sheep', tran: 'овца'}
        ],
        'animal-set-b': [
            { name: 'bird', tran: 'птица'},
            { name: 'fish', tran: 'рыба'},
            { name: 'frog', tran: 'жаба'},
            { name: 'giraffe', tran: 'жираф'},
            { name: 'lion', tran: 'лев'},
            { name: 'mouse', tran: 'мишь'},
            { name: 'turtle', tran: 'черепаха'},
            { name: 'dolphin', tran: 'дельфин'}
        ],
        'adjectives': [
            { name: 'big', tran: 'большой'},
            { name: 'small', tran: 'маленький'},
            { name: 'fast', tran: 'быстрый'},
            { name: 'slow', tran: 'медленный'},
            { name: 'friendly', tran: 'дружелюбный'},
            { name: 'unfriendly', tran: 'недружелюбный'},
            { name: 'young', tran: 'молодой'},
            { name: 'old', tran: 'старый'}
        ],
        'clothes': [
            { name: 'skirt', tran: 'юбка'},
            { name: 'pants', tran: 'штаны'},
            { name: 'blouse', tran: 'блузка'},
            { name: 'dress', tran: 'платье'},
            { name: 'boot', tran: 'ботинок'},
            { name: 'shirt', tran: 'рубашка'},
            { name: 'coat', tran: 'пальто'},
            { name: 'shoes', tran: 'туфли'}
        ],
        'emotions': [
            { name: 'sad', tran: 'грустный'},
            { name: 'angry', tran: 'злой'},
            { name: 'happy', tran: 'счастливый'},
            { name: 'tired', tran: 'уставший'},
            { name: 'surprised', tran: 'удивлённый'},
            { name: 'scared', tran: 'испуганный'},
            { name: 'smile', tran: 'улыбка'},
            { name: 'laugh', tran: 'смех'}
        ]
    }
}