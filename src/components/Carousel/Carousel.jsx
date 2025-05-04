import styles from './styles.module.css';
import Wind from '../../assets/Wind';
import ArrowLeft from '../../assets/ArrowLeft';
import ArrowRight from '../../assets/ArrowRight';
import { useRef } from 'react';

function Carousel({bodyParts, category, setCategory}) {
    const carousel = useRef(null);
    bodyParts.unshift('All');

    function capitalize(str) {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function scrollLeft() {
        carousel.current.scrollBy({ left: -220, behavior: 'smooth' });
    }

    function scrollRight() {
        carousel.current.scrollBy({ left: 220, behavior: 'smooth' });
    }

    return (
        <div>
            <div ref={carousel} className={styles.carousel}>
                {bodyParts.map((part, indx) => {
                    return (
                        <div key={indx} className={category === part ? `${styles.block} ${styles.active}` : styles.block} onClick={() => { setCategory(part) }} >
                            <div>
                                <Wind />
                                <h4>{capitalize(part)}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.nav}>
                <div>
                    <button onClick={scrollLeft}><ArrowLeft /></button>
                    <button onClick={scrollRight}><ArrowRight /></button>
                </div>
            </div>
        </div>
    );
}

export default Carousel;