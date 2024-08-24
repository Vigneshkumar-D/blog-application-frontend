import { useParams } from 'react-router-dom';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    return (
      <Component
        {...props}
        params={params}
      />
    );
  }

  return ComponentWithRouterProp;
};

export default withRouter;
