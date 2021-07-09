import Loadable from 'react-loadable';
import Loading from 'dan-components/Loading';

export const BlankPage = Loadable({
  loader: () => import('./Pages/BlankPage'),
  loading: Loading,
});
export const DashboardPage = Loadable({
  loader: () => import('./Pages/Dashboard'),
  loading: Loading,
});
export const Form = Loadable({
  loader: () => import('./Pages/Forms/ReduxForm'),
  loading: Loading,
});
export const Table = Loadable({
  loader: () => import('./Pages/Table/BasicTable'),
  loading: Loading,
});

export const UserList = Loadable({
  loader: () => import('./Pages/Users/List'),
  loading: Loading,
});
export const UserSearch = Loadable({
  loader: () => import('./Pages/Users/Search'),
  loading: Loading,
});
export const UserProfile = Loadable({
  loader: () => import('./Pages/Users/Profile'),
  loading: Loading,
});

export const Settings = Loadable({
  loader: () => import('./Pages/Users/Profile'),
  loading: Loading,
});

export const VideoList = Loadable({
  loader: () => import('./Pages/Videos/List'),
  loading: Loading,
});
export const UserVideoList = Loadable({
  loader: () => import('./Pages/Videos/UserVideoList'),
  loading: Loading,
});

export const MusicList = Loadable({
  loader: () => import('./Pages/Music/List'),
  loading: Loading,
});
export const AddMusic = Loadable({
  loader: () => import('./Pages/Music/Create'),
  loading: Loading,
});
export const UserDocsList = Loadable({
  loader: () => import('./Pages/Documents/UserDocsList'),
  loading: Loading,
});
export const AddCrown = Loadable({
  loader: () => import('./Pages/Crown/CrownCreate'),
  loading: Loading,
});
export const CrownList = Loadable({
  loader: () => import('./Pages/Crown/List'),
  loading: Loading,
});
export const PaymentHistory = Loadable({
  loader: () => import('./Pages/Payment/List'),
  loading: Loading,
});

export const ResetPassword = Loadable({
  loader: () => import('./Pages/Users/ResetPassword'),
  loading: Loading,
});

export const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
});
export const NotFoundDedicated = Loadable({
  loader: () => import('./Pages/Standalone/NotFoundDedicated'),
  loading: Loading,
});
export const Error = Loadable({
  loader: () => import('./Pages/Error'),
  loading: Loading,
});
export const Maintenance = Loadable({
  loader: () => import('./Pages/Maintenance'),
  loading: Loading,
});

export const Parent = Loadable({
  loader: () => import('./Parent'),
  loading: Loading,
});
