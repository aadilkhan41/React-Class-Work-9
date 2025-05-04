import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useLoaderData } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Carousel from '../../components/Carousel/Carousel';
import Exercise from '../../components/Exercise/Exercise';
import Pagination from '../../components/Pagination/Pagination';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '5a29a6dea4mshc4530a6a362a91dp10d32fjsn7717acd6e823',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
}

function Home() {
    const [results, setResults] = useState(useLoaderData());
    const [exercises, setExercises] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const bodyParts = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"];

    async function searchExercise() {
        if (search != '') {
            const encoded = encodeURIComponent(search);
            const res = await fetch(`https://exercisedb.p.rapidapi.com/exercises/name/${encoded}?offset=0&limit=1000`, options);
            const data = await res.json();
            if(category === 'All'){
                setResults(data);
            }else{
                setResults(data.filter((ele)=>{
                    return ele.bodyPart == category;
                }));
            }
        }
    }

    useEffect(() => {
        updateResult(1);
    }, [results]);

    function updateResult(page) {
        let from = (page - 1) * 24;
        let to = page * 24;
        setExercises(results.slice(from, to));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <main className={styles.main}>
            <h1>Awesome Exercises You <br /> Should Know</h1>
            <SearchBar search={search} setSearch={setSearch} searchExercise={searchExercise} />
            <Carousel bodyParts={bodyParts} category={category} setCategory={setCategory} />
            {exercises.length > 0 ? <>
                <h2>Search Results</h2>
                <div className={styles.results}>
                    {exercises.map((exercise) => {
                        return <Exercise key={exercise.id} exercise={exercise} />;
                    })}
                </div>
                <div className={styles.pagination}>
                    <Pagination totalRestro={results.length} updateResult={updateResult} />
                </div>
            </> : <></>}
        </main>
    );
}

export default Home;
