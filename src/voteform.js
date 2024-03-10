import React, { useState } from 'react';
import './voteform.css'; // Make sure to create and import Ramzan.css
import axios from 'axios'; // Import axios for making HTTP requests

class VoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity: '', // State to store the selected city for voting
            voteSubmitted: false // State to track whether the vote has been submitted
        };
    }

    handleCityChange = (event) => {
        this.setState({ selectedCity: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { selectedCity } = this.state;
        if (!selectedCity) {
            alert('Please select a Monument.');
            return;
        }

        try {
            // Send the selected city to the server for storing in MongoDB
            await axios.post('/vote', { city: selectedCity });
            this.setState({ voteSubmitted: true });
        } catch (error) {
            console.error('Error submitting vote:', error);
            alert('Failed to submit vote. Please try again later.');
        }
    }

    render() {
        return (
            <div className='vote-container'>
                <h1 className='vote-header'>Vote for Your Favorite Monument</h1>
                <div className='vote-content'>
                    <p>Please select your favorite Monument from the list below and submit your vote:</p>
                    {this.state.voteSubmitted ? (
                        <p>Thank you for voting!</p>
                    ) : (
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="city">Select a Monument:</label>
                            <select id="city" name="city" value={this.state.selectedCity} onChange={this.handleCityChange}>
                                <option value="">Select a Monument</option>
                                <option value="New York">Taj Mahal</option>
                                <option value="London">Jama Masid</option>
                                <option value="Paris">Red Fort</option>
                                <option value="Tokyo">Basilica Of Bom Jesus</option>
    
                            </select>
                            <button type="submit">Vote</button>
                        </form>
                    )}
                </div>
            </div>
        );
    }
}

export default VoteForm;
