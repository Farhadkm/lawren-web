import React, { Component } from 'react';
import {
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from "reactstrap";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { createMessage } from "../../../services/messageService";
import { confirmAlert } from 'react-confirm-alert';
import { deleteMessage, updateMessage } from "../../../actions/messageActions";
import { connect } from "react-redux";


class EditModal extends Component {

    state = {
        editMessage: {},

    }

    componentDidMount = () => {
        this.setState({ editMessage: this.props.message })
    }


    // Message update functions
    editMessageText = (text) => {
        this.setState(prevState => {
            return {
                ...prevState,
                editMessage: {
                    ...prevState.editMessage,
                    text: text
                }
            }
        })
    }

    editMessageActionType = (actionType) => {
        this.setState(prevState => {
            return {
                ...prevState,
                editMessage: {
                    ...prevState.editMessage,
                    actions: {
                        ...prevState.editMessage.actions,
                        type: actionType
                    }
                }
            }
        })
    }


    editMessageActionOptionLabel = (optionIndex, label) => {
        this.setState(prevState => ({
            ...prevState,
            editMessage: {
                ...prevState.editMessage,
                actions: {
                    ...prevState.editMessage.actions,
                    options: Object.assign([...prevState.editMessage.actions.options], { [optionIndex]: { ...prevState.editMessage.actions.options[optionIndex], label: label } })
                }
            }
        }))
    }
    addMessageActionOption = () => {
        console.log('here')
        this.setState(prevState => {
            return {
                ...prevState,
                editMessage: {
                    ...prevState.editMessage,
                    actions: {
                        ...prevState.editMessage.actions,
                        options: [...prevState.editMessage.actions.options, { actions: [], label: 'NEW' }]
                    }
                }
            }
        })
    }

    addMessageActionOptionAction = (optionIndex, action) => {
        this.setState(prevState => {
            return {
                ...prevState,
                editMessage: {
                    ...prevState.editMessage,
                    actions: {
                        ...prevState.editMessage.actions,
                        options: Object.assign([...prevState.editMessage.actions.options], {
                            [optionIndex]: {
                                ...prevState.editMessage.actions.options[optionIndex],
                                actions: [...prevState.editMessage.actions.options[optionIndex].actions, action]
                            }
                        })
                    }
                }
            }
        })
    }

    editMessageActionOptionAction = (optionIndex, actionIndex, actionPayloadKey, actionPayloadValue) => {
        this.setState(prevState => {
            return {
                ...prevState,
                editMessage: {
                    ...prevState.editMessage,
                    actions: {
                        ...prevState.editMessage.actions,
                        options: Object.assign([...prevState.editMessage.actions.options], {
                            [optionIndex]: {
                                ...prevState.editMessage.actions.options[optionIndex],
                                actions: Object.assign([...prevState.editMessage.actions.options[optionIndex].actions],
                                    { [actionIndex]: { ...prevState.editMessage.actions.options[optionIndex].actions[actionIndex], payload: { ...prevState.editMessage.actions.options[optionIndex].actions[actionIndex].payload, [actionPayloadKey]: actionPayloadValue } } })
                            }
                        })
                    }
                }
            }
        })
    }

    deleteMessageActionOption = (optionIndex) => {
        this.setState(prevState => {
            return {
                ...prevState,
                editMessage: {
                    ...prevState.editMessage,
                    actions: {
                        ...prevState.editMessage.actions,
                        options: [...prevState.editMessage.actions.options].filter((o, i) => i !== optionIndex)
                    }
                }
            }
        })
    }

    deleteMessageActionOptionAction = (optionIndex, actionIndex) => {

        this.setState(prevState => {
            return {
                ...prevState,
                editMessage: {
                    ...prevState.editMessage,
                    actions: {
                        ...prevState.editMessage.actions,
                        options: Object.assign([...prevState.editMessage.actions.options], {
                            [optionIndex]: {
                                ...prevState.editMessage.actions.options[optionIndex],
                                actions: [...prevState.editMessage.actions.options[optionIndex].actions].filter((_, i) => i !== actionIndex)
                            }
                        })
                    }
                }
            }
        })

    }

    render = () => {
        return (
            (this.state.editMessage) ? (<Modal isOpen={this.props.isOpen} size='lg'>
                <FaTrashAlt color='red' style={{ position: 'absolute', top: 20, right: 20 }}
                    onClick={_ => {
                        confirmAlert({
                            title: 'Delete Message?',
                            message: 'Are you sure you want to delete this message?',
                            buttons: [
                                {
                                    label: 'Yes',
                                    onClick: _ => this.deleteMessage(this.props.messageId)
                                },
                                {
                                    label: 'No'
                                }
                            ]
                        });
                    }}
                />
                <ModalHeader toggle={this.props.toggle}>Edit {this.state.editMessage.messageId}</ModalHeader>
                <ModalBody>
                    <Row className='d-flex flex-column align-items-center p-2'>
                        <h3>Text</h3>
                        <Input type='textarea' onChange={event => this.editMessageText(event.target.value)} style={{ height: 200 }} value={this.state.editMessage.text} />
                    </Row>
                    <Row className='d-flex flex-column align-items-center p-2'>
                        {(this.state.editMessage.actions) && (
                            <div>
                                <h3>Message Buttons:</h3>

                                <div className='d-flex flex-row ml-3 mr-3 align-items-center justify-content-between'>
                                    <p className='mb-0'>Button type: </p>
                                    <UncontrolledDropdown>
                                        <DropdownToggle>{this.state.editMessage.actions.type}</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={_ => this.editMessageActionType('DROPDOWN')}>DROPDOWN</DropdownItem>
                                            <DropdownItem onClick={_ => this.editMessageActionType('BUTTONS')}>BUTTONS</DropdownItem>
                                            <DropdownItem onClick={_ => this.editMessageActionType('SCROLL')}>SCROLL</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>


                                <div>
                                    {(() => {
                                        const actionType = this.state.editMessage.actions.type
                                        if (actionType === 'BUTTONS' || actionType === 'DROPDOWN' || actionType === 'SCROLL')
                                            return (
                                                <div>
                                                    {this.state.editMessage.actions.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: 'black', borderRadius: 10, borderStyle: 'dotted' }}>

                                                            <div className='d-flex flex-row align-items-center'>
                                                                <p className='mb-0'>Text: </p>

                                                                <Input value={option.label} style={{ margin: 5 }} onChange={event => this.editMessageActionOptionLabel(optionIndex, event.target.value)} />
                                                                <FaTrashAlt color='red' onClick={_ => this.deleteMessageActionOption(optionIndex)} />
                                                            </div>
                                                            <div style={{ borderRadius: 10, borderStyle: 'solid', borderWidth: 2, borderColor: 'blue', padding: 30 }}>{
                                                                option.actions.map((action, actionIndex) => (
                                                                    <Row key={actionIndex} className='d-flex flex-row'>
                                                                        <InputGroup className='mb-1 align-items-center'>
                                                                            <InputGroupAddon addonType="prepend">
                                                                                <InputGroupText style={{ width: 150, justifyContent: 'space-between' }}>{(action.type === 'ASK') ? 'Connect to:' : 'NLP Keyword'} {(action.type === 'ASK') && (<p onClick={_ => {
                                                                                    createMessage({ actions: { options: [], type: 'BUTTONS' }, text: 'EMPTY' })
                                                                                        .then(messageId => this.editMessageActionOptionAction(optionIndex, actionIndex, 'messageId', messageId))
                                                                                        .catch(_ => alert('Could not create a message!'))
                                                                                }}
                                                                                    style={{ fontSize: 10, color: 'blue' }}>New Id</p>)}</InputGroupText>
                                                                            </InputGroupAddon>
                                                                            {action.payload ? (<Input
                                                                                value={action.payload[Object.keys(action.payload)[0]]}
                                                                                onChange={event => this.editMessageActionOptionAction(optionIndex, actionIndex, Object.keys(action.payload)[0], event.target.value)}

                                                                            />) : (null)}

                                                                            <FaTrashAlt onClick={_ => this.deleteMessageActionOptionAction(optionIndex, actionIndex)} className='ml-3' color='red' />
                                                                        </InputGroup>

                                                                    </Row>

                                                                ))
                                                            }

                                                                <UncontrolledDropdown>
                                                                    <DropdownToggle><FaPlusCircle /></DropdownToggle>
                                                                    <DropdownMenu>
                                                                        <DropdownItem onClick={_ => this.addMessageActionOptionAction(optionIndex, { type: 'ASK', payload: { messageId: '' } })}>Connect to: </DropdownItem>
                                                                        <DropdownItem onClick={_ => this.addMessageActionOptionAction(optionIndex, { type: 'NLP_STRING_JOIN', payload: { word: '' } })}>NLP keywords: </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>

                                                            </div>

                                                        </div>

                                                    ))}
                                                    <FaPlusCircle onClick={this.addMessageActionOption} style={{ marginLeft: 40 }} />
                                                </div>
                                            )

                                    })()}
                                </div>
                            </div>
                        )}
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={_ => {
                        this.props.updateMessage(this.state.editMessage.messageId, this.state.editMessage)
                            .then(_ => this.props.close())
                            .catch(_ => alert('Could not update the message'))
                    }}>Save</Button>{' '}
                    <Button color="secondary" onClick={_ => {
                        this.props.close()
                        this.setState({ editMessage: this.props.message })
                        this.props.active && this.props.setActiveMessage(this.props.messageId)
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>) : null
        )
    }
}

export default connect(null, { deleteMessage, updateMessage })(EditModal);