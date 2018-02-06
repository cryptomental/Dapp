import React from 'react';

import splash from '../animations/splash.gif';

function Loader(props) {
  const style = {
    display: props.loading ? 'flex' : 'none',
    justifyContent: 'center'
  };
  const imageStyle = props.style || {};

  return (
    <div style={{ ...style }} className="market-loader">
      <img alt="Market Loader" src={splash} style={{ ...imageStyle }} />
    </div>
  );
}

export default Loader;
