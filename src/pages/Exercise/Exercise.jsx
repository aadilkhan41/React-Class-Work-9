import { useLoaderData } from 'react-router-dom';
import styles from './styles.module.css';
import Move from '../../assets/Move';
import Target from '../../assets/Target';

function Exercise() {
    const exercise = useLoaderData();

    function capitalize(str) {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <main className={styles.main}>
            <section>
                <img src={exercise.gifUrl} alt={exercise.name} />
            </section>
            <section>
                <h1>{capitalize(exercise.name)}</h1>
                <h2>Instructions</h2>
                <ol>
                    {exercise.instructions.map((instruction, indx)=>{
                        return (<li key={indx}>{instruction}</li>);
                    })}
                </ol>
                <div className={styles.icons}>
                    <div>
                        <span><Move/></span>
                        <p>{capitalize(exercise.bodyPart)}</p>
                    </div>
                    <div>
                        <span><Target/></span>
                        <p>{capitalize(exercise.target)}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Exercise;