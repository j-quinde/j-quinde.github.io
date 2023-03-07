
/*
const user = 'Josselyn Quinde';
const saludo = <h1>Hola, soy {user}</h1>;
ReactDOM.render(saludo,document.getElementById('div_saludo'));
*/

/*function Saludar(props) {
    return <h1>Hola, soy {props.name}</h1>
}
ReactDOM.render(<Saludar name="Josselyn Quinde" />,document.getElementById('div_saludo'));*/

const User = props => <h1>Hola, soy {props.name}</h1>;
ReactDOM.render(<User name="Josselyn Quinde" />,document.getElementById('div_saludo'));


function OpenAlert() {
    const alerta = () => {
        alert("Hola");
    }

    return(
        <button onClick={alerta}>+Ver más</button>
    );
}

ReactDOM.render(<OpenAlert />,document.getElementById('div_vermas'));

const btn_pokedex = () => {
    window.open("https://j-quinde.github.io/pokedex/", "mozillaTab");
}