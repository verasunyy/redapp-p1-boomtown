import { Query } from 'react-apollo';
import React from 'react';
import { VIEWER_QUERY } from '../apollo/queries';

export const ViewerContext = React.createContext();

export const ViewerProvider = ({ children }) => {
  //  // const viewer = { id: 4, email: 'test@example.com', fullname: 'Test User', bio: 'No bio' };
  // const viewer = false;

  // const loading = false;
  return (
    <Query query={VIEWER_QUERY}>
      {({ data, loading }) => {
        const viewer = data && data.viewer ? data.viewer : null;
        return (
          <ViewerContext.Provider value={{ viewer, loading }}>
            {children}
          </ViewerContext.Provider>
        );
      }}
    </Query>
  );
  // return <Fragment>{children}</Fragment>;
};

// export { ViewerProvider };
// export default ViewerContext;
