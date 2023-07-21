import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);


// Uncomment this code to get the Redux working


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './store';
// import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

// import App from './App';

// ReactDOM.render(
//   <Provider store={store}>
//     <Router> {/* Wrap your App component with Router */}
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// );
