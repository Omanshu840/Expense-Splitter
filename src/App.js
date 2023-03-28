import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ChangeScreenAction } from './actions';
import AddExpense from './components/AddExpense';
import AddMembers from './components/AddMembers'
import Results from './components/Results';
import { screens } from './constants';

const App = (props) => {

  const [mode, setMode] = useState();

  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add("dark-mode")
    }
    else {
      document.body.classList.add("light-mode")
    }

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        if(event.matches) {
          document.body.classList.add("dark-mode")
          document.body.classList.remove("light-mode")
        }
        else {
          document.body.classList.add("light-mode")
          document.body.classList.remove("dark-mode")
        }

      });
  }, []);

  return (
    <Container style={{textAlign: 'center'}}>
      {(props.screen === screens.ADD_MEMBERS.name) && <AddMembers/>}
      {(props.screen === screens.ADD_MEMBERS.name) && 
        <Button className="mt-3 btn-md" onClick={() => props.dispatch(ChangeScreenAction(screens[props.screen].next))}>
          Add Expense <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: '5px'}}/>
        </Button>
      }

      {(props.screen === screens.ADD_EXPENSE.name) && <AddExpense/>}
      {(props.screen === screens.ADD_EXPENSE.name) && 
        <>
          <Button className="mt-3 btn-md" onClick={() => props.dispatch(ChangeScreenAction(screens[props.screen].prev))} style={{marginRight: '7px'}}>
            <FontAwesomeIcon icon={faArrowLeft} style={{marginRight: '5px'}}/> Back
          </Button>
          <Button className="mt-3 btn-md" onClick={() => props.dispatch(ChangeScreenAction(screens[props.screen].next))} style={{marginLeft: '7px'}}>
            Split <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: '5px'}}/>
          </Button>
        </>
      }

      {(props.screen === screens.RESULTS.name) && <Results/>}
      {(props.screen === screens.RESULTS.name) &&
        <Button className="mt-3 btn-md" onClick={() => props.dispatch(ChangeScreenAction(screens[props.screen].prev))}>
          <FontAwesomeIcon icon={faArrowLeft} style={{marginRight: '5px'}}/> Edit Expense
        </Button>
      }
    </Container>
  )
}

const mapStateToProps = state => ({
  screen: state.screen
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);