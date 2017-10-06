import Loadable from 'react-loadable';
import Loading from './Loading';

const AsyncLoader = opts => {
  return Loadable(Object.assign({
    loading: Loading
  }, opts));
};

export default AsyncLoader;
