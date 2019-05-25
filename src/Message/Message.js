import React, { Component } from "react";
import './Message.css'
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { getMessage, updateMessage } from "../actions/messageActions";
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EditModal from "./components/EditModal/EditModal";


class Message extends Component {
    state = {
        showEditModal: false,
    }

    componentDidMount = () => {
        this.props.getMessage(this.props.messageId)
    }
    render = () => {
        if (!this.props.message) {
            return (<Spinner />)
        }
        return (
            <div className='message'>
                <Card className={`card${this.props.active && ' card--active'}`}>
                    {this.props.for && <div className='message__for'><span className="font-weight-bold">FOR:  </span>{this.props.for}</div>}
                    <CardBody>
                        {/* <div onClick={_ => this.props.setRootMessage(this.props.messageId)} style={{ position: 'absolute', top: 10, right: 10, color: 'blue', }}>Set Root</div> */}
                        <CardTitle><span className="font-weight-bold">ID #: </span>{this.props.messageId}</CardTitle>

                        <CardText className='card__text'>
                            <PerfectScrollbar>
                                {this.props.message.text}
                            </PerfectScrollbar>
                        </CardText>


                        <Button onClick={_ => this.props.setActiveMessage(this.props.messageId)} className='bg-primary' >Show Connections</Button>
                        <Button onClick={_ => this.setState({ showEditModal: true })} className='bg-success ml-4'>Edit</Button>

                    </CardBody>
                </Card>

                <EditModal
                    close={_ => this.setState({ showEditModal: false })}
                    isOpen={this.state.showEditModal}
                    message={this.props.message} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    message: state.messages[ownProps.messageId]
})

export default connect(mapStateToProps, { getMessage, updateMessage })(Message);