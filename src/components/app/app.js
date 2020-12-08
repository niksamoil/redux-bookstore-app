import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, CartPage} from '../pages';


import './app.css';



const App = () => {
    return (
        <div>
            {/*//=! Отрисовывает максимум один Route */}
           <Switch>

                {/* //=! конфигурирует адрес '/' */ }
               <Route path='/' component={HomePage} exact />

                {/* //=! конфигурирует адрес '/cart' */ }
               <Route path='/cart' component={CartPage} />
           </Switch>
        </div>
    );
};

export default App;
