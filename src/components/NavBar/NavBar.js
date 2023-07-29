import './NavBar.css'
import { Link } from "react-router-dom";
export function NavBar(){
        return (
            <div className='menu'>
                <li>
                    <Link to="/" className='page-link'>Resume</Link>
                </li>
                <li>
                    <Link to="/chess" className='page-link'>ChessClassifier</Link>
                </li>
                <li>
                    <Link to="/qho" className='page-link' >Quantum Harmonic Oscillator</Link>
                </li>
            </div>
        )
}