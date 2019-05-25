import React, { Fragment, Component } from 'react';
import { Row, Col, } from "reactstrap";
import Message from './Message/Message';
import { connect } from "react-redux";
import { getMessage } from './actions/messageActions';




class Level extends Component {
    state = {
        activeMessageId: '',
        nextLevelMessageIds: []
    }

    setActiveMessage = messageId => {
        this.setState({ nextLevelMessageIds: [] })
        this.setState({ activeMessageId: messageId })
        this.props.getMessage(messageId)
            .then(message => {
                this.setState({ nextLevelMessageIds: this.getNextMessages(message) })
                this.levelEl && this.levelEl.scrollIntoView({ behavior: 'smooth' })
            })


    }
    render = () => {
        return (
            <Fragment>
                <Row className="level">
                    {this.props.levelMessageIds.map(messageInfo => (
                        <Col className="level__column" key={messageInfo.messageId} className='d-flex justify-content-center pt-3'>
                            <Message
                                setRootMessage={messageId => {
                                    this.props.setRootMessage(messageId)
                                }}
                                setActiveMessage={this.setActiveMessage}
                                active={messageInfo.messageId === this.state.activeMessageId}
                                messageId={messageInfo.messageId}
                                for={messageInfo.for} />
                        </Col>
                    ))}
                </Row>
                <hr />
                {
                    (this.state.nextLevelMessageIds.length > 0) && (<div ref={el => { this.levelEl = el }}><LevelComponent setRootMessage={this.props.setRootMessage} levelMessageIds={this.state.nextLevelMessageIds} /></div>)}

            </Fragment>
        )
    }


    getNextMessages = (message) => {
        const messages = []
        if (message.actions.type === 'BUTTONS' || message.actions.type === 'DROPDOWN' || message.actions.type === 'SCROLL') {
            for (let option of message.actions.options) {
                for (let action of option.actions) {
                    if (action.type === 'ASK') {
                        messages.push({ messageId: action.payload.messageId, for: option.label })
                    }
                }
            }
        }

        return messages
    }
}

const LevelComponent = connect(null, { getMessage })(Level);

export default LevelComponent;