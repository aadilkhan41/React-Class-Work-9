import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Exercise from './pages/Exercise/Exercise.jsx';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '5a29a6dea4mshc4530a6a362a91dp10d32fjsn7717acd6e823',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        loader: async () => {
            const res = await fetch(`https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=1400`, options);
            return res.json();
        },
    }, {
        path: '/exercise/:id',
        element: <Exercise />,
        loader: async ({ params }) => {
            const res = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${params.id}`, options);
            return res.json();
        },
    },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
);