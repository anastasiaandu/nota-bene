import React, { Component } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import './DeleteModal.scss';

class DeleteModal extends Component {

    handleConfirmDelete = () => {
        this.props.onConfirmDelete(this.props.selectedNote);
    }
        
    componentDidUpdate() {
        if (this.props.show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className='modal' onClick={this.props.onClose}>
                <div className='modal__container' onClick={(event) => event.stopPropagation()}>
                    <div>
                        <img src={closeIcon} alt='close icon' className='modal__close' onClick={this.props.onClose} />
                        <p className='modal__question'>{`Are you sure you want to delete this ${this.props.type}?`}</p>
                    </div>
                    <div className='modal__buttons'>
                        <button className='modal__button' onClick={this.props.onClose} >Well, not really</button>
                        <button className='modal__button modal__button--delete' onClick={this.handleConfirmDelete}>Yes please</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteModal;