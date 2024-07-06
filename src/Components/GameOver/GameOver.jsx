import "./GameOver.css";

const GameOver = ({retry, score}) => {

    return(
        <div className="GameOverDiv">
            <h1>Fim de jogo</h1>
            <h2>Você fez: <span>{score}</span> pontos!</h2>
            <button onClick={retry}>Tentar novamente</button>
        </div>
    )
}

export default GameOver;