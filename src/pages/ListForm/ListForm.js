import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import uniqid from 'uniqid';
import backIcon from '../../assets/icons/arrow_back.svg';
import homeIcon from '../../assets/icons/home.svg';
import './ListForm.scss';;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ListForm = ({ user, status }) => {
    const [listLabel, setListLabel] = useState('');
    const [listContent, setListContent] = useState([]);
    const [listItem, setListItem] = useState('');
    const [listItems, setListsItem] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAxiosError, setIsAxiosError] = useState(false);
    const { listId } = useParams();
    let [itemInputs, setItemInputs] = useState(0);

    const history = useHistory();

    const handleAddInput = () => {
        setItemInputs(++itemInputs);
    };

    const handleRemoveInput = () => {
        setItemInputs(--itemInputs);
    };

    const handleChangeLabel = (event) => {
        setListLabel(event.target.value);
    };

    const handleContent = (event) => {
        const updatedListItems = listItems.forEach((item) => {
            setListItem(event.target.value);
        });
        setListContent(updatedListItems);
    };

    const isFormValid = () => {
        if (!listLabel || !listContent) {
            return false;
        }
        return true;
    };

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!isFormValid()) {
            setIsError(true);
            return;

        };

        if (status === 'edit') {
            axios
                .put(`${SERVER_URL}/lists/${user.id}/list/${listId}`, {
                    label: listLabel,
                    user_id: user.id
                }) 
                .then(() => {

                    listContent.forEach((item) => {
                        axios
                            .put(`${SERVER_URL}/items/${listId}/item/${item.id}`, {
                                label: listLabel,
                                user_id: user.id,
                                list_id: listId,
                                item: item.item,
                                checked: item.checked
                            })
                            .then((response) => {
                                console.log(response);
                            })
                    })

                    setIsError(false);
                    setIsSuccess(true);

                    setTimeout(() => {
                        history.goBack();
                    }, 2000)
                })
                .catch((response) => {
                    console.log(response)
                    setIsAxiosError(true);
                });

            setListLabel('');
            setListContent([]);
        };

        if (status === 'add') {
            axios
                .post(`${SERVER_URL}/lists`, {
                    label: listLabel,
                    user_id: user.id
                }) 
                .then(() => {

                    listContent.forEach((item) => {
                        axios
                            .post(`${SERVER_URL}/items`, {
                                label: listLabel,
                                user_id: user.id,
                                list_id: listId,
                                item: listItem,
                                checked: false
                            })
                            .then((response) => {
                                console.log(response);
                            });
                    });

                    setIsError(false);
                    setIsSuccess(true);

                    setTimeout(() => {
                        history.goBack();
                    }, 2000)
                })
                .catch(() => {
                    setIsAxiosError(true);
                });

            setListLabel('');
            setListContent('');
        };
    };

    useEffect(() => {
        if (status === 'edit' && user ) {
            axios
                .get(`${SERVER_URL}/lists/${user.id}/list/${listId}`)
                .then((response) => {
                    const selectedList = response.data;
                    setListLabel(selectedList.label);

                    axios
                        .get(`${SERVER_URL}/items/${listId}`)
                        .then((response) => {
                            const selectedItems = response.data;
                            setListContent(selectedItems);

                            const itemsArr = [];

                            selectedItems.forEach((item) =>{
                                itemsArr.push(item);
                            });

                            setListsItem(itemsArr);
                        })
                })
                .catch((error) => {
                    console.log(error)
                    setIsAxiosError(true);
                });
        }
    }, [listId]);

    return (
        <>
            <div className='list-form__nav'>
                <img src={backIcon} alt='back icon' className='list-form__icon' onClick={history.goBack} />
                <Link to='/' className='list-form__link'>
                    <img src={homeIcon} alt='home icon' className='list-form__icon' />
                </Link>
            </div>
            <form className='list-form__fields'>
                <label className='list-form__title'>
                    Label
                </label>
                <input 
                    type='text'
                    placeholder='Add a label to your list'
                    className={!isError ? 'list-form__label' : 'list-form__label list-form__label--error'}
                    name='listLabel'
                    value={listLabel}
                    onChange={handleChangeLabel}
                />

                <label className='list-form__title'>
                    Items
                </label>
                <div className='list-form__add-remove'>
                    <p className='list-form__plus' onClick={handleAddInput}>{status === 'add' && '+'}</p>
                    <p className='list-form__minus' onClick={handleRemoveInput}>{status === 'add' && 'x'}</p>
                </div>
                {
                    listContent.map((item) => {
                        return (
                            <li 
                                key={uniqid()} 
                                className='list__group'
                            >
                                <input
                                    type='text'
                                    placeholder='Add your item'
                                    className={!isError ? 'list-form__content' : 'list-form__content list-form__content--error'}
                                    name='listItem'
                                    value={item.item}
                                    onChange={handleContent}
                                />
                            </li>
                        );
                    })
                }

                {
                    status === 'add' &&
                    <input
                        type='text'
                        placeholder='Add your item'
                        className={!isError ? 'list-form__content' : 'list-form__content list-form__content--error'}
                        name='listItem'
                    />
                }

                {
                    Array.from(Array(itemInputs)).map((input) => {
                        return ( 
                            <input
                                key={uniqid()}
                                type='text'
                                placeholder='Add your item'
                                className={!isError ? 'list-form__content' : 'list-form__content list-form__content--error'}
                                name='listItem'
                            />
                        );
                    })
                }

                {isError && <span className='list-form__error'>All fields are required.</span>}
                {isSuccess && <span className='list-form__success'>List {status==='add' ? 'added' : 'updated'} successfully!</span>}
                {isAxiosError && <span className='list-form__request'>Please try again later.</span>}

                <div className='list-form__buttons'>
                    <button className='list-form__button' onClick={handleCancel} >
                        Cancel
                    </button>
                    <button className='list-form__button' onClick={handleSubmit} >
                        {status === 'add' ? 'Add List' : 'Update List'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ListForm;