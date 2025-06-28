import { useState } from 'react';
import './App.css';
import bc1 from './assets/bc1.jpg';

function App() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="container">

    
    <div className='box1'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Provident, quam accusantium necessitatibus eum nam optio labore i
       mpedit quis architecto maxime odio magnam mollitia iste illo molestias eos quia ex sint?
      </div>
   <div className='box2'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Provident, quam accusantium necessitatibus eum nam optio labore i
       mpedit quis architecto maxime odio magnam mollitia iste illo molestias eos quia ex sint?
      </div>
     <div className='box3'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Provident, quam accusantium necessitatibus eum nam optio labore i
       mpedit quis architecto maxime odio magnam mollitia iste illo molestias eos quia ex sint?
      </div>
    </div>
  )
}

export default App
