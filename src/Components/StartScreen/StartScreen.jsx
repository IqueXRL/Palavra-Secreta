import "./StartScreen.css";

const StartScreen = ({startGame}) => {
    return(
    <div className="StartScreen">
    <h1>Palavra Secreta</h1>
    <p>Clique no botão abaixo para iniciar o jogo!</p>
    <button onClick={startGame}>Iniciar jogo</button>
    </div>
    )
}

export default StartScreen;
