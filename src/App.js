import react from 'react';
import './styles/App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login';
import {useStateValue} from './StateProvider';

function App() {

    const [{user}, dispatch] = useStateValue();
    return (<div className="app">
        <div className="app__body"> 
            {!user ? (<Login/>) : (
                <Router>
                    <Sidebar/>
                    <Switch>                    
                        <Route path="/rooms/:roomId">
                            <Chat/>
                        </Route>
                        <Route path="/">
                                {/* shows empty page.. */}
                        </Route>
                    </Switch>
                </Router>
            )}            
        </div>
    </div>)
}   

export default App;