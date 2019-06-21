import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const Home = (props) => {


  return (
      <div className='row'>
        <Card className='card' >
        <CardImg className="img"  top width="100%" src="https://images-na.ssl-images-amazon.com/images/I/711PjhCvvZL._SL1260_.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Redmi note7</CardTitle>
          <CardSubtitle>best under 12,000</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      <Card className='card' >
        <CardImg className="img"  top width="100%" src="https://images-na.ssl-images-amazon.com/images/I/711PjhCvvZL._SL1260_.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Redmi note7</CardTitle>
          <CardSubtitle>best under 12,000</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>      
      <Card className='card' >
        <CardImg className="img"  top width="100%" src="https://images-na.ssl-images-amazon.com/images/I/711PjhCvvZL._SL1260_.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Redmi note7</CardTitle>
          <CardSubtitle>best under 12,000</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
        </Card>          

      </div>

  );
};

export default Home;