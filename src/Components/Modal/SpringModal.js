import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import DeleteButton from '../DeleteButton/DeleteButton';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import "./SpringModal.css";
import {DELETE_POST, DELETE_COMMENT} from '../../GraphqlQueries/Mutations';
import { useMutation } from '@apollo/client';
import {FETCH_POSTS_QUERY} from '../../GraphqlQueries/Fetch';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: 'dark-gray',
    borderRadius: '10px'
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal({postId, commentId}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const mutation= commentId? DELETE_COMMENT : DELETE_POST;

  const [deletePost, {loading}]= useMutation(mutation, {
    update(cache, result){

      setOpen(false);
      if(!commentId){
        const posts= cache.readQuery({
          query: FETCH_POSTS_QUERY
        })
  
        const updatedPosts= posts.getPosts.filter(post=> post.id!== postId);
  
        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: updatedPosts
          }
        })
      }
      
    },
    onError(err){
      console.log(err);
    },
    variables: {
      postId,
      commentId 
    }
  })

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div  >
      <button className="springModal_button" type="button" onClick={handleOpen}>
        <DeleteButton/>
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={open}>
          <div className={`${classes.paper} delete_modal`}>
            <div className="modal_alert">
              <p>Are you sure you Want to delete?</p>
            </div>
            <div className="modal_buttons">
              <button className={`modal_button ${!loading && "modal_button_red"}`} disabled= {loading && true} onClick={deletePost}>{loading? "loading": "delete"}</button>
              <button onClick={handleClose} className="modal_button modal_button_gray">Cancel</button>
            </div>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
