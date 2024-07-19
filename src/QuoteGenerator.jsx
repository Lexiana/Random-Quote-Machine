import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const colors = [
    '#16a085', '#27ae60', '#2c3e50', '#f39c12',
    '#e74c3c', '#9b59b6', '#FB6964', '#342224',
    '#472E32', '#BDBB99', '#77B1A9', '#73A857'
];

function QuoteGenerator() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)]);

    const getRandomQuote = async () => {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            setQuote(response.data.content);
            setAuthor(response.data.author);
            setColor(colors[Math.floor(Math.random() * colors.length)]);
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    useEffect(() => {
        getRandomQuote();
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--main-color', color);
    }, [color]);

    const tweetQuote = () => {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(tweetUrl, '_blank');
    }
    return (
        <Card id="quote-box" className='position-absolute top-50 start-50 translate-middle text-center w-50'>
            <Card.Body>
                <Card.Title id='text'><i class="bi bi-quote"></i>{quote}</Card.Title>
                <Card.Text id='author' className='text-end'>- {author}</Card.Text>
                <Card.Footer className=" row text-muted">
                    <div className="col-6">
                        <a id="tweet-quote" onClick={tweetQuote} href="https://twitter.com/intent/tweet" 
                        className='btn btn-primary float-start' >
                            <i class="bi bi-twitter-x"></i>
                        </a></div>
                    <div className="col-6">
                        <Button className='float-end' id='new-quote' variant="primary" onClick={getRandomQuote}>New Quote</Button>
                    </div>


                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default QuoteGenerator