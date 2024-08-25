import { useParams} from 'react-router-dom';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    // const location = useLocation();
    return (
      <Component
        {...props}
        params={params}
        // location={location}
      />
    );
  }

  return ComponentWithRouterProp;
};

export default withRouter;
