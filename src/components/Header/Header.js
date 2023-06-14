import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import './Header.css';
export function Header() {
    return (
        <header>
            <div className='header'>
                <div className='left-header'>
                    <h1>
                        Noah Jacobson
                    </h1>
                    <h3>
                        Software Developer
                    </h3>
                </div>
                <div className='middle-header'>
                    <FaPhoneAlt className="header-icon" />
                    <IoIosMail className="header-icon" />
                    <FaMapMarkerAlt className="header-icon" />
                </div>
                <div className='right-header'>
                    <h5 className='header-contacts'>
                        noah.l.jacobson@gmail.com
                    </h5>
                    <h5 className='header-contacts'>
                        508 - 314 - 7503
                    </h5>
                    <h5 className='header-contacts'>
                        132 Oxbow Road, Wayland MA
                    </h5>
                </div>
            </div>
        </header>
    );
}