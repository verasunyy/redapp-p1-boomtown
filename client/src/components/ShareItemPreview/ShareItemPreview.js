import React from 'react';
import ItemCard from '../ItemCard'
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
    return (
        <div>
            <ItemCard item={shareItemPreview} />
        </div>
    );
};

const mapSateToProps = ({ shareItemPreview }) => {
    return { shareItemPreview };
}
export default connect(mapSateToProps)(ShareItemPreview);

