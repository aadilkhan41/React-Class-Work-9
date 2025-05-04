import styles from './styles.module.css';

function SearchBar({ search, setSearch, searchExercise }) {
    return (
        <form className={styles.form}>
            <input type='text' value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder='Search exercises here...' />
            <button type='button' onClick={searchExercise}>Search</button>
        </form>
    );
}

export default SearchBar;