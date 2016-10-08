// TODO(p0o): use a selector for these
export const getFeedFromState = (sortBy = '', category = 'all', state) => {
  switch (sortBy) {
    case 'feed':
    case 'hot':
    case 'cashout':
    case 'crated':
    case 'active':
    case 'trending':
      return state[sortBy][category] ? state[sortBy][category].list : [];
    default:
      return state.trending.all ? state.trending.all.list : [];
  }
};

export const getFeedContentFromState = (sortBy, category = 'all', feedState, postsState) => {
  const feedList = getFeedFromState(sortBy, category, feedState);
  return feedList.map(feedId => postsState[feedId]);
};

export const getFeedLoadingFromState = (sortBy, category = 'all', feedState) => {
  switch (sortBy) {
    case 'feed':
    case 'hot':
    case 'cashout':
    case 'crated':
    case 'active':
    case 'trending':
      return (feedState[sortBy][category] && feedState[sortBy][category].isFetching) || false;
    default:
      return (feedState.trending.all && feedState.trending.all.isFetching) || false;
  }
};

// returning the same function but different naming helps to understand the code's flow better
// and defines a pattern to scale this feature with reselect
export const getUserFeedContentFromState = (username, feedState, postsState) =>
  getFeedContentFromState('feed', username, feedState, postsState);

export const getUserFeedLoadingFromState = (username, feedState) =>
  (feedState.feed[username] && feedState.feed[username].isFetching) || false;