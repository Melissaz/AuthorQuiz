import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';

import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors =[
    {
        name:'Mark Twain',
        imageUrl:'images/authors/marktwain.jpg',
        imageSource:'Wikimedia Commons',
        books:['The Adventures of Huckleberry Finn']
    },
    {
        name:'Joseph Conrad',
        imageUrl:'images/authors/josephconrad.png',
        imageSource:'Wikimedia Commons',
        books:['Heart of Darkness']
    },
    {
        name:'Charles Dickens',
        imageUrl:'images/authors/charlesdickens.jpg',
        imageSource:'Wikimedia Commons',
        books:['David Copperfield','A Tale of Two Cities']
    },
    {
        name:'William Shakespeare',
        imageUrl:'images/authors/williamshakespeare.jpg',
        imageSource:'Wikimedia Commons',
        books:['Hamlet','Macbeth','Romeo and Juliet']
    }
];

function getTurnData(authors){
    const allBooks = authors.reduce(function(p, c, i){
        return p.concat(c.books);
    },[]);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return{
        books:fourRandomBooks,
        author:authors.find((author) =>
            author.books.some((title) => 
                    title === answer))
    }
}

//why return {} not ()
function resetState(){
    return{
        turnData:getTurnData(authors),
        highlight: ''
    };
}

let state = resetState();

function onAnswerSelected(answer){
    const iscorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = iscorrect ? 'correct' : 'wrong';
    render();
}

const AuthorWrapper = withRouter (({history}) =>
    <AddAuthorForm onAddAuthor={(author) =>{
            authors.push(author); 
            history.push('/');
        }} />
);
   
function App(){
    return <AuthorQuiz {...state}  
    onAnswerSelected={onAnswerSelected} 
    onContinue={()=>{
        state = resetState();
        render();
    }} />;
}


function render(){
    ReactDOM.render(
        
    <BrowserRouter>
        <React.Fragment>
            <Route exact path = "/" component={App} />
            <Route path = "/add" component={AuthorWrapper} />
        </React.Fragment>
    </BrowserRouter>
    , document.getElementById('root'));
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
