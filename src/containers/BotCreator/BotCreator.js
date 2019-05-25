import React, { Component } from 'react';
import { Container } from "reactstrap";
import { persistor } from '../../store';
import Level from '../../Level';

class BotCreator extends Component {


    state = {
        rootMessage: '5b050e92-ff4e-4f48-b0d3-8241b0154dd2'
    }

    componentDidMount = () => {

    }

    render = () => {
        return (
            <div ref={el => { this.appEl = el }} >
                <p style={{ position: 'absolute', top: 100, left: 20 }} onClick={_ => { persistor.purge(); window.location.reload() }}>update</p>
                <Container>
                    <Level
                        setRootMessage={messageId => {
                            this.setState({ rootMessage: messageId })
                        }}
                        appEl={this.appEl}
                        levelMessageIds={[{ messageId: this.state.rootMessage }]} />

                </Container>
            </div>
        )
    }
}

export default BotCreator;