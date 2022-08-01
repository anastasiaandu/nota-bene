import { NavLink } from 'react-router-dom';
import homeIcon from '../../assets/icons/home.svg';
import notesIcon from '../../assets/icons/notes.svg';
import listsIcon from '../../assets/icons/lists.svg';
import filesIcon from '../../assets/icons/files.svg';
import accountIcon from '../../assets/icons/account.svg';
import './PageFooter.scss';

const PageFooter = () => {
    return (
        <footer className='footer'>
            <nav className='footer__nav'>
                <ul className='footer__list'>
                    <li>
                        <NavLink
                            to='/'
                            exact
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={homeIcon} alt='home icon' />
                            <p>Home</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/notes'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={notesIcon} alt='notes icon' />
                            <p>Notes</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/lists'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={listsIcon} alt='lists icon' />
                            <p>Lists</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/files'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={filesIcon} alt='files icon' />
                            <p>Files</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/account'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={accountIcon} alt='account icon' />
                            <p>Account</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default PageFooter;