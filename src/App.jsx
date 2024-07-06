//React
import { useState, useCallback, useEffect } from 'react'
//CSS
import './App.css'
//Data
import {wordsList} from "./data/words.jsx"
//Components
import StartScreen from './Components/StartScreen/StartScreen'
import Game from './Components/Game/Game.jsx'
import GameOver from './Components/GameOver/GameOver.jsx'

//Estágios do jogo
const stages = [
  {id:0, name:"Start"},
  {id:1, name:"Game"},
  {id:2, name:"GameOver"}
];

const guessesQty = 3

function App() {
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters,setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters,setWrongLetters] = useState([])
  const [guesses, setGuesses]= useState(guessesQty)
  const [score, setScore]= useState(0)

  //Random category and word
  const pickedWordAndCategory = useCallback(() => {
    //pick random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] //Escolhe um indice aleatório dentro de words
    //console.log(category)

    //picked random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    //console.log(word)

    return {word, category}
  }, [words])

  //State stages control
  const [gameStage,setGameStage] = useState(stages[0].name)

   // Start Game - Button
   const startGame = useCallback(() =>{
    //clear all letters
    clearLetterStates()
    //picked word and category
    const {word, category} = pickedWordAndCategory()
    //create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    //console.log(wordLetters)
    //fil states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name);} ,[pickedWordAndCategory]
   )
   //Process the letter input
   const verifyLetter =(letter) => {
    const normalizedLetter = letter.toLowerCase()

    //check if letter has already been utilized
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters,normalizedLetter,])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses-1)
    };
   }


  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
    
   }

   //check if guesses ended
   useEffect(() => {
    //reset all states
    
    if(guesses <=0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
   }, [guesses])

   //check win condition
   useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    //win condition
    if(guessedLetters.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => actualScore += 100)
      //restart game with new word
      startGame();
    }
   }, [guessedLetters, letters, startGame])

   //Restar game
   const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
   }

  return (
    <>
      <div className='App'>
        {gameStage === "Start" && <StartScreen startGame={startGame}/>}

        {gameStage === "Game" && <Game verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters = {wrongLetters}
        guesses={guesses}
        score={score} />}

        {gameStage === "GameOver" && <GameOver retry={retry} score={score}/>}
      </div>
    </>
  )
}

export default App;
