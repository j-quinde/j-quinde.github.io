
/*
const user = 'Josselyn Quinde';
const saludo = <h1>Hola, soy {user}</h1>;
ReactDOM.render(saludo,document.getElementById('div_saludo'));
*/

/*function Saludar(props) {
    return <h1>Hola, soy {props.name}</h1>
}
ReactDOM.render(<Saludar name="Josselyn Quinde" />,document.getElementById('div_saludo'));*/
/*
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
*/

const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidesPerView:3,    
    direction: 'horizontal',
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor:'true',
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  });
  
  

const openPokedex = () => {
    window.open("https://j-quinde.github.io/pokedex/");
}

const navItems = document.querySelectorAll("nav a");
navItems.forEach(item => {
    item.addEventListener('click', function () {
        const itemActive = document.querySelector('nav a.active');
        if(itemActive){
            itemActive.classList.remove('active');
        }
        item.classList.add('active');
    });
});
