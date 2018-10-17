import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css';

function Hero(){
  return(
    <div className ="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

//what does onClick = {() => {onClick(title) means? 
function Book({title, onClick}){
  return (<div className ="answer" onClick = {() => {onClick(title);}}>
    <h5>{title}</h5>
  </div>
  );
}

//inside the function props must have curly braces.
function Turn({author, books, highlight, onAnswerSelected}){
  function highlightToBgColor (highlight){
    const mapping ={
      'none':'',
      'correct':'green',
      'wrong':'red'
    };
    return mapping[highlight];
  }

  Turn.propTypes = {
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageSource: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    highlight: PropTypes.string.isRequired
  };

  return (
  <div className="row turn" style={{backgroundColor:highlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage" alt="Author" />
    </div>
    <div className="col-6">
      {books.map((title) => <Book title={title} key={title}  onClick={onAnswerSelected} />)}
    </div>
  </div>);
}


function Continue(){
  return (<div />);
}

function Footer(){
  return (
  <div id="footer" className="row"> 
    <div className="col-12">
      <p className="text-muted credit">
      All images are from .
      </p>
    </div>
  </div>
);
}

//why use {...turnData} while only {turnData} in function props?
function AuthorQuiz({turnData, highlight, onAnswerSelected}) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn  {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />  
        <Continue />
        <Footer />
      </div>
    );
}

export default AuthorQuiz;
