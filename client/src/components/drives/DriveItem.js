import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDrive } from '../../actions/drive';

// Checks if the user is in the array
const inArray = (auth, array) => {
  if (!auth.loading) {
    return (
      array.filter(object => object.user.toString() === auth.user._id).length >
      0
    );
  }
};

const DriveItem = ({
  auth,
  deleteDrive,
  drive: {
    _id,
    user,
    name,
    avatar,
    leavingDate,
    leavingTime,
    resort,
    seats,
    description,
    group,
    comments,
    date
  }
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {/* Top Descriptions */}
        <i className="far fa-calendar-alt text-primary"></i>
        <span>
          {' '}
          Leaving <Moment format="MM/DD/YYYY">{leavingDate}</Moment>{' '}
        </span>
        <i className="far fa-clock text-primary"></i>
        <span> {leavingTime} </span>
        <i className="fas fa-mountain text-primary"></i>
        <span> {resort} </span>
        <i className="fas fa-chair text-primary"></i>
        <span> {seats} </span>
        <p className="my-1">{description}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YY">{date}</Moment>
        </p>

        {/* Bottom Actions */}
        {/* Only shows Join/Leave if you DO NOT own the drive */}
        {!auth.loading && auth.user._id !== user && (
          <Fragment>
            <button type="button" className="btn btn-primary">
              <i className="fas fa-user-plus"></i>
              {/* Displays Join if in group, else Displays Leave */}
              <span> {inArray(auth, group) ? 'Leave' : 'Join'}</span>
            </button>
          </Fragment>
        )}
        <Link to={`/drive-group/${_id}`} className="btn btn-light">
          <i className="fas fa-car-alt"></i> Group{' '}
          <span className="comment-count">{group.length}</span>
        </Link>
        <Link to={`/drive-comments/${_id}`} className="btn btn-light">
          <i className="fas fa-comments"></i> Comments{' '}
          <span className="comment-count">{comments.length}</span>
        </Link>

        {/* Delete and Edit button only shows if user owns post */}
        {!auth.loading && user === auth.user._id && (
          <Fragment>
            <Link to={`/drive-edit/${_id}`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
            <button
              type="button"
              onClick={e => deleteDrive(_id)}
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

// Defines propTypes for DriveItem
DriveItem.propTypes = {
  drive: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteDrive: PropTypes.func.isRequired
};

// Sets auth prop to the current state of auth
const mapStateToProps = state => ({
  auth: state.auth
});

// Exports Component, connect() is for redux
export default connect(
  mapStateToProps,
  { deleteDrive }
)(DriveItem);