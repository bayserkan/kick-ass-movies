/**
 *
 * Asynchronously loads the component for MovieDetails
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
