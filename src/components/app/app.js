import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import { HomePage, CartPage} from '../pages';


import './app.css';



const App = () => {
    return (
        
        <main role='main' className='container'>

            <ShopHeader numItems={5} total={210} />
            {/*//=! Отрисовывает максимум один Route */}
           <Switch>

                {/* //=! конфигурирует адрес '/' */ }
               <Route path='/' component={HomePage} exact />

                {/* //=! конфигурирует адрес '/cart' */ }
               <Route path='/cart' component={CartPage} />
           </Switch>
        </main>
    );
};

export default App;
