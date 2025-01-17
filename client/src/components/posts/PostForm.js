import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  // Sets variable to keep track of user text input
  const [text, setText] = useState('');
  // Sets variable to display or hide form
  const [displayPostForm, togglePostForm] = useState(false);

  return (
    <div className="post-form">
      <div className="bg-primary">
        <button
          className="btn btn-primary btn-bg"
          type="button"
          onClick={() => togglePostForm(!displayPostForm)}
        >
          <h3>Say Something...</h3>
        </button>
      </div>

      {displayPostForm && (
        <Fragment>
          <form
            className="form my-1"
            onSubmit={e => {
              e.preventDefault();
              addPost({ text });
              setText('');
            }}
          >
            <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              value={text}
              onChange={e => setText(e.target.value)}
              required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Post" />
          </form>
        </Fragment>
      )}
    </div>
  );
};

// Defines prop for component
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

// Connect component with redux state
export default connect(
  null,
  { addPost }
)(PostForm);
