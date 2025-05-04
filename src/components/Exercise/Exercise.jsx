import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Exercise({exercise}) {

    const navigate = useNavigate();

    function capitalize(str) {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <article className={styles.exercise} onClick={() => { navigate(`/exercise/${exercise.id}`) }}>
            <img src={exercise.gifUrl} alt={exercise.name} />
            <section>
                <p>{capitalize(exercise.bodyPart)}</p>
                <p>{capitalize(exercise.target)}</p>
            </section>
            <h3>{capitalize(exercise.name)}</h3>
        </article>
    );
}

export default Exercise;