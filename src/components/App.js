import React from 'react';

import styles from './App.scss';

export default props => <div className={styles.appContainer}>
    <h1>Bouille le monde!</h1>
    {props.children}
</div>;
