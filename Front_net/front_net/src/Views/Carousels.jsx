import Carousel from 'react-bootstrap/Carousel';
//import ExampleCarouselImage from 'components/ExampleCarouselImage';


function Carousels() {
  return (
    <Carousel>
      <Carousel.Item>
        <img  src="src\assets\backgroud.jpg" width={1500} height={600} />
        <Carousel.Caption>
          <h3>Welcome to our Restaurant</h3>
          <p>Enjoy your meal with us.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img  src="src\assets\tasty-pizza-near-ingredients.jpg"width={1500} height={600} />
        <Carousel.Caption>
          <h3>Welcome to our Restaurant</h3>
          <p>Enjoy your meal with us.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img  src="src\assets\olive-oil-cherry-tomato-with-raw-italian-pasta-black-backdrop.jpg"width={1500} height={600} />
        <Carousel.Caption>
          <h3>Welcome to our Restaurant</h3>
          <p>
          Enjoy your meal with us.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;