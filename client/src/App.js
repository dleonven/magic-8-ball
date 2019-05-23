import React from 'react';
import './App.css';


const App = () => {
  return(
    <div className="App">
      <header className="App-header">
        <h1 style={{marginTop: '30px'}}>
          Just ask me
        </h1>
        <img src='https://www.pinhype.com/wp-content/uploads/2017/03/PH85_8_Ball_Pin-595x595.png' className="App-logo" alt="logo" />
      </header>
      <MagicBallBody/>
    </div>

  )
}


class MagicBallBody extends React.Component {

  state = {
    show_validation: false,
    text: '',
    response: ''
  }

  /* handles on change text, and resets response */
  _handleChange = (event) => {
    this.setState({
      text: event.target.value,
      response: ''
     })
  }

  /* function that makes the async API call to get the random line */
  _callApi = async () => {
    const response = await fetch('/api');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  /* get answer via writing handler */
  _writeAndAsk = (e) => {
    /* if the user clicked, and there was text.. */
    if(this.state.text !== '') {
      /* refresh the validator */
      this.setState({
        show_validation: false
      })
      /* got get the answer */
      this._callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }
    /* if there wasn`t text.. */
    else {
      /* refresh response and show validator */
      this.setState({
        response: '',
        show_validation: true
      })
    }
    /* prevent re-rendering from submit */
    e.preventDefault();
  }

  /* get answer via thinking and pressing handler */
  _thinkAndAsk = (e) => {
    /* go get answer */
    this._callApi()
      .then(res => this.setState({
        text: '',
        response: res.express,
        show_validation: false
      }))
      .catch(err => console.log(err));
    e.preventDefault();
  }

  render() {
    return(
      <div className="App-body">
        {/* pressing option */}
        <div style={{borderColor: 'white'}}>
          <button
            style={{borderRadius: '4px', backgroundColor: 'white', color: 'black', fontSize: '24px'}}
            onClick={this._thinkAndAsk}
          >
            Think and ask
          </button>

        </div>
        {/* writing option */}
        <div style={{marginTop: '30px'}}>
          <h2 style={{color: 'white'}}>Write your question</h2>
          <form
            onSubmit={this._writeAndAsk}>
            <label>
              <textarea
                style={{width: '100%', height: '56px', borderRadius: '4px', backgroundColor: 'white'}}
                value={this.state.text}
                onChange={this._handleChange} />
            </label>
            <input
              style={{width: '50%', height: '56px', borderRadius: '4px', backgroundColor: 'white', fontSize: '24px'}}
              type="submit" value="ask.." />
          </form>
          {/* if there is no text and the validator is set to true...show it */}
          {this.state.text === '' && this.state.show_validation === true &&
            <small style={{color: '#ff4d4d'}}>come on..</small>
          }
        </div>
        <h1 style={{color: '#009ACD'}}>{this.state.response}</h1>
      </div>
    )
  }
}



export default App;
