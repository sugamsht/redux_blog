import jsonPlaceHolder from "../api/jsonPlaceHolder"
import _ from "lodash"

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts())

    _.uniq(_.map(getState().posts, 'userId')).forEach(id => dispatch(fetchUser(id))) //dispatching fetchUser for each unique userId
}

//action creator
export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceHolder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
}

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
}



// //memoized function
// export const fetchUser = (id) => dispatch => _fetchedUser(id, dispatch);

// const _fetchedUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USER', payload: response.data });
// })
