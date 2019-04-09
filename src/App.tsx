// import React from 'react';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Link from '@material-ui/core/Link';
// import ProTip from './ProTip';

// function MyBox(props: any) {
//   return <Box {...props} />;
// }

// function MadeWithLove() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Built with love by the '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Material-UI asdasdasd
//       </Link>
//       {' team.'}
//     </Typography>
//   );
// }

// export default function App() {
//   return (
//     <Container maxWidth="sm">
//       <MyBox my={4}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Create React App v4-alpha example with TypeScript
//         </Typography>
//         <ProTip />
//         <MadeWithLove />
//       </MyBox>
//     </Container>
//   );
// }

import React from 'react';
import AppProviders from './components/app-providers';
import PageLoader from './containers/page-loader';
import AppFrame from './containers/app-frame';
import { BaseStoreShape } from 'global-types';
import Typography from '@material-ui/core/Typography'
/* eslint-disable */
const App = ({ store }: { store: BaseStoreShape }) => (
    <AppProviders store={store}>
        <AppFrame>
            <PageLoader />
        </AppFrame>
    </AppProviders>

);


export default App;

