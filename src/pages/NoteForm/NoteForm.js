import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import backIcon from '../../assets/icons/arrow_back.svg';
import homeIcon from '../../assets/icons/home.svg';
import './NoteForm.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NoteForm = ({ status }) => {
    const [noteLabel, setNoteLabel] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { noteId } = useParams();

    const history = useHistory();

    const handleChangeLabel = (event) => {
        setNoteLabel(event.target.value);
    };

    const handleChangeContent = (event) => {
        setNoteContent(event.target.value);
    };

    const isFormValid = () => {
        if (!noteLabel || !noteContent) {
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!isFormValid()) {
            setIsError(true);
            return;
        }
 
        axios
            .post(`${SERVER_URL}/notes`, {
                label: noteLabel,
                note: noteContent,
                user_id: 2
            }) 
            .then(() => {
                setIsError(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsError(true);
            });

        setNoteLabel('');
        setNoteContent('');
    }

    useEffect(() => {
        axios
            .get(`${SERVER_URL}/notes/2/note/${noteId}`)
            .then((response) => {
                console.log(response)
                const selectedNote = response.data;

                setNoteLabel(selectedNote.label);
                setNoteContent(selectedNote.note);
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            });
    }, [noteId]);

    return (
        <>
            <div className='note-form__nav'>
                <img src={backIcon} alt='back icon' className='note-form__icon' onClick={history.goBack} />
                <Link to='/' className='note-form__link'>
                    <img src={homeIcon} alt='home icon' className='note-form__icon' />
                </Link>
            </div>
            <form className='note-form__fields'>
                <label className='note-form__title'>
                    Label
                </label>
                <input 
                    type='text'
                    placeholder='Add a label to your note'
                    className='note-form__label'
                    name='noteLabel'
                    value={noteLabel}
                    onChange={handleChangeLabel}
                />

                <label className='note-form__title'>
                    Note
                </label>
                <textarea
                    type='text'
                    placeholder='Add your note'
                    className='note-form__content'
                    name='noteContent'
                    value={noteContent}
                    onChange={handleChangeContent}
                />
                
                <button className='note-form__button' onClick={handleSubmit} >
                    {status === 'add' ? 'Add Note' : 'Update Note'}
                </button>
            </form>
        </>
    );
};

export default NoteForm;